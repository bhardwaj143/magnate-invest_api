import Router from 'express';
import { catchAsyncAction, makeResponse, responseMessages, statusCodes, userMapper } from '../../helpers/index.js';
import { auth, validators } from '../../middleware/index.js';
import upload from '../../middleware/upload/index.js';
import { addUser, findAllContacts, findUserDetail, getcontacts } from '../../services/index.js';

//Response Status code
const { SUCCESS, NOT_FOUND, RECORD_ALREADY_EXISTS } = statusCodes;

//Response Messages
const { ALREADY_EXIST, REGISTERD, FETCH_CONTACTS, FETCH_TALKIE_CONTACTS, INVALID_EMAIL, INCORRECT_PASSWORD, LOGIN } = responseMessages;

const router = Router();

export const commentsController = router;
