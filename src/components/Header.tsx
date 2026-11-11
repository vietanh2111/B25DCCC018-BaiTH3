import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAppSelector } from '../app/hooks';
import { ShoppingCart, Sun, Moon, LogOut, User as UserIcon } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();

  return (
    <header className={`sticky top-0 z-50 shadow-md ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-wider">ShopMini</Link>
        <div className="flex items-center gap-6">
          <Link to="/cart" className="relative flex items-center gap-1 hover:text-blue-500">
            <ShoppingCart size={22} />
            <span>Giỏ hàng</span>
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalQuantity}
              </span>
            )}
          </Link>
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-sm font-medium"><UserIcon size={16} /> {user.username}</span>
              <button onClick={() => { logout(); navigate('/login'); }} className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm">
                <LogOut size={16} /> Đăng xuất
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-blue-700">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};