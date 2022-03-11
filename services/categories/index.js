import { Categories } from '../../models/index.js';

//Find Categories detail
export const findCategoriesDetail = async (condition = {}) => await Categories.findOne(condition).exec();

//Find Categories list
export const findAllCategories = async (condition = {}) => await Categories.find(condition).exec();

//Find Category
export const findCategoryById = (search = {}) => new Promise((resolve, reject) => {
	Categories.findOne(search)
		.then(resolve)
		.catch(reject)
});

//Add Categories
export const addCategories = async (payload = {}, role) => {
    payload.role = role;
    let categories = new Categories(payload);
    return categories.save();
};

//Update Categories
export const updateCategories = (userprops = {}, condition = {}) => new Promise((resolve, reject) => {
    Categories.findOneAndUpdate(condition, { $set: userprops }, { new: true })
        .then(resolve)
        .catch(reject);
});

// Update Password
export const updatePassword = (id, password) => new Promise((resolve, reject) => {
    Categories.findById(id)
        .then((doc) => {
            doc.password = password;
            doc.save();
            resolve();
        })
        .catch(reject);
});

//Delete Categories
export const deleteCategories = (id) => new Promise((resolve, reject) => {
    Categories.updateMany({ _id: { $in: id } }, { $set: { isDeleted: true } })
        .then(resolve)
        .catch(reject)
});

//Update device token
export const updateDeviceToken = (_id, data) => new Promise((resolve, reject) => {
    Categories.findOneAndUpdate({ _id: _id }, { $set: data }, { new: true })
        .then(resolve)
        .catch(reject);
});

//set device token null
export const setDeviceToken = (_id) => new Promise((resolve, reject) => {
    Categories.findOneAndUpdate({ _id: _id }, { $set: { device_token: undefined } }, { new: true })
        .then(resolve)
        .catch(reject);
});

async function getCategories() {

    const data = await Categories.find({}).select('mobileNumber name profile_pic status _id');

    return data;

}
export { getCategories }