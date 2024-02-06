import { createContext, useCallback, useState } from 'react'
import { baseUrl, postRequest } from '../utils/services'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [registerError, setRegisterError] = useState(null)
    const [isRegisterLoading, setIsRegisterLoading] = useState(false)
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    })


    //callback to update state, registerInfo
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    }, [])

    const registerUser = useCallback(async (e) => {
        e.preventDefault()
        setIsRegisterLoading(true)
        setRegisterError(null)
        const res = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo))
        
        setIsRegisterLoading(false)

        if (res.error) {
            return setRegisterError(res)
        }
        localStorage.setItem("User", JSON.stringify(res))
        setUser(res)
    }, [registerInfo])

    //provide components with the necessary props
    return (
        <AuthContext.Provider value={{
            user, 
            registerInfo, 
            updateRegisterInfo, 
            registerUser,
            registerError,
            isRegisterLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}