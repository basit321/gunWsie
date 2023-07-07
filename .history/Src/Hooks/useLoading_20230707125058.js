import { useContext } from 'react';
import { LoadingContext } from '../context/useLoading';

const useLoading = () => {
    const { loading, setLoading } =
        useContext(LoadingContext);

    return {
        loading,
        setLoading
    };
};

export default useLoading;
