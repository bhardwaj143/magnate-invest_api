import Router from 'express';
import { catchAsyncAction, makeResponse, responseMessages, statusCodes } from '../../helpers/index.js';
import upload from '../../middleware/upload/index.js';
import { addSettings, deleteSettings, findAllSettings, findSettingsById, updateSettings } from '../../services/index.js';

//Response Status code
const { SUCCESS, RECORD_CREATED } = statusCodes;

//Response Messages
const { ADDED_SETTINGS, UPDATE_SETTINGS, FETCH_SETTINGS, FETCH_SETTING, DELETE_SETTING } = responseMessages;

const router = Router();

//Add Category
router.post('/', upload.fields([{ name: 'logo', maxCount: 1 }]), catchAsyncAction(async (req, res) => {
    if (req?.files?.logo?.length > 0) req.body.logo = req.files.logo[0].path;
    let setting = await addSettings(req.body);
    return makeResponse(res, RECORD_CREATED, true, ADDED_SETTINGS, setting);
}));

//Get category by Id
router.get('/:id', catchAsyncAction(async (req, res) => {
    let setting = await findSettingsById({ _id: req.params.id });
    return makeResponse(res, SUCCESS, true, FETCH_SETTING, setting);
}));

//Update Category
router.patch('/:id', upload.fields([{ name: 'logo', maxCount: 1 }]), catchAsyncAction(async (req, res) => {
    if (req?.files?.logo?.length > 0) req.body.logo = req.files.logo[0].path;
    let setting = await updateSettings(req.body, { _id: req.params.id });
    return makeResponse(res, SUCCESS, true, UPDATE_SETTINGS, setting);
}));

//Get category by Id
router.get('/', catchAsyncAction(async (req, res) => {
    let setting = await findAllSettings({});
    return makeResponse(res, SUCCESS, true, FETCH_SETTINGS, setting);
}));

router.delete('/:id', catchAsyncAction(async (req, res) => {
    let blog = await deleteSettings({ _id: req.params.id });
    return makeResponse(res, SUCCESS, true, DELETE_SETTING);
}));

export const settingsController = router;
