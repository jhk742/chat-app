import { useState, useEffect } from 'react'
import { baseUrl, getRequest } from '../utils/services'

export const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null)
    const [error, setError] = useState(null)

    //find the other id in the members array that is not equal to the _id of the currently logged-in user
    //i.e., the recipient
    /**
     * call the useEffect implemented below to run whenever a new chat
     * is sent in as a paramter to useFetchRecipientUser, retrieving 
     * a different recipient id (such is the reason for using "recipientId" in 
     * its dependency array)
     */
    const recipientId = chat?.members?.find((id) => id !== user?._id)

    //retrieve information about the recipient
    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) return null
            const response = await getRequest(`${baseUrl}/users/find/${recipientId}`)
            if (response.error) {
                return setError(response)
            }
            setRecipientUser(response)
        }
        getUser()
    }, [recipientId])

    return { recipientUser }
}