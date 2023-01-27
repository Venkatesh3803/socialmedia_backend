import cloudinary from "../utils/cloudinary.js";
import postModel from "../Models/Post.js";
import userModel from "../Models/User.js"

// creating post 

export const createPost = async (req, res) => {
    const { image, desc, userId } = req.body

    try {
        const result = await cloudinary.uploader.upload(image, {
            folder: "social Media"
        })
        const post = await postModel.create({
            image: {
                public_id: result.public_id,
                url: result.secure_url
            },
            desc,
            userId
        });
        return res.status(200).json({ message: "posted sucessfully", post })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}


// get post 

export const getPosts = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await postModel.findById(id);
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// update post

export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    try {
        const post = await postModel.findById(postId);
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json("post updated")
        }
    } catch (error) {
        res.status(500).json("you can update your post only")
    }

}


// delete post 

export const deletePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    try {
        const post = await postModel.findById(postId);
        if (post.userId === userId) {
            await post.deleteOne()
            res.status(200).json("post have been deleted")
        }
    } catch (error) {
        res.status(403).json("Action forbidden")
    }
}

// post like

export const likePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    try {
        const post = await postModel.findById(postId);
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } })
            res.status(200).json("post liked")
        }
        else {
            await post.updateOne({ $pull: { likes: userId } })
            res.status(200).json("post unliked")

        }
    } catch (error) {
        res.status(403).json("Action forbidden")
    }

}

// get timeline posts

export const getTimeLine = async (req, res) => {
    const id = req.params.id
    try {
        const currentUser = await userModel.findById(id);
        const userPosts = await postModel.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followers.map((friendId) => {
                return postModel.find({ userId: friendId });
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


//singleuserpost 

export const singleUserPost = async (req, res) => {
    const username = req.params.username
    try {
        const user = await userModel.findOne({ username: username })
        const posts = await postModel.find({ userId: user._id })
        res.status(200).json(posts)


    } catch (error) {
        res.status(500).json({ message: message.error })
    }
}