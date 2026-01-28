import React, { useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password, 3: Success
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setIsError(false);

        try {
            const response = await api.post('/auth/forgot-password', { email });
            if (response.data.success) {
                setStep(2);
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
        if (password !== confirmPassword) {
            setIsError(true);
            return setMessage('Passwords do not match.');
        }

        setLoading(true);
        setMessage('');
        setIsError(false);

        try {
            const response = await api.post('/auth/reset-password', { email, otp, password });
            if (response.data.success) {
                setStep(3);
            }
        } catch (err) {
            setIsError(true);
            setMessage(err.response?.data?.message || 'Reset failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-8">
            <div className="card glass w-full max-w-[450px] !p-10 !rounded-[24px] shadow-card relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
                    <div
                        className="h-full bg-gradient-to-r from-accent to-primary transition-all duration-500"
                        style={{ width: `${(step / 3) * 100}%` }}
                    ></div>
                </div>

                {step === 1 && (
                    <div className="animate-fadeIn">
                        <div className="text-center mb-8">
                            <h2 className="text-[2rem] font-extrabold mb-2 text-text-main">Forgot Password</h2>
                            <p className="text-text-muted">Enter your email to receive a reset OTP</p>
                        </div>

                        <form onSubmit={handleSendOtp} className="flex flex-col gap-6">
                            {message && (
                                <div className={`p-4 rounded-lg text-sm text-center border ${isError ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-primary/10 text-primary border-primary/20'}`}>
                                    {message}
                                </div>
                            )}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-text-muted ml-1">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-primary transition-all"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-primary py-4" disabled={loading}>
                                {loading ? 'Sending...' : 'Send OTP'}
                            </button>
                            <Link to="/login" className="text-center text-sm text-text-muted hover:text-text-main transition-colors">
                                Back to Login
                            </Link>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-fadeIn">
                        <div className="text-center mb-8">
                            <h2 className="text-[2rem] font-extrabold mb-2 text-text-main">Reset Password</h2>
                            <p className="text-text-muted">Check your email for the code</p>
                        </div>

                        <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
                            {message && (
                                <div className={`p-4 rounded-lg text-sm text-center border ${isError ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-primary/10 text-primary border-primary/20'}`}>
                                    {message}
                                </div>
                            )}

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs text-text-muted ml-1">OTP Code</label>
                                <input
                                    type="text"
                                    placeholder="123456"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="bg-white/5 border border-white/10 p-3 rounded-xl text-white text-center tracking-widest outline-none focus:border-primary transition-all"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs text-text-muted ml-1">New Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-primary transition-all"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs text-text-muted ml-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-primary transition-all"
                                    required
                                />
                            </div>

                            <button type="submit" className="btn-primary mt-2 py-4" disabled={loading}>
                                {loading ? 'Resetting...' : 'Update Password'}
                            </button>
                        </form>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-fadeIn text-center py-6">
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-4xl">✨</span>
                        </div>
                        <h2 className="text-[2rem] font-extrabold mb-4 text-text-main">All Set!</h2>
                        <p className="text-text-muted mb-8">Your password has been reset successfully.</p>
                        <Link to="/login" className="btn-primary block py-4 no-underline">
                            Login Now
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
