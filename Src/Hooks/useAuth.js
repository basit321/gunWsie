import { useContext } from 'react';
import { AuthContext } from '../Context/authContext';

const useAuth = () => {
    const { user, setUser } =
        useContext(AuthContext);

    console.log('user: ', user);

    return {
        user,
        setUser
    };
};

export default useAuth;
