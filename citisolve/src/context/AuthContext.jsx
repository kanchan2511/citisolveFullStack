
import { createContext,useContext, useState } from "react";
//create context
export const AuthContext = createContext()
//provide the context
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState('')
    const login = (user) => {
        setUser(user)
    }
    const logout =() => {
        setUser('');
    }
    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}
//consume context
export const useAuth = () => {
    return useContext(AuthContext)
}