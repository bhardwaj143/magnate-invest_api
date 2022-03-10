import mongoose from "mongoose";

const tagsSchema = mongoose.Schema({
    name: {
        type: String,
    },
}, {
    timestamps: true
});

export const Tags = mongoose.model('Tags', tagsSchema);
