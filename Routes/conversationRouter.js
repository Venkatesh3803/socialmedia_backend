import express from "express"
import { createConversation, getUserConv } from "../Controller/conversationController.js"

const route = express.Router()

route.post("/", createConversation)
route.get("/:userId", getUserConv)

export default route