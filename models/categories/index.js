import mongoose from "mongoose";

const categoriesSchema = mongoose.Schema({
    name: {
        type: String,
    },
    category_Picture: {
        type: String
    },
    discription: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

export const Categories = mongoose.model('Categories', categoriesSchema);
