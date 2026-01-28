import React, { useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Registration, 2: OTP, 3: Success
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form States
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [otp, setOtp] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);
        try {
            const response = await api.post('/auth/register', {
                name: formData.name,
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            if (response.data.success) {
                setStep(2);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/verify-otp', {
                email: formData.email,
                otp: otp
            });

            if (response.data.success) {
                setStep(3);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid or expired OTP.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-8">
            <div className="card glass w-full max-w-[500px] !p-10 !rounded-[24px] shadow-card relative overflow-hidden">
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
                    <div
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                        style={{ width: `${(step / 3) * 100}%` }}
                    ></div>
                </div>

                {/* Step 1: Registration Form */}
                {step === 1 && (
                    <div className="animate-fadeIn">
                        <div className="text-center mb-8">
                            <h2 className="text-[2rem] font-extrabold mb-2 text-text-main">Create Account</h2>
                            <p className="text-text-muted">Join Gatching today</p>
                        </div>

                        <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
                            {error && (
                                <div className="p-4 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 text-sm text-center">
                                    {error}
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs text-text-muted ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-primary transition-all"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs text-text-muted ml-1">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="johndoe123"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-primary transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs text-text-muted ml-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-primary transition-all"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs text-text-muted ml-1">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-primary transition-all"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs text-text-muted ml-1">Confirm</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-primary transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn-primary mt-4 py-4 disabled:opacity-70 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                {loading ? 'Creating Account...' : 'Continue'}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-text-muted">
                            Already have an account? <Link to="/login" className="text-accent hover:underline">Sign In</Link>
                        </p>
                    </div>
                )}

                {/* Step 2: OTP Verification */}
                {step === 2 && (
                    <div className="animate-fadeIn">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📧</span>
                            </div>
                            <h2 className="text-[2rem] font-extrabold mb-2 text-text-main">Verify Email</h2>
                            <p className="text-text-muted">We've sent a 6-digit code to <br /><span className="text-text-main font-medium">{formData.email}</span></p>
                        </div>

                        <form onSubmit={handleVerifyOtp} className="flex flex-col gap-6">
                            {error && (
                                <div className="p-4 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 text-sm text-center">
                                    {error}
                                </div>
                            )}

                            <div className="flex flex-col gap-2">
                                <label className="text-center text-sm text-text-muted">Enter OTP Code</label>
                                <input
                                    type="text"
                                    maxLength="6"
                                    placeholder="000000"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                    className="bg-white/5 border border-white/10 p-5 rounded-2xl text-white text-center text-3xl tracking-[1rem] outline-none focus:border-primary transition-all font-mono"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn-primary py-4 disabled:opacity-70"
                                disabled={loading || otp.length !== 6}
                            >
                                {loading ? 'Verifying...' : 'Verify & Register'}
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="text-text-muted text-sm hover:text-text-main transition-colors"
                            >
                                ← Back to Registration
                            </button>
                        </form>
                    </div>
                )}

                {/* Step 3: Success Message */}
                {step === 3 && (
                    <div className="animate-fadeIn text-center py-6">
                        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                            <span className="text-5xl">✅</span>
                        </div>
                        <h2 className="text-[2.5rem] font-extrabold mb-4 text-text-main">Success!</h2>
                        <p className="text-text-muted text-lg mb-10">
                            Your account has been created successfully. <br />
                            You can now log in to your account.
                        </p>

                        <Link
                            to="/login"
                            className="btn-primary block w-full py-4 text-center no-underline"
                        >
                            Go to Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;
