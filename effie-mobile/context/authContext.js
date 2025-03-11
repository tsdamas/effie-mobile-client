import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        //onAuthStateChanged

        // setTimeout(() => {
        //     setIsAuthenticated(true);
        // }, 5000);

        setTimeout(() => {
            setIsAuthenticated(false);
        }, 1000);
    }, []);

     const login = async (email, password) => {
        try {
            if(email == 'customer@effie.com' && password == 'letmein') {
                setIsAuthenticated(undefined);
                setTimeout(() => {
                    setIsAuthenticated(true);
                }, 4000);
            } else {
                let msg = "Wrong credentials";
                Alert.alert(msg);
                return
            }
        } catch(error) {

        }
    }
    const logout = async () => {
        try {
            setIsAuthenticated(undefined);
            setTimeout(() => {
                setIsAuthenticated(false);
            }, 2000);
            let msg = "Logout succesfully";
            Alert.alert(msg);
                
        } catch(error) {

        }
    }
    const register = async (fname, lName, email, password) => {
        try {

        } catch(error) {

        }
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const value = useContext(AuthContext);
    if(!value) {
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }
    return value;
}