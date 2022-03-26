import mongoose from 'mongoose';

export const geolocationSchema = new mongoose.Schema({
	ip: { type: String, required: true },
	countryName: { type: String, required: true },
	countryCode: { type: String, required: true },
	countryFlag: { type: String, required: true },
	stateName: { type: String, required: true },
	stateCode: { type: String, required: true },
	city: { type: String, required: true },
	latitude: { type: Number, required: true },
	longitude: { type: Number, required: true },
});
