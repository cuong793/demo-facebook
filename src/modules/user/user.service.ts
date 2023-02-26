import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { comparePassword, encodePassword } from '../utils/bcrypt';
import { UserDto } from './dtos';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOneUser(filter: FilterQuery<User>) {
    return this.userModel.findOne(filter);
  }

  async create(userDto: UserDto) {
    const password = await encodePassword(userDto.password);
    const registerUser = new this.userModel({ ...userDto, password });
    return registerUser;
  }
  async validateUserByEmail(email: string) {
    const user = await this.findOneUser({ email });
    if (user)
      throw new BadRequestException(
        'Email already exists, please use another email',
      );
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const userDB = await this.findOneUser({ email });
    if (userDB) {
      const matched = await comparePassword(password, userDB.password);
      if (matched) {
        return userDB;
      } else {
        return null;
      }
    }
    return null;
  }
}
