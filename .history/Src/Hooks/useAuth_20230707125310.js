import { useContext } from 'react';
import { LoadingContext } from '../Context/authContext';

const useLoading = () => {
    const { loading, setLoading } =
        useContext(LoadingContext);

    return {
        loading,
        setLoading
    };
};

export default useLoading;
