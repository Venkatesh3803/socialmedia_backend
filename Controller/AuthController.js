import userModel from "../Models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


// registerUser

export const registerUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hassPass = await bcrypt.hash(req.body.password, salt)
    req.body.password = hassPass;
    const newUser = new userModel(req.body);
    const { username } = req.body;

    try {
        const oldUser = await userModel.findOne({ username });
        if (oldUser) {
            return res.status(404).json({message:"this username is already exits"})
        } else {
            const user = await newUser.save();
            const token = jwt.sign({
                username: user.username,
            }, process.env.JWT_KEY, { expiresIn: "1h" })
            res.status(200).json({message:"Registed Sucessfully", user, token });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// login user

export const loginUser = async (req, res) => {
    try {
        const user = await userModel.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({message:"user not found"})
        }

        const validity = await bcrypt.compare(req.body.password, user.password);
        if (!validity) {
            return res.status(404).json({message:"Invalid Credentials"})
        }

        const token = jwt.sign({
            username: user.username, id: user._id,
        }, process.env.JWT_KEY, { expiresIn: "1h" })
        const { password, isAdmin, ...others } = user._doc
        res.status(200).json({message:"Login Sucessfully", others, token })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}