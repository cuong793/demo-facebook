import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  id: string;
  @Prop({ unique: true, index: true })
  name: string;

  @Prop({ unique: true, index: true })
  email: string;

  @Prop()
  password: string;

  // @Prop()
  // gender: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
