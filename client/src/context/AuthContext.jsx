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


    //callback to update state, registerInfo, whenever the onChange event is triggered
    //within the Register.jsx component's Form
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    }, [])

    //for form submission
    const registerUser = useCallback(async (e) => {
        e.preventDefault()
        setIsRegisterLoading(true) //indicates that the registration process is in progress
        setRegisterError(null)//clears any registration errors
        const res = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo))
        /**
         * this line sends a POST request (defined in services.js) to
         * http://localhost:5000/api/users/register, registerInfo, as JSON data in the req body
         */
        
        setIsRegisterLoading(false)//indicates that the registration process is complete

        //if the response contains an 'error' property, set registerError
        //the return statement ensures the function exits early
        if (res.error) {
            return setRegisterError(res)
        }
        //if not, store the info into localStorage and invoke setUser
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
            {/**refers to the child components that will be nested within 
             * AuthContextProvider when it is used. */}
        </AuthContext.Provider>
    )
}