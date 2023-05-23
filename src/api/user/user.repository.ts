/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createHmac } from 'crypto';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../../models/user.model';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getAllUser() {
    const users = await this.userModel.find().exec();

    return users.map((user) => ({
      username: user.username,
      name:     user.name,
      admin:    user.admin,
    }));
  }

  async getUser(username: string) {
    const user = await this.userModel.findOne({ username: username }).exec();

    if (user) {
      return {
        username: user.username,
        name:     user.name,
        admin:    user.admin,
      };
    } else {
      throw new NotFoundException('User Not Found.');
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    const key = 'key for now';
    const hasher = createHmac('sha256', key);

    const newUser = new this.userModel({
      username: createUserDto.username,
      name:     createUserDto.name,
      password: await hasher.update(createUserDto.password).digest('base64'),
      admin:    createUserDto.admin,
    });
    
    try {
      await newUser.save();
    } catch (error) {
      throw new NotAcceptableException('User Already Exist.');
    }
    throw new HttpException('User Created.', HttpStatus.CREATED);
  }

  async updateUser(username: string,updateUserDto: UpdateUserDto) {
    const key = 'key for now';
    const hasher = createHmac('sha256', key);

    const user = await this.userModel.findOne({ username: username }).exec();
    if(user) {
      if(updateUserDto.username) {
        if(user.username != updateUserDto.username) {
          const checkNewUserName = await this.userModel.findOne({ 
            username: updateUserDto.username
          }).exec();
          if(checkNewUserName) {
            throw new HttpException('Username Must Be Unique.', HttpStatus.CONFLICT);
          } else {
            user.username = updateUserDto.username;
          }
        }
      }
      if(updateUserDto.name) {
        user.name = updateUserDto.name;
      }
      if(updateUserDto.password) {
        user.password = await hasher.update(updateUserDto.password).digest('base64');
      }
      //check later
      user.admin = updateUserDto.admin;
      user.save();
      throw new HttpException('User Updated.', HttpStatus.ACCEPTED);
    } else {
      throw new NotFoundException('User Not Found.');
    }
  }

  async deleteUser(username: string) {
    const result = await this.userModel.deleteOne({username: username}).exec();

    if(result.acknowledged == false) {
      throw new HttpException('Internal Server Error',HttpStatus.SERVICE_UNAVAILABLE)
    } else if (result.deletedCount == 0) {
      throw new NotFoundException('User Not Found.');
    } else {
      throw new HttpException('User Removed.', HttpStatus.ACCEPTED);
    }
  }
}
