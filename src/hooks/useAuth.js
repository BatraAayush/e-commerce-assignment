// import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 
    // const router = useRouter();

    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch('/api/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error('Failed to fetch user:', error);
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return { user, loading };
};

export default useAuth;
