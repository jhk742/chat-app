import { createContext, useCallback, useEffect, useState } from 'react'
import { baseUrl, getRequest, postRequest } from '../utils/services'

export const ChatContext = createContext()

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null)
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false)
    const [userChatsError, setUserChatsError] = useState(null)
    const [potentialChats, setPotentialChats] = useState([])

    //to fetch the users with whom the logged-in user has not started a conversation with
    useEffect(() => {
        const getPotentialUsers = async () => {
            if (!user) return
            const res = await getRequest(`${baseUrl}/users`)
            if (res.error) {
                return console.log("Error fetching users", res)
            }
            const potentialUsers = res.filter((u) => {
                let doesChatExist = false
                if (user._id === u._id) return false

                //for existing chats
                if (userChats) {
                    doesChatExist = userChats?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id
                    })
                }

                return !doesChatExist
            })
            setPotentialChats(potentialUsers)
        }
        getPotentialUsers()
    }, [userChats])

    useEffect(() => {
        const getUserChats = async () => {
            if (user?._id) {
                setIsUserChatsLoading(true)
                setUserChatsError(null)
                const res = await getRequest(`${baseUrl}/chats/${user._id}`)
                setIsUserChatsLoading(false)
                if (res.error) {
                    return setUserChatsError(res)
                }
                setUserChats(res)
            }
        }
        getUserChats()
    }, [user])

    const createChat = useCallback(async (firstId, secondId) => {
        const res = await postRequest(`${baseUrl}/chats`, JSON.stringify({
            firstId,
            secondId
        }))
        
        if (res.error) {
            return console.log("Error creating chat", res)
        }
        console.log(potentialChats)
        setUserChats((prev) => [...prev, res])
    }, [])
    
    return (
        <ChatContext.Provider value = {{
            userChats,
            isUserChatsLoading,
            userChatsError,
            potentialChats,
            createChat
        }}>
            {children}
        </ChatContext.Provider>
    )
}

