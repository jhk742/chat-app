import { createContext, useCallback, useState } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    })

    //callback to update state, registerInfo
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    }, [])

    //provide components with the necessary props
    return <AuthContext.Provider value={{user, registerInfo, updateRegisterInfo}}>
        {children}
    </AuthContext.Provider>
}