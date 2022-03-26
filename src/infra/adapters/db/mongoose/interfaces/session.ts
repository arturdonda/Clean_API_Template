import { Document } from 'mongoose';
import { IGeolocation } from '.';

export interface ISession extends Document {
	token: string;
	expiredAt: Date;
	createdAt: Date;
	revokedAt: Date | null;
	createdBy: IGeolocation;
	revokedBy: IGeolocation | null;
}
