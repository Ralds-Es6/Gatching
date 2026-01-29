import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import userIcon from '../assets/icon/user1/Admin User Icon.svg';

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
                    <h2 className="text-4xl font-normal bg-gradient-primary bg-clip-text text-transparent font-['Balerina']">Astral World.</h2>
                </Link>
                <div className="flex gap-8 items-center">
                    <Link to="/" className="text-text-muted no-underline font-medium hover:text-text-main transition-colors duration-300">Home</Link>


                    {isAuthenticated ? (
                        <>
                            <Link to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'} className="text-text-muted no-underline font-medium hover:text-text-main transition-colors duration-300">Astral Chord</Link>
                            <div className="flex items-center gap-3 border-l border-white/10 pl-6">
                                <div className="w-8 h-8 rounded-full overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
                                    <img src={userIcon} alt="User" className="w-full h-full object-cover" />
                                </div>
                                <span className="text-accent text-sm font-bold">{user?.name}</span>
                            </div>
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
