import React, { useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import titleScreen from '../assets/bg/title screen.svg';

const Login = () => {
    const { login: authLogin } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const response = await api.post('/auth/login', { email, password });

            if (response.data.success) {
                authLogin(response.data);
                setMessage(`Welcome back, ${response.data.name}!`);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1500);
            }
        } catch (err) {
            setMessage(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-8 relative overflow-hidden">
            {/* Background with Blur */}
            <div
                className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat blur-[6px] -z-10 scale-110"
                style={{ backgroundImage: `url("${titleScreen}")` }}
            ></div>

            <div className="card glass w-full max-w-[450px] !p-12 !rounded-[24px] shadow-card">
                <div className="text-center mb-10">
                    <h2 className="text-[2rem] font-extrabold mb-2 text-text-main">Welcome Back</h2>
                    <p className="text-text-muted">Login to your Astral World account</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {message && (
                        <div className={`p-4 rounded-lg text-sm text-center border ${message.includes('Welcome')
                            ? 'bg-primary/10 text-primary border-primary/20'
                            : 'bg-red-500/10 text-red-500 border-red-500/20'
                            }`}>
                            {message}
                        </div>
                    )}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-text-muted ml-1">Email or Username</label>
                        <input
                            type="text"
                            disabled={loading}
                            placeholder="Enter your email or username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none transition-all focus:border-primary ${loading ? 'opacity-50' : 'opacity-100'}`}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-text-muted ml-1">Password</label>
                        <input
                            type="password"
                            disabled={loading}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none transition-all focus:border-primary ${loading ? 'opacity-50' : 'opacity-100'}`}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary mt-4 py-4 disabled:opacity-70" disabled={loading}>
                        {loading ? 'Logging in...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 text-center flex flex-col gap-3">
                    <Link to="/forgot-password" size="sm" className="text-text-muted no-underline hover:text-text-main text-sm transition-colors">
                        Forgot Password?
                    </Link>
                    <Link to="/register" className="text-accent no-underline text-sm hover:underline">
                        Don't have an account? Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
