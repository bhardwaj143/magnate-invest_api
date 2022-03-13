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
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

export const Settings = mongoose.model('Settings', settingsSchema);
