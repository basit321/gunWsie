import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({});

    useEffect(() => {
        // fetch user data from async storage
        const getUser = async () => {
            await AsyncStorage.getItem('@UserProfile')
                .then((res) => {
                    if (res) {
                        const user = JSON.parse(res);

                        console.log('user context: ', user.user.uid);

                        setUser({
                            email: user.user.email,
                            name: user.user.displayName,
                            avatar: user.user.photoURL,
                            uid: user.user.uid,
                        });
                    }
                }
                )
        }

        getUser();
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
