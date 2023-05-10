import { Injectable } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUser() {
    return { data: await this.userRepository.getAllUser() };
  }

  async getUser(username: string) {
    return { data: await this.userRepository.getUser(username) };
  }

  async createUser(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto);
  }

  async updateUser(username: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateUser(username, updateUserDto);
  }

  async deleteUser(username: string) {
    return this.userRepository.deleteUser(username);
  }
}
