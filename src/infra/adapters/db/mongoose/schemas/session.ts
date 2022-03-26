import mongoose from 'mongoose';
import { geolocationSchema } from '.';

export const sessionSchema = new mongoose.Schema({
	token: { type: String, required: true },
	expiredAt: { type: Date, required: true },
	createdAt: { type: Date, required: true },
	revokedAt: { type: Date },
	createdBy: { type: geolocationSchema, required: true },
	revokedBy: { type: geolocationSchema },
});
