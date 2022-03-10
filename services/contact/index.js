import { Contact } from '../../models/index.js';

//Find Contact detail
export const findContactDetail = async (condition = {}) => await Contact.findOne(condition).exec();

//Find Contact list
export const findAllContact = async (condition = {}) => await Contact.find(condition).exec();

//Add Contact
export const addContact = async (payload = {}, role) => {
    payload.role = role;
    let contact = new Contact(payload);
    return contact.save();
};

//Update Contact
export const updateContact = (userprops = {}, condition = {}) => new Promise((resolve, reject) => {
    Contact.findOneAndUpdate(condition, { $set: userprops }, { new: true })
        .then(resolve)
        .catch(reject);
});

// Update Password
export const updatePassword = (id, password) => new Promise((resolve, reject) => {
    Contact.findById(id)
        .then((doc) => {
            doc.password = password;
            doc.save();
            resolve();
        })
        .catch(reject);
});

//Delete Contact
export const deleteContact = (id) => new Promise((resolve, reject) => {
    Contact.updateMany({ _id: { $in: id } }, { $set: { isDeleted: true } })
        .then(resolve)
        .catch(reject)
});

//Update device token
export const updateDeviceToken = (_id, data) => new Promise((resolve, reject) => {
    Contact.findOneAndUpdate({ _id: _id }, { $set: data }, { new: true })
        .then(resolve)
        .catch(reject);
});

//set device token null
export const setDeviceToken = (_id) => new Promise((resolve, reject) => {
    Contact.findOneAndUpdate({ _id: _id }, { $set: { device_token: undefined } }, { new: true })
        .then(resolve)
        .catch(reject);
});

async function getContact() {

    const data = await Contact.find({}).select('mobileNumber name profile_pic status _id');

    return data;

}
export { getContact }