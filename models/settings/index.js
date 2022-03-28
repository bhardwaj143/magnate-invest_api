import mongoose from "mongoose";

const settingsSchema = mongoose.Schema({
    name: {
        type: String,
    },
    logo: {
        type: String
    },
    address: {
        type: String,
    },
    contact: {
        type: String,
    },
    email: {
        type: String,
    },
    banner1: {
        type: String,
    },
    banner2: {
        type: String,
    },
    banner3: {
        type: String,
    },
    about_us_heading: {
        type: String
    },
    about_us_detail: {
        type: String
    },
    facebook: {
        type: String
    },
    instagram: {
        type: String
    },
    twitter: {
        type: String
    },
    youtube: {
        type: String
    },
    metaName: {
        type: String,
    },
    metaDescription: {
        type: String,
    },
    metaKeyword: {
        type: String,
    },
    copyRight: {
        type: String
    },
    nodeMailerEmail: {
        type: String,
    },
    nodeMailerPassword: {
        type: String,
    },
    userEmail: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

export const Settings = mongoose.model('Settings', settingsSchema);
