import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import bodyParser from 'body-parser'
import AuthRoute from "./Routes/AuthRoute.js"
import UserRoute from "./Routes/UserRoute.js"
import PostRoute from "./Routes/PostRoute.js"
import CommentRoute from "./Routes/commentRoute.js"
import ConversationRoute from"./Routes/conversationRouter.js"
import MessageRoute from"./Routes/messageRoute.js"
import cors from "cors"


const app = express()
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


dotenv.config()

mongoose.connect(process.env.MONGO_DB,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(process.env.PORT, () => console.log("connected to mongodb at 5000")))
    .catch(
        (error) => console.log(error));

//useage of route

app.use("/api/auth", AuthRoute)
app.use("/api/user", UserRoute)
app.use("/api/post", PostRoute)
app.use("/api/comment", CommentRoute)
app.use("/api/conversation", ConversationRoute)
app.use("/api/message", MessageRoute)