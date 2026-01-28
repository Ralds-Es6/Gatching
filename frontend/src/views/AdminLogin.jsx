import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
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
                if (response.data.role === 'admin') {
                    authLogin(response.data);
                    setMessage(`Welcome ${response.data.name}! Login Successful.`);
                    setTimeout(() => {
                        navigate('/admin/dashboard');
                    }, 1500);
                } else {
                    setMessage('Unauthorized: Access denied.');
                }
            }
        } catch (err) {
            setMessage(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-8">
            <div className="card glass w-full max-w-[450px] !p-12 !rounded-[24px] shadow-card">
                <div className="text-center mb-10">
                    <h2 className="text-[2rem] font-extrabold mb-2 bg-gradient-primary bg-clip-text text-transparent">
                        Admin Portal
                    </h2>
                    <p className="text-text-muted">Secure access to Gatcha Store management</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {message && (
                        <div className={`p-4 rounded-lg text-sm text-center border ${message.includes('Welcome')
                            ? 'bg-accent/10 text-accent border-accent/20'
                            : 'bg-red-500/10 text-red-500 border-red-500/20'
                            }`}>
                            {message}
                        </div>
                    )}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-text-muted ml-1">Email Address</label>
                        <input
                            type="email"
                            disabled={loading}
                            placeholder="admin@gatcha.com"
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
                        {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <a href="#" className="text-accent no-underline text-sm hover:underline">
                        Forgot password?
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
