import { Document } from 'mongoose';

export interface IGeolocation extends Document {
	ip: string;
	countryName: string;
	countryCode: string;
	countryFlag: string;
	stateName: string;
	stateCode: string;
	city: string;
	latitude: number;
	longitude: number;
}
