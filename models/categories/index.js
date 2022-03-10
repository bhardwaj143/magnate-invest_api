import mongoose from "mongoose";
import { Blogs } from '../../models/index.js';

const categoriesSchema = mongoose.Schema({
    name: {
        type: String,
    },
    picture: {
        type: String
    },
    discription: {
        type: String,
    },
    blogId: { type: mongoose.Schema.ObjectId, ref: 'Blogs' }
}, {
    timestamps: true
});

export const Categories = mongoose.model('Categories', categoriesSchema);
