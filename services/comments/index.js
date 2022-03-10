import { Comments } from '../../models/index.js';

//Find Comments detail
export const findCommentsDetail = async (condition = {}) => await Comments.findOne(condition).exec();

//Find Comments list
export const findAllComments = async (condition = {}) => await Comments.find(condition).exec();

//Add Comments
export const addComments = async (payload = {}, role) => {
    payload.role = role;
    let comments = new Comments(payload);
    return comments.save();
};

//Update Comments
export const updateComments = (userprops = {}, condition = {}) => new Promise((resolve, reject) => {
    Comments.findOneAndUpdate(condition, { $set: userprops }, { new: true })
        .then(resolve)
        .catch(reject);
});

// Update Password
export const updatePassword = (id, password) => new Promise((resolve, reject) => {
    Comments.findById(id)
        .then((doc) => {
            doc.password = password;
            doc.save();
            resolve();
        })
        .catch(reject);
});

//Delete Comments
export const deleteComments = (id) => new Promise((resolve, reject) => {
    Comments.updateMany({ _id: { $in: id } }, { $set: { isDeleted: true } })
        .then(resolve)
        .catch(reject)
});

//Update device token
export const updateDeviceToken = (_id, data) => new Promise((resolve, reject) => {
    Comments.findOneAndUpdate({ _id: _id }, { $set: data }, { new: true })
        .then(resolve)
        .catch(reject);
});

//set device token null
export const setDeviceToken = (_id) => new Promise((resolve, reject) => {
    Comments.findOneAndUpdate({ _id: _id }, { $set: { device_token: undefined } }, { new: true })
        .then(resolve)
        .catch(reject);
});

async function getComments() {

    const data = await Comments.find({}).select('mobileNumber name profile_pic status _id');

    return data;

}
export { getComments }