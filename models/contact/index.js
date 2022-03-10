import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    name: {
        type: String,
    },
    message: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    queryTopic: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

export const Contact = mongoose.model('Contact', contactSchema);
