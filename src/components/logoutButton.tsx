import { useState } from 'react';
import { useRouter } from 'next/router';
import { MdLogout } from "react-icons/md";
import Spinner from './spinner';

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    await fetch('/api/logout', { method: 'POST' });
    setLoading(false);
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`flex text-sm items-center space-x-1 px-3 py-1 rounded text-white bg-zinc-800 hover:bg-zinc-900 transition duration-200 ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
    > {loading ? <Spinner /> : <><MdLogout className="text-sm" />
      <span className='hidden md:block'>Salir</span>
    </>}
      
    </button>
  );
};

export default LogoutButton;
