import React from 'react'
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient'

export default function UserChat( { chat, user }) {

    const { recipientUser } = useFetchRecipientUser(chat, user)

    return (
        <div>
            User Chat
        </div>
    )
}