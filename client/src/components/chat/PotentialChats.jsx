import React, { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
export default function PotentialChats() {

    const { user } = useContext(AuthContext)
    const { potentialChats, createChat } = useContext(ChatContext)

    return (
        <div className="all-users">
            {potentialChats?.map((u, index) => {
                return (
                    <div key={index}
                        className="single-user"
                        onClick={() => createChat(user._id, u._id)}   
                    >
                        {u.name}
                        <span className="user-online"></span>
                    </div>
                )
            })}
        </div>
    )
}
