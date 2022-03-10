import { Tags } from '../../models/index.js';

//Find Tags detail
export const findTagsDetail = async (condition = {}) => await Tags.findOne(condition).exec();

//Find Tags list
export const findAllTagss = async (condition = {}) => await Tags.find(condition).exec();

//Add Tags
export const addTags = async (payload = {}, role) => {
    payload.role = role;
    let tags = new Tags(payload);
    return tags.save();
};

//Update Tags
export const updateTags = (userprops = {}, condition = {}) => new Promise((resolve, reject) => {
    Tags.findOneAndUpdate(condition, { $set: userprops }, { new: true })
        .then(resolve)
        .catch(reject);
});

// Update Password
export const updatePassword = (id, password) => new Promise((resolve, reject) => {
    Tags.findById(id)
        .then((doc) => {
            doc.password = password;
            doc.save();
            resolve();
        })
        .catch(reject);
});

//Delete Tags
export const deleteTags = (id) => new Promise((resolve, reject) => {
    Tags.updateMany({ _id: { $in: id } }, { $set: { isDeleted: true } })
        .then(resolve)
        .catch(reject)
});

//Update device token
export const updateDeviceToken = (_id, data) => new Promise((resolve, reject) => {
    Tags.findOneAndUpdate({ _id: _id }, { $set: data }, { new: true })
        .then(resolve)
        .catch(reject);
});

//set device token null
export const setDeviceToken = (_id) => new Promise((resolve, reject) => {
    Tags.findOneAndUpdate({ _id: _id }, { $set: { device_token: undefined } }, { new: true })
        .then(resolve)
        .catch(reject);
});

async function getTags() {

    const data = await Tags.find({}).select('mobileNumber name profile_pic status _id');

    return data;

}
export { getTags }