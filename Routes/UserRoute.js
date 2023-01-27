import express from "express"
import { deletUser, getAllUsers, getUser, unfollowUser, updateUser, userFollow, } from "../Controller/UserController.js"

const route = express.Router()

route.get("/singleuser", getUser)
route.put("/:id", updateUser)
route.delete("/:id", deletUser)
route.put("/:id/follow" , userFollow)
route.put("/:id/unfollow", unfollowUser)
route.get("/getallusers", getAllUsers)


export default route