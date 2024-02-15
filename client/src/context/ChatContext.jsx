import { createContext, useCallback, useEffect, useState } from 'react'
import { baseUrl, getRequest, postRequest } from '../utils/services'
import { io } from 'socket.io-client'

export const ChatContext = createContext()

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null)
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false)
    const [userChatsError, setUserChatsError] = useState(null)
    const [potentialChats, setPotentialChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState(null)
    const [isMessagesLoading, setIsMessagesLoading] = useState(false)
    const [messagesError, setMessagesError] = useState(null)
    const [sendTextMessageError, setSendTextMessageError] = useState(null)
    const [newMessage, setNewMessage] = useState(null)
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])

    console.log("ONLINE USERS ", onlineUsers)

    //initialize socket
    useEffect(() => {
        const newSocket = io("http://localhost:3000")
        setSocket(newSocket)

        return () => {
            newSocket.disconnect()
        }
        //add user as a dependency so that whenever we have a new user, we set a new socket
    }, [user])

    //to trigger/send events
    useEffect(() => {
        if (socket === null) return
        //when a new user logs in
        socket.emit("addNewUser", user?._id)

        //listens for the getOnlineUsers event from (socket)
        //we can now pass this array of onlineUsers as a value (via context provider)
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res)
        })
    }, [socket])

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

    //retrieve messages of a specific chat
    useEffect(() => {
        const getMessages = async () => {
            setIsMessagesLoading(true)
            setMessagesError(null)
            const res = await getRequest(`${baseUrl}/messages/${currentChat?._id}`)
            setIsMessagesLoading(false)

            if (res.error) {
                return setMessagesError(res)
            }
            setMessages(res)
        }
        getMessages()
    }, [currentChat])

    //for potential chats
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

    //for chats that have already been initiated
    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat)
    }, [])

    //to send messages
    const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
        if (!textMessage) return console.log("You must type something...")
        
        const res = await postRequest(`${baseUrl}/messages`, JSON.stringify({
            chatId: currentChatId,
            senderId: sender,
            text: textMessage
        }))

        if (res.error) {
            return setSendTextMessageError(res)
        }

        setNewMessage(res)
        setMessages(prev => [...prev, res])
        setTextMessage("")
    }, [])
    
    return (
        <ChatContext.Provider value = {{
            userChats,
            isUserChatsLoading,
            userChatsError,
            potentialChats,
            createChat,
            updateCurrentChat,
            messages,
            isMessagesLoading,
            messagesError,
            currentChat,
            sendTextMessage,
            onlineUsers
        }}>
            {children}
        </ChatContext.Provider>
    )
}

