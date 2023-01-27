import userModel from "../Models/User.js"
import cloudinary from "../utils/cloudinary.js"

// get user details 
export const getUser = async (req, res) => {
    const userId = req.query.userid
    const username = req.query.username
    try {
        let user
        if (username) {
            user = await userModel.findOne({ username: username })
        } if (userId) {
            user = await userModel.findById(userId)
        }
        const { password, isAdmin, ...other } = user._doc
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json({ message: "user not found" })
    }
}

// updating user
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId, profilePic, firstname, lastname, relationship, livesIn, worksAt, profession, gender } = req.body;
    if (id === currentUserId) {
        try {
            // const salt = await bcrypt.genSalt(10);
            // req.body.password = await bcrypt.hash(password, salt)

            const profileResult = await cloudinary.uploader.upload(profilePic, {
                folder: "social media"
            })

            const user = await userModel.findByIdAndUpdate(id, {
                profilePic: {
                    public_id: profileResult.public_id,
                    url: profileResult.secure_url
                },
                livesIn, firstname, lastname, worksAt, profession, relationship, gender
            }, { new: true })
            const { isAdmin, ...other } = user._doc
            res.status(200).json({ message: "Updated Sucessfully", other });
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    } else {
        res.status(404).json("you can update your account ")
    }

}

// deleting user
export const deletUser = async (req, res) => {
    const id = req.params.id;

    const { currentUserId, currentUserIsAdmin } = req.body;
    if (currentUserId === id || currentUserIsAdmin) {

        try {
            await userModel.findByIdAndDelete(id)
            res.status(200).json("your account have been deleted");
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    } else {
        res.status(404).json("you can only delete your account")
    }
}

// follow user

export const userFollow = async (req, res) => {
    const id = req.params.id;
    const { currentUserId } = req.body;

    if (currentUserId === id) {
        res.status(404).json("Access Denied")
    } else {
        try {
            const followUser = await userModel.findById(id);
            const followingUser = await userModel.findById(currentUserId);

            if (!followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({ $push: { followers: currentUserId } });
                await followingUser.updateOne({ $push: { following: id } });
                res.status(200).json("followed sucessfully")
            } else {
                res.status(404).json("you already followed")
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

}

// unfollow user
export const unfollowUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId } = req.body;

    if (currentUserId === id) {
        res.status(404).json("error")
    }
    else {
        try {
            const followUser = await userModel.findById(id);
            const followingUser = await userModel.findById(currentUserId);
            if (followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({ $pull: { followers: currentUserId } });
                await followingUser.updateOne({ $pull: { following: id } });
                res.status(200).json("unfollowed user sucessfully")
            }
            else {
                res.status(404).json("you already unfollowed")
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

// get all users 
export const getAllUsers = async (req, res) => {
    try {
        const user = await userModel.find().limit(15)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


