import { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: "Jin"
    })
    return <AuthContext.Provider value={{user}}>
        {children}
    </AuthContext.Provider>
}