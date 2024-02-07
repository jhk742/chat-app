import { createContext, useEffect, useState } from 'react'
import { baseUrl, getRequest, postRequest } from '../utils/services'

export const ChatContext = createContext()

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null)
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false)
    const [userChatsError, setUserChatsError] = useState(null)

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
    
    return (
        <ChatContext.Provider value = {{
            userChats,
            isUserChatsLoading,
            userChatsError
        }}>
            {children}
        </ChatContext.Provider>
    )
}

