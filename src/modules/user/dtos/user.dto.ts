import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, {
    message:
      'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters',
  })
  password: string;

  // @IsString()
  // @IsNotEmpty()
  // gender: string;
}
