import React, { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient'

export default function ChatBox() {
    const { user } = useContext(AuthContext)
    const { currentChat, messages, isMessagesLoading, messagesError } = useContext(ChatContext)
    const { recipientUser } = useFetchRecipientUser(currentChat, user)

    if (!recipientUser) return (
        <p 
            style={{textAlign: "center", width:"100%"}}
        >
            No conversation selected yet
        </p>
    )

    return (
        <div>
            Chatbox
            {
                messages?.map((message, index) => {
                    return (
                        <div key={index}>
                            <span className="message">
                                {message.text}
                            </span>
                            <span className="sender">
                                {user._id === message.senderId ? user.name : message.senderId}
                            </span>
                            <span className="time">
                                {message.createdAt}
                            </span>
                        </div>
                    )
                    
                })
            }
        </div>
    )
}
