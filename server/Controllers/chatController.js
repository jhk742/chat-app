const chatModel = require("../Models/chatModel")

//createChat
//getUserChats
//findChat
const createChat = async (req, res) => {
    //extract sender & receiver ids
    const {firstId, secondId} = req.body

    try {
        //check if the chat between the two ids already exists
        const chat = await chatModel.findOne({
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