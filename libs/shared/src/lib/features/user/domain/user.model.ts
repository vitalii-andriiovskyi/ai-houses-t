import { Address } from "../../address/domain/address.model";
import { Image } from "../../image/domain/image.model";

export enum UserRole {
  User = 'user',
  Admin = 'admin'
}

export interface User {
  id: string;
  email: string;
  password: string;
  isTemporaryPassword?: boolean;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: Address;
  // addressId?: string; // db sets it, but we need to have it in the model for the relation
  image?: Image;
  // imageId?: string; // db sets it, but we need to have it in the model for the relation
  description?: string;
  verificationToken?: string;
  role?: UserRole;
  recovery?: string;
  isRecovered?: boolean;
  // addressId?: string; // db sets it, but we need to have it in the model for the relation
  emailVerified: Date;
  blockBefore?: number;
  attempts?: { time: number }[];
  deletedDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type FormInputFromUser<Fields extends keyof User, Extra = object> =
  Pick<User, Fields> & Extra;

export type UserSignUp = FormInputFromUser<'firstName' | 'lastName' | 'email' | 'password',
  { repeatPassword: string }>

export type UserSignUpBE = FormInputFromUser<'firstName' | 'lastName' | 'email' | 'password',
  { isTemporaryPassword?: boolean }>

export type Credentials = FormInputFromUser<'email' | 'password'>

export type UserShort = Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'image' | 'address'>

export type CreateUserResponse = {
  success: boolean;
  user: UserShort;
  message: string;
}





