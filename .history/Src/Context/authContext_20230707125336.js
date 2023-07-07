import { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(false);

    return (
        <LoadingContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </LoadingContext.Provider>
    );
};
export default AuthProvider;
