import express from "express"
import { deleteComment, postComment } from "../Controller/commentsController.js"
const route = express.Router()

route.post("/:id", postComment)
route.put("/:id", deleteComment)

export default route