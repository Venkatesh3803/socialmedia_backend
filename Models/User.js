import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },

    desc: {
        type: String,
    },
    profilePic: {
        public_id: {
            type: String,

        },
        url: {
            type: String,

        }
    },
    followers: {
        type: Array,
    },
    following: {
        type: Array,
    },
    
    profession: {type: String},
    livesIn: { type: String },
    worksAt: { type: String },
    gender: { type: String },
    relationship: { type: String },
},
    { timestamps: true }
)

const UserModel = mongoose.model("User", UserSchema)

export default UserModel