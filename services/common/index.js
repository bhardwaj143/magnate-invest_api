import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import base64ToImage from 'base64-to-image';
import { responseMessages } from '../../helpers/index.js';

const { sign, verify } = jsonwebtoken;
const { hash, compare } = bcrypt;

export const hashPassword = async (rawPassword) => new Promise((resolve, reject) => {
	hash(rawPassword, 10)
		.then(resolve)
		.catch(reject);
});

export const matchPassword = async (raw, encrypted) => new Promise((resolve, reject) => {
	compare(raw, encrypted)
		.then(resolve)
		.catch(reject);
});

export const assignToken = (payload, secret) => {
	return sign(payload, secret);
};

// Verify Token
export const verifyToken = async (payload, secret) => {
	return await verify(payload, secret)
};

/*NOTE: common function for convert base64 to png image*/
export function convertBase64ToImg(generateQR) {
	try {
		let base64Str = generateQR;
		let path = './uploads/qrcodes/';
		let optionalObj = { 'type': 'png' };
		let imageInfo = base64ToImage(base64Str, path, optionalObj);
		let barcodeImage = (path.substring(1) + imageInfo.fileName)
		return barcodeImage;
	} catch (error) {
		return error;
	}
};


export const generateOtp = () => {
	return Math.floor((Math.random() + 1) * 1000);
};
