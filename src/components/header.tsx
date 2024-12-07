import { useState, useEffect } from 'react';
import LogoutButton from './logoutButton';

const Header = () => {
  const [user, setUser] = useState<{ name: string; profileImage?: string } | null>(null);

  useEffect(() => {
    // Obtener los datos del usuario desde el localStorage (o desde el backend si es necesario)
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <header className="flex absolute w-full items-center justify-between py-3 px-6 md:px-10 bg-white">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/assets/logo.png" alt="Logo" className="h-12 mr-4 hidden md:block" /> {/* Reemplaza /logo.png con la ruta de tu logo */}
      </div>

      {/* User Profile */}
      <div className="flex items-center space-x-2">
        {user ? (
          <>
            <span className="font-semibold">{user.name}</span>
            <div className="relative">
              <img
                src="/assets/user_icon.png"
                alt={user.name}
                className="w-12 h-12"
              />
            </div>
            <LogoutButton />
            
          </>
        ) : (
          <span>Cargando...</span>
        )}

        {/* Logout Icon */}
      </div>
    </header>
  );
};

export default Header;
