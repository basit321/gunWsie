import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({});

    useEffect(() => {
        // fetch user data from async storage
        AsyncStorage.getItem('@UserProfile')
            .then((res) => {
                if (res) {
                    setUser(JSON.parse(res));
                }
            }
            )
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;
