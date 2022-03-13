import mongoose from "mongoose";

const tagsSchema = mongoose.Schema({
    name: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

export const Tags = mongoose.model('Tags', tagsSchema);
