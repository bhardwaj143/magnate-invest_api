import mongoose from "mongoose";
import { Categories } from '../../models/index.js';

// const commentSchema = mongoose.Schema({
//     comment: String,
//     name: String,
//     email: String
// }, { _id: false });

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
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    }],
    isDeleted: {
        type: Boolean,
        default: false
    },
    categoryId: { type: mongoose.Schema.ObjectId, ref: 'Categories' },
}, {
    timestamps: true
});

export const Blogs = mongoose.model('Blogs', blogsSchema);
