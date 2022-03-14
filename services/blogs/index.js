import { Blogs } from '../../models/index.js';

//Find Blogs detail
export const findBlogsDetail = async (condition = {}) => await Blogs.findOne(condition).exec();


//Find Blogs list
export const findAllBlogs = (skip, limit, search = {}) => new Promise((resolve, reject) => {
    Blogs.find(search)
        .populate('categoryId')
        .populate('comments')
        .skip(skip).limit(limit)
        .sort('-createdAt')
        .then(resolve)
        .catch(reject)
})


//Add Blogs
export const addBlogs = async (payload = {}, role) => {
    payload.role = role;
    let blogs = new Blogs(payload);
    return blogs.save();
};

//Find BLog
export const findBlogById = (search = {}) => new Promise((resolve, reject) => {
    Blogs.findOne(search)
        .populate('categoryId')
        .then(resolve)
        .catch(reject)
});

//Update Blogs
export const updateBlogs = (userprops = {}, condition = {}) => new Promise((resolve, reject) => {
    Blogs.findOneAndUpdate(condition, { $set: userprops }, { new: true })
        .then(resolve)
        .catch(reject);
});

// Update Password
export const updatePassword = (id, password) => new Promise((resolve, reject) => {
    Blogs.findById(id)
        .then((doc) => {
            doc.password = password;
            doc.save();
            resolve();
        })
        .catch(reject);
});

//Delete Blogs
export const deleteBlogs = (id) => new Promise((resolve, reject) => {
    Blogs.updateMany({ _id: { $in: id } }, { $set: { isDeleted: true } })
        .then(resolve)
        .catch(reject)
});

//Update device token
export const updateDeviceToken = (_id, data) => new Promise((resolve, reject) => {
    Blogs.findOneAndUpdate({ _id: _id }, { $set: data }, { new: true })
        .then(resolve)
        .catch(reject);
});

//set device token null
export const setDeviceToken = (_id) => new Promise((resolve, reject) => {
    Blogs.findOneAndUpdate({ _id: _id }, { $set: { device_token: undefined } }, { new: true })
        .then(resolve)
        .catch(reject);
});

async function getBlogs() {

    const data = await Blogs.find({}).select('mobileNumber name profile_pic status _id');

    return data;

}

//Get count
export const getBlogsCount = (search) => new Promise((resolve, reject) => {
    Blogs.countDocuments(search)
        .then(resolve)
        .catch(reject)
});

export { getBlogs }