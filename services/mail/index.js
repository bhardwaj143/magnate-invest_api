import nodemailer from 'nodemailer';
import { privateKey } from '../../config/privateKeys.js';
import { findAllSettings } from '../index.js';
const { createTransport } = nodemailer;

export const sendEmail = async (toMail) =>
	new Promise((resolve, reject) => {
		const transport = createTransport({
			service: 'gmail',
			auth: {
				user: toMail.email,
				pass: toMail.password
			}
		});

		transport.sendMail(
			toMail,
			(error, response) => {
				if (error) {
					reject(error);
				} else {
					resolve(response.messageId);
				}
				transport.close();
			}
		);
	});
