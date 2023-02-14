import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { comparePassword } from '../utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const userDB = await this.userService.findOne({ email });
    console.log(userDB, 'userDB');
    if (userDB) {
      const matched = await comparePassword(password, userDB.password);
      if (matched) {
        console.log('user validation success!');
        return userDB;
      } else {
        console.log('password do not match');
        return null;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
