import Router from 'express';
import moment from "moment";
import { catchAsyncAction, makeResponse, responseMessages, statusCodes, userMapper } from '../../helpers/index.js';
import { auth, validators } from '../../middleware/index.js';
import upload from '../../middleware/upload/index.js';
import { addBlogs, deleteBlogs, findAllBlogs, findBlogById, findCommentsById, getBlogsCount, updateBlogs } from '../../services/index.js';

//Response Status code
const { SUCCESS, RECORD_CREATED } = statusCodes;

//Response Messages
const { ADDED_BLOG, UPDATE_BLOG, FETCH_BLOG, FETCH_BLOGS, DELETE_BLOG } = responseMessages;

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
router.patch('/:id', upload.fields([{ name: 'blog_Picture', maxCount: 1 }]), catchAsyncAction(async (req, res) => {
    if (req?.files?.blog_Picture?.length > 0) req.body.blog_Picture = req.files.blog_Picture[0].path;
    let blog = await updateBlogs(req.body, { _id: req.params.id });
    return makeResponse(res, SUCCESS, true, UPDATE_BLOG, blog);
}));

//Get All Blogs
router.get('/', catchAsyncAction(async (req, res) => {
    let blogs = [];
    let comments = []
    let searchingBlogs = {};
    let page = 1,
        limit = 10,
        skip = 0,
        status;
    if (req.query.status) status = req.query.status;
    if (req.query.page == 0) req.query.page = '';
    if (req.query.page) page = req.query.page;
    if (req.query.limit) limit = req.query.limit;
    skip = (page - 1) * limit;
    let regx;
    let searchFilter = req.query;
    if (searchFilter?.search) {
        regx = new RegExp(searchFilter?.search);
        searchingBlogs = {
            isDeleted: false, $or: [{ 'title': { '$regex': regx, $options: 'i' } }]
        }
    };
    if (!searchFilter?.search) {
        searchingBlogs = {
            isDeleted: false,
        }
    };
    if (status) searchingBlogs["status"] = status;
    let blog = await findAllBlogs(parseInt(skip), parseInt(limit), searchingBlogs);

    blog.map(element => {
        return blogs.push({
            _id: element._id,
            title: element.title,
            blog_Picture: element.blog_Picture,
            discription: element.discription,
            isTreandings: element.isTreandings,
            isPopular: element.isPopular,
            isDeleted: element.isDeleted,
            createdAt: moment(element.createdAt).format('DD MMMM'),
            updatedAt: element.updatedAt,
            __v: element.__v,
            comments: element.comments.map(comment => {
                return ({
                    _id: comment._id,
                    name: comment.name,
                    comment: comment.comment,
                    email: comment.email,
                    isDeleted: false,
                    blogId: comment.blogId,
                    createdAt: moment(comment.createdAt).format('DD MMMM'),
                    updatedAt: comment.updatedAt,
                    __v: comment.__v
                })
            })
        })
    })
    let blogCount = await getBlogsCount(searchingBlogs);
    return makeResponse(res, SUCCESS, true, FETCH_BLOGS, blogs, {
        current_page: Number(page),
        total_records: blogCount,
        total_pages: Math.ceil(blogCount / limit),
    });
}));

router.delete('/:id', catchAsyncAction(async (req, res) => {
    let blog = await deleteBlogs({ _id: req.params.id });
    return makeResponse(res, SUCCESS, true, DELETE_BLOG);
}));

export const blogController = router;
