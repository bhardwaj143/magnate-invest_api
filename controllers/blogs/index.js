import Router from 'express';
import { catchAsyncAction, makeResponse, responseMessages, statusCodes, userMapper } from '../../helpers/index.js';
import { auth, validators } from '../../middleware/index.js';
import upload from '../../middleware/upload/index.js';
import { addBlogs, findAllBlogs, findBlogById, updateBlogs } from '../../services/index.js';

//Response Status code
const { SUCCESS, RECORD_CREATED } = statusCodes;

//Response Messages
const { ADDED_BLOG, UPDATE_BLOG, FETCH_BLOG, FETCH_BLOGS } = responseMessages;

const router = Router();

//Add Blog
router.post('/', upload.fields([{ name: 'blog_Picture', maxCount: 1 }]), catchAsyncAction(async (req, res) => {
    if (req?.files?.blog_Picture?.length > 0) req.body.blog_Picture = req.files.blog_Picture[0].path;
    let blog = await addBlogs(req.body);
    return makeResponse(res, RECORD_CREATED, true, ADDED_BLOG, blog);
}));

//Get Blog by Id
router.get('/:id', catchAsyncAction(async (req, res) => {
    let blog = await findBlogById({ _id: req.params.id });
    return makeResponse(res, SUCCESS, true, FETCH_BLOG, blog);
}));

//Update Blog
router.patch('/:id', catchAsyncAction(async (req, res) => {
    let blog = await updateBlogs({ _id: req.params.id }, req.body);
    return makeResponse(res, SUCCESS, true, UPDATE_BLOG, blog);
}));

//Get Blog by Id
router.get('/', catchAsyncAction(async (req, res) => {
    let blog = await findAllBlogs({});
    return makeResponse(res, SUCCESS, true, FETCH_BLOGS, blog);
}));

export const blogController = router;
