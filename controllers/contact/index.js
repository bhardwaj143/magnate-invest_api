import Router from 'express';
import { catchAsyncAction, makeResponse, responseMessages, statusCodes } from '../../helpers/index.js';
import { validators } from '../../middleware/validateResource/index.js';
import { addContact, sendEmail } from '../../services/index.js';
import { privateKey } from '../../config/privateKeys.js';

//Response messages
const { QUERY_SENT } = responseMessages;
//Status codes
const { RECORD_CREATED, BAD_REQUEST, NOT_FOUND } = statusCodes;

const router = Router();
//Insert request
router.post("/", catchAsyncAction(async (req, res) => {
    return Promise.all(
        [
            sendEmail({
                from: req.body.email,
                to: privateKey.EMAIL,
                subject: `Query Topic ${req.body.queryTopic}, Contact No. ${req.body.phone_number}!`,
                text: req.body.message
            }),
            addContact(req.body)
        ]
    ).then(result => {
        return makeResponse(res, RECORD_CREATED, true, QUERY_SENT, result[1])
    }).catch(error => {
        return makeResponse(res, BAD_REQUEST, false, error.message);
    })
}));

export const contactController = router;
