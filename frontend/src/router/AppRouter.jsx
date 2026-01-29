import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../views/Home';
import Login from '../views/Login';
import AdminLogin from '../views/AdminLogin';
import Register from '../views/Register';
import ForgotPassword from '../views/ForgotPassword';
import AdminDashboard from '../views/AdminDashboard';
import UserDashboard from '../views/UserDashboard';
import Navbar from '../components/Navbar';
import BackgroundMusic from '../components/BackgroundMusic';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminRoute from '../components/AdminRoute';

const AppRouter = () => {
    return (
        <Router>
            <BackgroundMusic />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={
                    <AdminRoute>
                        <AdminDashboard />
                    </AdminRoute>
                } />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <UserDashboard />
                    </ProtectedRoute>
                } />
                {/* Add more routes here */}
            </Routes>
            <footer className="mt-auto py-16 border-t border-white/10 text-center">
                <p className="text-text-muted">&copy; 2026 HaneulzPH</p>
            </footer>
        </Router>
    );
};

export default AppRouter;
