import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { encodePassword } from '../utils/bcrypt';
import { RegisterDto } from './dtos/user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    console.log(userModel, 'userModel');
  }

  async register(registerDto: RegisterDto) {
    const password = await encodePassword(registerDto.password);
    console.log(password, 'password');
    const registerUser = new this.userModel({ ...registerDto, password });
    return registerUser.save();
  }
  async findOne(filter: FilterQuery<User>) {
    return this.userModel.findOne(filter);
  }
}
