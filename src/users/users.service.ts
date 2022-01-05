import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos';
import { UserDto } from './dtos/user.dto';
import { User } from './interfaces/users.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userModel.findOne({ email: createUserDto.email });

    if (userExists) {
      throw new HttpException('User is already registred with this email', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);

    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword
    });

    await user.save()

    const { password, ...rest } = user;

    return rest
  }

  async showById(id: string) {
    const user = await this.userModel.findById(id);
    const { password, ...rest } = user;
    return rest
  }

  async findById(id: string) {
    return await this.userModel.findById(id)
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email: email })
  }
} 