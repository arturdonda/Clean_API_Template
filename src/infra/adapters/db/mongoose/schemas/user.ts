import mongoose from 'mongoose';
import { sessionSchema } from '.';

export const userSchema = new mongoose.Schema({
	address: { type: String },
	birthday: { type: Date },
	confirmationCode: { type: String, required: true, unique: true },
	cpf: { type: String, index: { unique: true, partialFilterExpression: { cpf: { $type: 'string' } } } },
	createDate: { type: Date },
	email: {
		type: String,
		required: true,
		unique: true,
	},
	gender: { type: String },
	name: { type: String, required: true },
	password: { type: String, required: true },
	phone: { type: String },
	rg: { type: String, index: { unique: true, partialFilterExpression: { rg: { $type: 'string' } } } },
	status: { type: String },
	sessions: { type: [sessionSchema] },
});
