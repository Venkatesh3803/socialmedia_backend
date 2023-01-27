import conversationModel from "../Models/conversations.js"

export const createConversation = async (req, res) => {
    const member = new conversationModel({
        members: [req.body.senderId, req.body.resevierId]
    })

    try {
        const result = await member.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// get user conversation
export const getUserConv = async (req, res) => {
    try {
        const userId = req.params.userId;
        const conversation = await conversationModel.find({ members: { $in: [userId] } })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


