import { createContext, useCallback, useState, useEffect } from 'react'
import { baseUrl, postRequest, getRequest } from '../utils/services'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [registerError, setRegisterError] = useState(null)
    const [isRegisterLoading, setIsRegisterLoading] = useState(false)
    const [loginError, setLoginError] = useState(null)
    const [isLoginLoading, setIsLoginLoading] = useState(false)
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })

    /*
    upon refreshing the page, the user state is reset to null (by default)
    Since the registerUser function below sets the user to the localstorage upon submission,
    we should be able to retrieve that data from localStorage and add the user to the state
    whenever we refresh. -> make use of useEffect (whenever the app loads, retrieve the user
        from localStorage)
    We can make use of this info to conditionally render our routes (within App.jsx)
    */
    useEffect(() => {
        const user = localStorage.getItem("User")
        setUser(JSON.parse(user))
    }, [])

    //callback to update state, registerInfo, whenever the onChange event is triggered
    //within the Register.jsx component's Form
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    }, [])

    //update login info
    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info)
    }, [])

    //for Register.jsx form submission (send post request to backend)
    const registerUser = useCallback(async (e) => {
        e.preventDefault()//to prevent page refresh
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

    //for Login.jsx form submission
    const loginUser = useCallback(async (e) => {
        e.preventDefault()
        setIsLoginLoading(true)
        setLoginError(null)
        const res = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo))
        setIsLoginLoading(false)
        if (res.error) {
            return setLoginError(res)
        }
        localStorage.setItem("User", JSON.stringify(res))
        setUser(res)
    }, [loginInfo])

    //to log the user out (clear localstorage and set user state var to null)
    //export to and import from NavBar comp
    const logoutUser = useCallback(() => {
        localStorage.removeItem("User")
        setUser(null)
    }, [])

    //provide components with the necessary props
    return (
        <AuthContext.Provider value={{
            user, 
            registerInfo, 
            updateRegisterInfo, 
            registerUser,
            registerError,
            isRegisterLoading,
            logoutUser,
            loginUser,
            updateLoginInfo,
            loginError,
            isLoginLoading,
            loginInfo
        }}>
            {children}
            {/**refers to the child components that will be nested within 
             * AuthContextProvider when it is used. */}
        </AuthContext.Provider>
    )
}