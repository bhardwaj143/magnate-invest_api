import mongoose from "mongoose";
import { Categories } from '../../models/index.js';

const blogsSchema = mongoose.Schema({
    title: {
        type: String,
    },
    blog_Picture: {
        type: String
    },
    discription: {
        type: String,
    },
    isTreandings: {
        type: Boolean,
        default: false
    },
    isPopular: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    categoryId: { type: mongoose.Schema.ObjectId, ref: 'Categories' },
 }, {
    timestamps: true
});

export const Blogs = mongoose.model('Blogs', blogsSchema);
