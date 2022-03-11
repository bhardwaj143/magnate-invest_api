import Router from 'express';
import { catchAsyncAction, makeResponse, responseMessages, statusCodes, userMapper } from '../../helpers/index.js';
import { addTags, deleteTags, findAllTags, findTagById, updateTags } from '../../services/index.js';

//Response Status code
const { SUCCESS, RECORD_CREATED } = statusCodes;

//Response Messages
const { ADDED_TAG, FETCH_TAG, FETCH_TAGS, UPDATE_TAG, DELETE_TAG } = responseMessages;

const router = Router();


//Add Tag
router.post('/', catchAsyncAction(async (req, res) => {
    let tag = await addTags(req.body);
    return makeResponse(res, RECORD_CREATED, true, ADDED_TAG, tag);
}));

//Get Tag by Id
router.get('/:id', catchAsyncAction(async (req, res) => {
    let tag = await findTagById({ _id: req.params.id });
    return makeResponse(res, SUCCESS, true, FETCH_TAG, tag);
}));

//Update Tag
router.patch('/:id', catchAsyncAction(async (req, res) => {
    let tag = await updateTags(req.body,{ _id: req.params.id });
    return makeResponse(res, SUCCESS, true, UPDATE_TAG, tag);
}));

//Get Tag all tag
router.get('/', catchAsyncAction(async (req, res) => {
    let tag = await findAllTags({});
    return makeResponse(res, SUCCESS, true, FETCH_TAGS, tag);
}));

//Delete tags
router.delete('/:id', catchAsyncAction(async (req, res) => {
    let blog = await deleteTags({ _id: req.params.id });
    return makeResponse(res, SUCCESS, true, DELETE_TAG);
}));

export const tagController = router;
