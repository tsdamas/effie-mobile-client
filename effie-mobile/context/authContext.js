import { checkHealth, regularLogin, registerUser } from "@/services/Authentication";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        if (user.session_id) {
            setIsAuthenticated(undefined);
                setTimeout(() => {
                    setIsAuthenticated(true);
                }, 3000);
        } else {
            setTimeout(() => {
                setIsAuthenticated(false);
            }, 1000);
        }
        
    }, [user]);

     const login = async (email, password) => {
        try {
            const userData = await regularLogin(email, password);
            console.log("before " + userData);
            if (userData) {
                console.log(userData);

                setUser({
                    user_id: userData.user_id,
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    session_id: userData.session_id,
                });
                
            }
        } catch(error) {
            let msg = "There was an problem signing you in";
            Alert.alert(msg);
        }
    }
    const logout = async () => {
        try {
            setIsAuthenticated(undefined);
            setTimeout(() => {
                setUser({});
            }, 2000);
            let msg = "Logout succesfully";
            Alert.alert(msg);
                
        } catch(error) {

        }
    }
    const register = async (fname, lName, email, password) => {
        try {
            // console.log(await registerUser(fname, lName, email, password));
            if (await registerUser(fname, lName, email, password)) {
                
                await login(email, password);
            } else {
                console.log('registration failed baby');
            }
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