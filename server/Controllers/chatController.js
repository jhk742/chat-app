const chatModel = require("../Models/chatModel")

const createChat = async (req, res) => {
    //extract sender & receiver ids
    const { firstId, secondId } = req.body

    try {
        //check if the chat between the two ids already exists
        const chat = await chatModel.findOne({
            //filter for chats that contain both params (ids)
            members: {$all: [firstId, secondId]}
        })

        //if the chat exists, return it with status 200
        if (chat) return res.status(200).json(chat)

        //if the chat doesn't exist, create a new chat
        const newChat = new chatModel({
            members: [firstId, secondId]
        })

        //save the newChat to the db
        const res = await newChat.save()

        //and return the newly created chat
        res.status(200).json(res)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const findUserChats = async (req, res) => {
    /*
    send in the id of the currently logged in user
    to find associated chats
    */
    const { userId } = req.params.userId
    try {
        const chats = await chatModel.find({
            //filter for all chats that contain userId
            members: {$in: [userId]}
        })

        res.status(200).json(chats)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const findChat = async (req, res) => {
    const { firstId, secondId } = req.params
    try {
        const chat = await chatModel.findOne({
            members: {$all: [firstId, secondId]}
        })

        res.status(200).json(chat)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = { createChat, findUserChats, findChat }