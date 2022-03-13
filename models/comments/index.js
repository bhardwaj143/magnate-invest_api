import mongoose from "mongoose";
import { Blogs } from '../../models/index.js';

const commentsSchema = mongoose.Schema({
    name: {
        type: String,
    },
    comment: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    blogId: { type: mongoose.Schema.ObjectId, ref: 'Blogs' }
}, {
    timestamps: true
});

export const Comments = mongoose.model('Comments', commentsSchema);
