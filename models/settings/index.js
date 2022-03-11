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
}, {
    timestamps: true
});

export const Settings = mongoose.model('Settings', settingsSchema);
