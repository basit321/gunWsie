import { useContext } from 'react';
import { AuthContext } from '../Context/authContext';

const useLoading = () => {
    const { user, setUser } =
        useContext(AuthContext);

    return {
        user,
        setUser
    };
};

export default useLoading;
