import { useRouter } from 'next/navigation';

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');

        router.push('/login');
    };

    return (
        <button className='border border-black bg-black text-white px-4 py-1 rounded hover:bg-white hover:text-black' onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
