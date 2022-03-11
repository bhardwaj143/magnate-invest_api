import { Settings } from '../../models/index.js';

//Find Settings detail
export const findSettingsDetail = async (condition = {}) => await Settings.findOne(condition).exec();

//Find Settings list
export const findAllSettings = async (condition = {}) => await Settings.find(condition).exec();

//Add Settings
export const addSettings = async (payload = {}, role) => {
    payload.role = role;
    let setting = new Settings(payload);
    return setting.save();
};

//Update Settings
export const updateSettings = (userprops = {}, condition = {}) => new Promise((resolve, reject) => {
    Settings.findOneAndUpdate(condition, { $set: userprops }, { new: true })
        .then(resolve)
        .catch(reject);
});

// Update Password
export const updatePassword = (id, password) => new Promise((resolve, reject) => {
    Settings.findById(id)
        .then((doc) => {
            doc.password = password;
            doc.save();
            resolve();
        })
        .catch(reject);
});

//Delete Settings
export const deleteSettings = (id) => new Promise((resolve, reject) => {
    Settings.updateMany({ _id: { $in: id } }, { $set: { isDeleted: true } })
        .then(resolve)
        .catch(reject)
});

//Update device token
export const updateDeviceToken = (_id, data) => new Promise((resolve, reject) => {
    Settings.findOneAndUpdate({ _id: _id }, { $set: data }, { new: true })
        .then(resolve)
        .catch(reject);
});

//Find BLog
export const findSettingsById = (search = {}) => new Promise((resolve, reject) => {
	Settings.findOne(search)
		.then(resolve)
		.catch(reject)
});

