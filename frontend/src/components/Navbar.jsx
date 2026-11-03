import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold tracking-tight">
        🚀 MERN Starter
      </Link>

      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-indigo-200 text-sm hidden sm:block">
              Hi, <strong>{user.name}</strong>
            </span>
            <Link
              to="/change-password"
              className="text-sm text-white hover:text-indigo-200 transition"
            >
              Change Password
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white text-indigo-600 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm hover:text-indigo-200 transition">Login</Link>
            <Link
              to="/signup"
              className="bg-white text-indigo-600 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
