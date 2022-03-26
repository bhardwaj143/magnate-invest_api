import Router from 'express';
import { catchAsyncAction, makeResponse, responseMessages, statusCodes } from '../../helpers/index.js';
import upload from '../../middleware/upload/index.js';
import { addSettings, deleteSettings, findAllSettings, findSettingsById, findSettingsDetail, updateSettings } from '../../services/index.js';

//Response Status code
const { SUCCESS, RECORD_CREATED } = statusCodes;

//Response Messages
const { ADDED_SETTINGS, UPDATE_SETTINGS, FETCH_SETTINGS, FETCH_SETTING, DELETE_SETTING } = responseMessages;

const router = Router();

//Add Category
router.post('/', upload.fields([{ name: 'logo', maxCount: 1 },
{ name: 'banner1', maxCount: 1 },
{ name: 'banner2', maxCount: 1 },
{ name: 'banner3', maxCount: 1 }]), catchAsyncAction(async (req, res) => {
    if (req?.files?.logo?.length > 0) req.body.logo = req.files.logo[0].path;
    if (req?.files?.banner1?.length > 0) req.body.banner1 = req.files.banner1[0].path;
    if (req?.files?.banner2?.length > 0) req.body.banner2 = req.files.banner2[0].path;
    if (req?.files?.banner3?.length > 0) req.body.banner3 = req.files.banner3[0].path;
    let setting = await addSettings(req.body);
    return makeResponse(res, RECORD_CREATED, true, ADDED_SETTINGS, setting);
}));

//Get category by Id
router.get('/:id', catchAsyncAction(async (req, res) => {
    let setting = await findSettingsById({ _id: req.params.id });
    return makeResponse(res, SUCCESS, true, FETCH_SETTING, setting);
}));

//Update Category
router.patch('/', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'banner1', maxCount: 1 },
{ name: 'banner2', maxCount: 1 },
{ name: 'banner3', maxCount: 1 }]), catchAsyncAction(async (req, res) => {
    if (req?.files?.logo?.length > 0) req.body.logo = req.files.logo[0].path;
    if (req?.files?.banner1?.length > 0) req.body.banner1 = req.files.banner1[0].path;
    if (req?.files?.banner2?.length > 0) req.body.banner2 = req.files.banner2[0].path;
    if (req?.files?.banner3?.length > 0) req.body.banner3 = req.files.banner3[0].path;
    let checkRecord = await findSettingsById({});
    if (!checkRecord) {
        await addSettings(req.body);
    } else {
        await updateSettings(req.body, { _id: checkRecord._id });
    }
    return makeResponse(res, SUCCESS, true, UPDATE_SETTINGS);
}));

//Get category by Id
router.get('/', catchAsyncAction(async (req, res) => {
    let setting = await findSettingsDetail({});
    return makeResponse(res, SUCCESS, true, FETCH_SETTINGS, setting);
}));

router.delete('/:id', catchAsyncAction(async (req, res) => {
    let blog = await deleteSettings({ _id: req.params.id });
    return makeResponse(res, SUCCESS, true, DELETE_SETTING);
}));

export const settingsController = router;
