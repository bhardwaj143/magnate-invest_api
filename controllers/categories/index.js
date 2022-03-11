import Router from 'express';
import { catchAsyncAction, makeResponse, responseMessages, statusCodes } from '../../helpers/index.js';
import upload from '../../middleware/upload/index.js';
import { addCategories, deleteCategories, findAllCategories, findCategoryById, updateCategories } from '../../services/index.js';

//Response Status code
const { SUCCESS, RECORD_CREATED } = statusCodes;

//Response Messages
const { ADDED_CATEGORY, UPDATE_CATEGORY, FETCH_CATEGORIES, FETCH_CATEGORY, DELETE_CATEGORIES } = responseMessages;

const router = Router();

//Add Category
router.post('/', upload.fields([{ name: 'category_Picture', maxCount: 1 }]), catchAsyncAction(async (req, res) => {
    if (req?.files?.category_Picture?.length > 0) req.body.category_Picture = req.files.category_Picture[0].path;
    let category = await addCategories(req.body);
    return makeResponse(res, RECORD_CREATED, true, ADDED_CATEGORY, category);
}));

//Get category by Id
router.get('/:id', catchAsyncAction(async (req, res) => {
    let category = await findCategoryById({ _id: req.params.id });
    return makeResponse(res, SUCCESS, true, FETCH_CATEGORY, category);
}));

//Update Category
router.patch('/:id', upload.fields([{ name: 'category_Picture', maxCount: 1 }]), catchAsyncAction(async (req, res) => {
    if (req?.files?.category_Picture?.length > 0) req.body.category_Picture = req.files.category_Picture[0].path;
    let updated = await updateCategories(req.body,{ _id: req.params.id });
    return makeResponse(res, SUCCESS, true, UPDATE_CATEGORY, updated);
}));

//Get category by Id
router.get('/', catchAsyncAction(async (req, res) => {
    let category = await findAllCategories({});
    return makeResponse(res, SUCCESS, true, FETCH_CATEGORIES, category);
}));

//Delete category
router.delete('/:id', catchAsyncAction(async (req, res) => {
    let blog = await deleteCategories({ _id: req.params.id });
    return makeResponse(res, SUCCESS, true, DELETE_CATEGORIES);
}));

export const categoriesController = router;
