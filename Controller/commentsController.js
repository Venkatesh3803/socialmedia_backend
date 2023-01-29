import postModel from "../Models/Post.js"


//post comments
export const postComment = async (req, res) => {
    const id = req.params.id;
    const post = await postModel.findById(id);

    try {
        if (post) {
            await post.updateOne({ $push: { comments: req.body } })
            res.status(200).json("Commented Posted")
        } else {
            res.status(404).json("post not avalible")
        }
    } catch (error) {
        res.status(500).json({ message: message.error })
    }

}

//delete comment

export const deleteComment = async (req, res) => {
    const id = req.params.id;
    const post = await postModel.findById(id)
    const { commentId } = req.body
    try {
        if (post) {
            await post.updateOne({
                $pull: ({
                    comments: [commentId]   
                })
            })
            res.status(200).json("comment deleted")
        } else {
            res.status(404).json("posts not avaliable")
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

