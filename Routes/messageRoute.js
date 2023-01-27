import express from "express"
import { createMessage, getMessages } from "../Controller/messageController.js";
const route = express.Router();

route.post("/", createMessage)
route.get("/:conversationId", getMessages)

export default route