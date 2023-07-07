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
                    const user = JSON.parse(res);

                    setUser({
                        email: user.user.email,
                        name: user.user.displayName,
                        avatar: user.user.photoURL,
                        uid: user.user.uid,
                    });
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
