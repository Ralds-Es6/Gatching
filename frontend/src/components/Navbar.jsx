import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="glass sticky top-0 z-[100] w-full">
            <div className="container flex justify-between items-center h-20">
                <Link to="/" className="no-underline">
                    <h2 className="text-2xl font-extrabold bg-gradient-primary bg-clip-text text-transparent">Gatching.</h2>
                </Link>
                <div className="flex gap-8 items-center">
                    <Link to="/" className="text-text-muted no-underline font-medium hover:text-text-main transition-colors duration-300">Home</Link>
                    <Link to="/about" className="text-text-muted no-underline font-medium hover:text-text-main transition-colors duration-300">About</Link>

                    {isAuthenticated ? (
                        <>
                            <Link to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'} className="text-text-muted no-underline font-medium hover:text-text-main transition-colors duration-300">Dashboard</Link>
                            <span className="text-accent text-sm font-bold border-l border-white/10 pl-4">{user?.name}</span>
                            <button
                                onClick={handleLogout}
                                className="text-red-400 text-sm font-semibold hover:text-red-300 transition-colors cursor-pointer"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-text-muted no-underline font-medium hover:text-text-main transition-colors duration-300">Login</Link>
                            <Link to="/admin" className="text-text-muted no-underline font-medium hover:text-text-main transition-colors duration-300">Admin</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
