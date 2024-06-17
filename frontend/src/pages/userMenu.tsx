import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const UserMenu: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/user/logout/');
      localStorage.removeItem('authToken');
      router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setShowMenu(!showMenu)} className="focus:outline-none">
        <img
          src="/images/icons8-cavalo-64.png" // Certifique-se de ter um ícone de usuário neste caminho
          alt="User Icon"
          className="w-11 h-11"
        />
      </button>
      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
