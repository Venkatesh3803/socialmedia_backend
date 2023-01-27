import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    desc: {
        type: String,
        max: 500,
    },
    likes: {
        type: Array,
    },
    comments: {
        type: [{
            userId: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
        }],
    },
}, { timestamps: true },
);

const postModel = mongoose.model("Post", PostSchema);

export default postModel;