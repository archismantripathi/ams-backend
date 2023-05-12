import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createHmac } from 'crypto';
import { stringify } from 'querystring';

import { SignInDto } from './dto/sign-in.dto';
import { User } from '../models/user.model';

//sec-flag-red
@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.userModel
      .findOne({ username: signInDto.username })
      .exec();
    if (!user) {
      throw new HttpException(
        'Invalid Credentials.',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const key = 'key for now'; // needs update
    const hasher = createHmac('sha256', key);
    if (
      (await hasher.update(signInDto.password).digest('base64')) ==
      user.password
    ) {
      return {
        token: await this.generateToken(user.username, stringify(user._id)),
      };
    }
    throw new HttpException('Invalid Credentials.', HttpStatus.NOT_ACCEPTABLE);
  }

  async generateToken(username: string, id: string) {
    const hasher = createHmac('sha256', id);
    const time = Date.now();
    return Buffer.from(
      JSON.stringify({
        username: username,
        time: time,
        signature: await hasher.update(username + time).digest('base64'),
      }),
    ).toString('base64');
  }

  //all token functions needs to be rewritten
  async verifyToken(tokenEncoded: string) {
    try {
      const token = JSON.parse(
        Buffer.from(tokenEncoded, 'base64').toString('ascii'),
      );
      const user = await this.userModel
        .findOne({ username: token.username })
        .exec();
      if (!user) {
        throw new NotFoundException('User Not Found.');
      }
      const hasher = createHmac('sha256', stringify(user.id));
      if (
        (await hasher.update(token.username + token.time).digest('base64')) ==
        token.signature
      ) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }
}
