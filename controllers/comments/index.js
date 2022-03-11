import Router from 'express';
import { catchAsyncAction, makeResponse, responseMessages, statusCodes, userMapper } from '../../helpers/index.js';
import { auth, validators } from '../../middleware/index.js';
import upload from '../../middleware/upload/index.js';
import { addComments, deleteComments, findAllComments, findAllContacts, findCommentsById, updateComments } from '../../services/index.js';

//Response Status code
const { SUCCESS, RECORD_CREATED } = statusCodes;

//Response Messages
const { ADDED_COMMENTS, FETCH_COMMENTS, FETCH_COMMENT, UPDATE_COMMENTS, DELETE_COMMENT } = responseMessages;

const router = Router();

//Add Comments
router.post('/', catchAsyncAction(async (req, res) => {
    let comment = await addComments(req.body);
    return makeResponse(res, RECORD_CREATED, true, ADDED_COMMENTS, comment);
}));

//Get Comments by Id
router.get('/:id', catchAsyncAction(async (req, res) => {
    let comment = await findCommentsById({ _id: req.params.id });
    return makeResponse(res, SUCCESS, true, FETCH_COMMENT, comment);
}));

//Update Comments
router.patch('/:id', catchAsyncAction(async (req, res) => {
    let comment = await updateComments(req.body,{ _id: req.params.id });
    return makeResponse(res, SUCCESS, true, UPDATE_COMMENTS, comment);
}));

//Get All Comments
router.get('/', catchAsyncAction(async (req, res) => {
    let comment = await findAllComments({});
    return makeResponse(res, SUCCESS, true, FETCH_COMMENTS, comment);
}));

//Delete Comments
router.delete('/:id', catchAsyncAction(async (req, res) => {
    let blog = await deleteComments({ _id: req.params.id });
    return makeResponse(res, SUCCESS, true, DELETE_COMMENT);
}));

export const commentsController = router;
