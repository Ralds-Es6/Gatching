import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import titleScreen from '../assets/bg/title screen.svg';

const AdminLogin = () => {
    const { login: authLogin } = useAuth();
    const navigate = useNavigate();

    // UI State
    const [view, setView] = useState('login'); // 'login' or 'forgot'
    const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: OTP/New Pass, 3: Success

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Feedback State
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);
        setLoading(true);

        try {
            const response = await api.post('/auth/login', { email, password });
            if (response.data.success) {
                if (response.data.role === 'admin') {
                    authLogin(response.data);
                    setMessage(`Welcome ${response.data.name}! Login Successful.`);
                    setTimeout(() => navigate('/admin/dashboard'), 1500);
                } else {
                    setIsError(true);
                    setMessage('Unauthorized: Access denied.');
                }
            }
        } catch (err) {
            setIsError(true);
            setMessage(err.response?.data?.message || 'Login failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleSendForgotOtp = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);
        setLoading(true);

        try {
            const response = await api.post('/auth/forgot-password', { email });
            if (response.data.success) {
                setForgotStep(2);
                setMessage('OTP sent to your email.');
            }
        } catch (err) {
            setIsError(true);
            setMessage(err.response?.data?.message || 'Failed to send OTP.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setIsError(true);
            return setMessage('Passwords do not match.');
        }

        setMessage('');
        setIsError(false);
        setLoading(true);

        try {
            const response = await api.post('/auth/reset-password', {
                email,
                otp,
                password: newPassword
            });
            if (response.data.success) {
                setForgotStep(3);
            }
        } catch (err) {
            setIsError(true);
            setMessage(err.response?.data?.message || 'Reset failed.');
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

            <div className="card glass w-full max-w-[450px] !p-12 !rounded-[24px] shadow-card relative overflow-hidden">

                {/* Login View */}
                {view === 'login' && (
                    <div className="animate-fadeIn">
                        <div className="text-center mb-10">
                            <h2 className="text-[2rem] font-extrabold mb-2 bg-gradient-primary bg-clip-text text-transparent">
                                Admin Portal
                            </h2>
                            <p className="text-text-muted">Secure access to Astral World management</p>
                        </div>

                        <form onSubmit={handleLogin} className="flex flex-col gap-6">
                            {message && (
                                <div className={`p-4 rounded-lg text-sm text-center border ${!isError ? 'bg-accent/10 text-accent border-accent/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
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
                                    className="bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none transition-all focus:border-primary"
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
                                    className="bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none transition-all focus:border-primary"
                                    required
                                />
                            </div>

                            <button type="submit" className="btn-primary mt-4 py-4" disabled={loading}>
                                {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <button
                                onClick={() => { setView('forgot'); setMessage(''); setIsError(false); }}
                                className="text-accent no-underline text-sm hover:underline bg-transparent border-none cursor-pointer"
                            >
                                Forgot password?
                            </button>
                        </div>
                    </div>
                )}

                {/* Forgot Password View */}
                {view === 'forgot' && (
                    <div className="animate-fadeIn">
                        {/* Progress Bar for Forgot View */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                            <div className="h-full bg-accent transition-all duration-300" style={{ width: `${(forgotStep / 3) * 100}%` }}></div>
                        </div>

                        {forgotStep === 1 && (
                            <>
                                <div className="text-center mb-10">
                                    <h2 className="text-[1.8rem] font-extrabold mb-2 text-text-main">Recovery</h2>
                                    <p className="text-text-muted">Enter email to receive reset OTP</p>
                                </div>
                                <form onSubmit={handleSendForgotOtp} className="flex flex-col gap-6">
                                    {message && (
                                        <div className={`p-4 rounded-lg text-sm text-center border ${isError ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-primary/10 text-primary border-primary/20'}`}>
                                            {message}
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-2">
                                        <input
                                            type="email"
                                            placeholder="admin@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-primary"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn-primary py-4" disabled={loading}>
                                        {loading ? 'Sending...' : 'Send OTP'}
                                    </button>
                                    <button onClick={() => setView('login')} className="text-text-muted text-sm hover:text-text-main transition-colors bg-transparent border-none cursor-pointer">
                                        Back to Login
                                    </button>
                                </form>
                            </>
                        )}

                        {forgotStep === 2 && (
                            <>
                                <div className="text-center mb-8">
                                    <h2 className="text-[1.8rem] font-extrabold mb-2 text-text-main">Set New Password</h2>
                                    <p className="text-text-muted">Check your email for the OTP code</p>
                                </div>
                                <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
                                    {message && (
                                        <div className={`p-4 rounded-lg text-sm text-center border ${isError ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-primary/10 text-primary border-primary/20'}`}>
                                            {message}
                                        </div>
                                    )}
                                    <input
                                        type="text"
                                        placeholder="OTP Code"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="bg-white/5 border border-white/10 p-3 rounded-xl text-white text-center tracking-widest outline-none focus:border-primary"
                                        required
                                    />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-primary"
                                        required
                                    />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-primary"
                                        required
                                    />
                                    <button type="submit" className="btn-primary mt-2 py-4" disabled={loading}>
                                        {loading ? 'Updating...' : 'Reset Password'}
                                    </button>
                                </form>
                            </>
                        )}

                        {forgotStep === 3 && (
                            <div className="text-center py-6">
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-4xl">✅</span>
                                </div>
                                <h2 className="text-[1.8rem] font-extrabold mb-4 text-text-main">Success!</h2>
                                <p className="text-text-muted mb-8">Password updated. You can now login.</p>
                                <button onClick={() => { setView('login'); setForgotStep(1); }} className="btn-primary block w-full py-4 no-underline border-none cursor-pointer">
                                    Go to Login
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminLogin;
