import messageModel from "../Models/messages.js";

//creating message
export const createMessage = async (req, res) => {
    const newMessage = new messageModel(req.body)
    try {
        const message = await newMessage.save()
        res.status(200).json(message)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// get messages 

export const getMessages = async (req, res) => {
    const conversationId = req.params.conversationId;
    try {
        const Messages = await messageModel.find({ conversationId })
        res.status(200).json(Messages)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}