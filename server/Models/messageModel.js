const mongoose = require("mongoose")

const messageSchema = mongoose.Schema(
    {
        chatId: String,
        senderId: String,
        text: String
    },
    {
        timestamps: true
    }
)

const messageModel = mongoose.model("Message", messageSchema)

module.exports = messageModel