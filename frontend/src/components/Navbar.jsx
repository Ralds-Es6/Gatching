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
            <div className="container flex flex-col md:flex-row justify-between items-center h-auto md:h-20 py-4 md:py-0 gap-4 md:gap-0">
                <Link to="/" className="no-underline">
                    <h2 className="text-3xl md:text-4xl font-normal bg-gradient-primary bg-clip-text text-transparent font-['Balerina']">Astral World.</h2>
                </Link>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 items-center">
                    <Link to="/" className="text-text-muted no-underline text-sm md:text-base font-medium hover:text-text-main transition-colors duration-300">Home</Link>


                    {isAuthenticated ? (
                        <>
                            <Link to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'} className="text-text-muted no-underline text-sm md:text-base font-medium hover:text-text-main transition-colors duration-300">Astral Chord</Link>
                            <div className="flex items-center gap-2 md:gap-3 border-l border-white/10 pl-4 md:pl-6">
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
                                    <img src={userIcon} alt="User" className="w-full h-full object-cover" />
                                </div>
                                <span className="text-accent text-xs md:text-sm font-bold">{user?.name}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="text-red-400 text-xs md:text-sm font-semibold hover:text-red-300 transition-colors cursor-pointer"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-text-muted no-underline text-sm md:text-base font-medium hover:text-text-main transition-colors duration-300">Login</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
