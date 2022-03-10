import mongoose from "mongoose";
import { Blogs } from '../../models/index.js';
import { Categories } from '../../models/index.js';

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
    categoryId: { type: mongoose.Schema.ObjectId, ref: 'Categories' },
    blogId: { type: mongoose.Schema.ObjectId, ref: 'Blogs' }
}, {
    timestamps: true
});

export const Comments = mongoose.model('Comments', commentsSchema);
