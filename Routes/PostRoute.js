import express from "express"
import { createPost, deletePost, getPosts, getTimeLine, likePost, singleUserPost, updatePost } from "../Controller/PostController.js"

const route = express.Router()

route.post("/", createPost)
route.get("/:id", getPosts)
route.put("/:id", updatePost)
route.delete("/:id", deletePost)
route.put("/:id/like", likePost)
route.get("/:id/timeline", getTimeLine)
route.get("/profile/:username", singleUserPost)


export default route