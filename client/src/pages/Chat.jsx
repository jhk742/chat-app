import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import { Container, Stack } from 'react-bootstrap'
import UserChat from '../components/chat/UserChat'
import PotentialChats from '../components/chat/PotentialChats'
import { AuthContext } from '../context/AuthContext'

export default function Chat() {
  const { user } = useContext(AuthContext)
  const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ChatContext)

  return (
    <div>
      <Container>
        <PotentialChats />
        {userChats?.length < 1 ? null : 
        <Stack direction="horizontal" gap={4} className="align-items-start">
            <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
              {isUserChatsLoading && <span>Loading chats</span>}
              {userChats?.map((chat, index) => {
                return (
                  <div 
                    key={index} 
                    onClick={() => updateCurrentChat(chat)}
                  >
                    <UserChat 
                      chat={chat} 
                      user={user} 
                    />
                  </div>
                )
              })}
            </Stack>
            <p>Chatbox</p>
        </Stack>}
      </Container>
    </div>
  )
}
