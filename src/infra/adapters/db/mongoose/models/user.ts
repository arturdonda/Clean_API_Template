import { model } from 'mongoose';
import { IUser } from '../interfaces';
import { userSchema } from '../schemas';

export const userModel = model<IUser>('User', userSchema);
