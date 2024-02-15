import React, { useContext } from 'react'
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient'
import { Stack } from 'react-bootstrap'
import avatar from '../../assets/avatar.svg'
import { ChatContext } from '../../context/ChatContext'
export default function UserChat( { chat, user }) {

    //data of the receiving user 
    const { recipientUser } = useFetchRecipientUser(chat, user)

    const { onlineUsers } = useContext(ChatContext)

    return (
        <Stack 
            direction="horizontal" 
            gap={3} 
            className="user-card align-items-center p-2 justify-content-between"
            role="button"
        >
                <div className="d-flex">
                    <div className="me-2">
                        <img src={avatar} height="35px"></img>
                    </div>
                    <div className="text-content">
                        <div className="name">
                            {recipientUser?.name}
                        </div>
                        <div className="text">
                            Message
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column align-items-end">
                    <div className="date">
                        12/12/2023
                    </div>
                    <div className="this-user-notifications">
                        2
                    </div>
                    <div className={
                        onlineUsers?.some((user) => user.userId === user._id) ?
                        "user-online" : 
                        ""
                    }></div>
                </div>
        </Stack>
    )
}