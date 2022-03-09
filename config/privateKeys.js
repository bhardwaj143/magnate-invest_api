import dotenv from 'dotenv';
dotenv.config();

let {
    DB_STRING,
    DB_STRING_DEV,
    PORT,
    NODEMAILER_EMAIL,
    NODEMAILER_PASSWORD,
} = process.env;

export const privateKey = {
    'DB_STRING': DB_STRING,
    'DB_STRING_DEV': DB_STRING_DEV,
    'PORT': PORT,
    'EMAIL': NODEMAILER_EMAIL,
    'PASSWORD': NODEMAILER_PASSWORD,
};
