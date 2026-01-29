import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import userGatchaImg from '../assets/banner/banner 1/user1 gatcha.jpg';
import superGatchaImg from '../assets/banner/banner 2/user 2 gatcha.jpg';
import userCardIcon from '../assets/buttons/user card.svg';
import adminCardIcon from '../assets/buttons/admin card.svg';

const UserDashboard = () => {
    const { user } = useAuth();
    const [activeView, setActiveView] = useState('user');
    const [isWishing, setIsWishing] = useState(false);
    const [wishResult, setWishResult] = useState(null);
    const [inventory, setInventory] = useState([]);
    const [showInventory, setShowInventory] = useState(false);
    const [enchantment, setEnchantment] = useState('');
    const isJaeguriUnlocked = enchantment === 'haneulzarayo27';
    const hasWishedHannyangi = inventory.some(item => item.pool === 'hannyangi');
    const hasWishedJaeguri = inventory.some(item => item.pool === 'jaeguri');
    const [previewImage, setPreviewImage] = useState(null);
    const [previewFolder, setPreviewFolder] = useState('');

    useEffect(() => {
        fetchInventory();
    }, [user]);

    const fetchInventory = async () => {
        if (!user) return;
        try {
            const query = user.email ? `email=${user.email}` : `username=${user.username || user.name}`;
            const response = await api.get(`/gacha/inventory?${query}`);
            if (response.data.success) {
                setInventory(response.data.inventory);
            }
        } catch (err) {
            console.error('Failed to fetch inventory:', err);
        }
    };

    const handleWishHannyangi = async () => {
        if (!user) {
            alert('Please log in again to perform a wish.');
            return;
        }
        if (isWishing) return;
        setIsWishing(true);
        setWishResult(null);

        // Artificial delay for the "cute stars" spinner
        await new Promise(resolve => setTimeout(resolve, 2500));

        try {
            const response = await api.post('/gacha/wish/hannyangi', {
                email: user.email,
                username: user.username || user.name
            });
            if (response.data.success) {
                setWishResult(response.data.data);
                fetchInventory();
            }
        } catch (err) {
            console.error('Wish failed error object:', err);
            const status = err.response?.status;
            const msg = err.response?.data?.message || err.message;
            alert(`Wish API Error (Status ${status}): ${msg}\nCheck console for details.`);
        } finally {
            setIsWishing(false);
        }
    };

    const handleWishJaeguri = async () => {
        if (!user) {
            alert('Please log in again to perform a wish.');
            return;
        }
        if (!isJaeguriUnlocked) {
            alert('The Jaeguri wish button is locked. Please enter the correct Enchantment.');
            return;
        }
        if (isWishing) return;
        setIsWishing(true);
        setWishResult(null);

        // Artificial delay for the "cute stars" spinner
        await new Promise(resolve => setTimeout(resolve, 2500));

        try {
            const response = await api.post('/gacha/wish/jaeguri', {
                email: user.email,
                username: user.username || user.name
            });
            if (response.data.success) {
                setWishResult(response.data.data);
                fetchInventory();
            }
        } catch (err) {
            console.error('Jaeguri Wish failed error object:', err);
            const status = err.response?.status;
            const msg = err.response?.data?.message || err.message;
            alert(`Wish API Error (Status ${status}): ${msg}\nCheck console for details.`);
        } finally {
            setIsWishing(false);
        }
    };

    const downloadImage = (imageName, folder = 'HAN') => {
        const link = document.createElement('a');
        link.href = `/assets/${folder}/${imageName}`;
        link.download = imageName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-[#6D8FA3] text-white">
            <div className="container py-6 md:py-12 px-4 md:px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header with Navigation */}
                    <header className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-8 md:mb-12">
                        <h1 className="text-3xl md:text-4xl font-normal tracking-tight flex items-center gap-3 font-['Balerina']">
                            <span className={`w-2.5 h-8 md:h-10 rounded-full transition-colors duration-500 ${activeView === 'user' ? 'bg-primary' : 'bg-accent'}`}></span>
                            {activeView === 'user' ? 'Hannyangi' : 'Jaeguri'}
                        </h1>

                        <nav className="flex gap-4 md:gap-6 items-center md:ml-auto">
                            <button
                                onClick={() => setActiveView('user')}
                                title="Hannyangi"
                                className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 group ${activeView === 'user' ? 'scale-110' : ''}`}
                            >
                                <div className={`absolute -inset-1 rounded-full border-2 border-primary transition-all duration-500 ${activeView === 'user' ? 'scale-100 opacity-100 shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'}`}></div>
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-white/5 border border-white/10 relative z-10">
                                    <img src={userCardIcon} alt="User" className="w-full h-full object-cover" />
                                </div>
                            </button>

                            <button
                                onClick={() => setActiveView('super')}
                                title="Jaeguri"
                                className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 group ${activeView === 'super' ? 'scale-110' : ''}`}
                            >
                                <div className={`absolute -inset-1 rounded-full border-2 border-accent transition-all duration-500 ${activeView === 'super' ? 'scale-100 opacity-100 shadow-[0_0_20px_rgba(var(--accent-rgb),0.5)]' : 'scale-150 opacity-0 group-hover:scale-100 group-hover:opacity-100'}`}></div>
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-white/5 border border-white/10 relative z-10">
                                    <img src={adminCardIcon} alt="Super" className="w-full h-full object-cover" />
                                </div>
                            </button>
                        </nav>
                    </header>

                    {/* Main Content Area */}
                    <main className="space-y-8 md:space-y-12">
                        {/* View 1: Hannyangi */}
                        {activeView === 'user' && (
                            <div className="w-full relative overflow-hidden rounded-3xl border border-white/10 group shadow-2xl animate-fadeIn">
                                <img src={userGatchaImg} alt="Hannyangi Banner" className="w-full h-auto object-contain" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex items-end p-6 md:p-12">
                                    <div className="space-y-3 md:space-y-4">
                                        <h2 className="text-4xl md:text-7xl font-normal text-[#A7D2EB] drop-shadow-2xl font-['Balerina']">Alchemist Hannyangi</h2>
                                        <p className="text-white/80 text-sm md:text-lg max-w-2xl leading-relaxed">Wish now to obtain premium potions specially brewed by Alchemist Hannyangi!</p>
                                        <button
                                            onClick={handleWishHannyangi}
                                            disabled={isWishing || hasWishedHannyangi}
                                            className="bg-[#B5CDFF] hover:bg-[#a0bbff] text-[#DAE8FF] px-6 py-3 md:px-10 md:py-4 rounded-xl text-xs md:text-sm font-black uppercase tracking-widest mt-2 md:mt-4 transition-all shadow-[0_4px_15px_rgba(181,205,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isWishing && activeView === 'user' ? 'Wishing...' : hasWishedHannyangi ? 'WISH COMPLETED' : 'WISH'}
                                        </button>
                                        {hasWishedHannyangi && (
                                            <p className="text-[10px] md:text-xs text-[#A7D2EB]/60 font-medium italic mt-2 animate-fadeIn"> You have claimed your one-time potion from Hannyangi. </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* View 2: Jaeguri */}
                        {activeView === 'super' && (
                            <div className="w-full relative overflow-hidden rounded-3xl border border-white/10 group shadow-2xl animate-fadeIn">
                                <img src={superGatchaImg} alt="Jaeguri Banner" className="w-full h-auto object-contain" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex items-end p-6 md:p-12">
                                    <div className="space-y-3 md:space-y-4">
                                        <h2 className="text-4xl md:text-7xl font-normal text-[#EBB1BB] drop-shadow-2xl font-['Balerina']">Appraiser Jaeguri</h2>
                                        <p className="text-white/80 text-sm md:text-lg max-w-2xl leading-relaxed">Wish now to obtain premium potions specially valued by Appraiser Jaeguri!</p>
                                        <div className="flex flex-col gap-4 mt-2 md:mt-4">
                                            {!isJaeguriUnlocked ? (
                                                <div className="space-y-4 animate-fadeIn">
                                                    <div className="relative group/input">
                                                        <input
                                                            type="text"
                                                            value={enchantment}
                                                            onChange={(e) => setEnchantment(e.target.value)}
                                                            placeholder="Enter Enchantment..."
                                                            className="bg-black/40 border border-[#FEABC5]/30 rounded-xl px-6 py-4 w-full max-w-xs md:w-64 text-sm font-medium focus:outline-none focus:border-[#FEABC5]/60 transition-all placeholder-[#FEABC5]/40"
                                                        />
                                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl opacity-50 text-white">🔒</span>
                                                    </div>
                                                    <p className="text-xs md:text-sm text-[#EBB1BB]/60 font-medium italic tracking-wide">Jaeguri requires a secret enchantment to proceed...</p>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col gap-2 animate-scaleUp">
                                                    <div className="flex items-center gap-2 text-[#FEABC5] text-xs font-black uppercase tracking-widest">
                                                        <span>✨ Enchantment Recognized</span>
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#FEABC5] animate-pulse"></span>
                                                    </div>
                                                    <button
                                                        onClick={handleWishJaeguri}
                                                        disabled={isWishing || hasWishedJaeguri}
                                                        className="bg-[#FEABC5] hover:bg-[#fd8dae] text-[#FFD4E1] px-6 py-3 md:px-12 md:py-4 rounded-xl text-xs md:text-sm font-black uppercase tracking-widest transition-all shadow-[0_4px_25px_rgba(254,171,197,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {isWishing && activeView === 'super' ? 'Wishing...' : hasWishedJaeguri ? 'WISH COMPLETED' : 'WISH'}
                                                    </button>
                                                    {hasWishedJaeguri && (
                                                        <p className="text-[10px] md:text-xs text-[#EBB1BB]/60 font-medium italic mt-2 animate-fadeIn"> You have claimed your one-time gift from Jaeguri. </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Inventory Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={() => setShowInventory(!showInventory)}
                                className={`px-6 py-2.5 md:px-8 md:py-3 rounded-full text-xs md:text-sm font-bold transition-all border ${activeView === 'user'
                                    ? 'bg-[#B5CDFF]/10 hover:bg-[#B5CDFF]/20 border-[#B5CDFF]/30 text-[#A7D2EB]'
                                    : 'bg-[#FEABC5]/10 hover:bg-[#FEABC5]/20 border-[#FEABC5]/30 text-[#EBB1BB]'
                                    }`}
                            >
                                {showInventory ? 'Hide' : 'View'} {activeView === 'user' ? 'Hannyangi' : 'Jaeguri'} Collection (
                                {inventory.filter(item => item.pool === (activeView === 'user' ? 'hannyangi' : 'jaeguri')).length}
                                )
                            </button>
                        </div>

                        {/* Inventory Section */}
                        {showInventory && (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 animate-fadeInUp">
                                {inventory.filter(item => item.pool === (activeView === 'user' ? 'hannyangi' : 'jaeguri')).length > 0 ? (
                                    inventory
                                        .filter(item => item.pool === (activeView === 'user' ? 'hannyangi' : 'jaeguri'))
                                        .map((item, index) => (
                                            <div key={index} className="group relative bg-white/5 rounded-2xl p-3 md:p-4 border border-white/10 hover:border-white/30 transition-all">
                                                <div
                                                    className="relative cursor-pointer overflow-hidden rounded-lg mb-3 md:mb-4 group/card"
                                                    onClick={() => {
                                                        setPreviewImage(item.imageName);
                                                        setPreviewFolder(item.pool === 'hannyangi' ? 'HAN' : 'JAE');
                                                    }}
                                                >
                                                    <img
                                                        src={`/assets/${item.pool === 'hannyangi' ? 'HAN' : 'JAE'}/${item.imageName}`}
                                                        alt="Inventory Card"
                                                        className="w-full h-auto transition-transform duration-500 group-hover/card:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                                                        <span className="text-white text-xl md:text-2xl">🔍</span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => downloadImage(item.imageName, item.pool === 'hannyangi' ? 'HAN' : 'JAE')}
                                                        className="flex-1 bg-white/10 hover:bg-white/20 py-1.5 md:py-2 rounded-lg text-[10px] md:text-xs font-bold transition-all text-white/70 hover:text-white"
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                ) : (
                                    <div className="col-span-full py-12 md:py-20 text-center text-white/40 italic text-sm md:text-base">
                                        Your {activeView === 'user' ? 'Hannyangi' : 'Jaeguri'} collection is empty. Make a wish to start!
                                    </div>
                                )}
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Wishing Spinner Overlay */}
            {isWishing && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
                    <div className="text-center space-y-6">
                        <div className="relative">
                            <span className="text-4xl md:text-6xl animate-spin inline-block">⭐</span>
                            <span className="text-2xl md:text-4xl absolute -top-4 -right-4 animate-bounce">✨</span>
                            <span className="text-2xl md:text-4xl absolute -bottom-4 -left-4 animate-bounce delay-100">✨</span>
                        </div>
                        <p className="text-xl md:text-2xl font-black tracking-widest uppercase animate-pulse">Wishing upon the stars...</p>
                    </div>
                </div>
            )}

            {/* Wish Result Modal */}
            {wishResult && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
                    <div className="relative max-w-lg w-full bg-[#1a1a1a] rounded-[32px] overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] border border-white/10 animate-scaleUp">
                        <div className="p-6 md:p-8 space-y-6 text-center">
                            <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-[#A7D2EB] to-[#B5CDFF] bg-clip-text text-transparent">New Card Obtained!</h2>
                            <div className="relative group">
                                <img src={`/assets/${activeView === 'user' ? 'HAN' : 'JAE'}/${wishResult}`} alt="Result" className="w-full h-auto rounded-2xl shadow-2xl border border-white/5" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => downloadImage(wishResult, activeView === 'user' ? 'HAN' : 'JAE')}
                                    className="bg-white/10 hover:bg-white/20 py-3 md:py-4 rounded-xl text-xs md:text-sm font-bold transition-all border border-white/5"
                                >
                                    💾 Save to Device
                                </button>
                                <button
                                    onClick={() => setWishResult(null)}
                                    className="bg-primary hover:brightness-110 py-3 md:py-4 rounded-xl text-xs md:text-sm font-black transition-all shadow-lg shadow-primary/20"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Inventory Preview Modal */}
            {previewImage && (
                <div
                    className="fixed inset-0 z-[400] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-xl animate-fadeIn"
                    onClick={() => setPreviewImage(null)}
                >
                    <div
                        className="relative max-w-4xl w-full h-full flex flex-col items-center justify-center gap-6 md:gap-8 animate-scaleUp"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setPreviewImage(null)}
                            className="absolute top-0 right-0 md:-top-12 md:-right-12 text-white/60 hover:text-white text-3xl md:text-4xl transition-colors bg-black/50 md:bg-transparent rounded-full p-2 md:p-0"
                        >
                            ✕
                        </button>

                        <div className="relative group w-full max-h-[60vh] md:max-h-[70vh] flex justify-center">
                            <img
                                src={`/assets/${previewFolder}/${previewImage}`}
                                alt="Zoomed Preview"
                                className="max-w-full max-h-full object-contain rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.1)] border border-white/10"
                            />
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <h3 className="text-xl md:text-2xl font-['Balerina'] text-white tracking-widest uppercase">{previewImage}</h3>
                            <button
                                onClick={() => downloadImage(previewImage, previewFolder)}
                                className="bg-white/10 hover:bg-white/20 px-8 py-3 md:px-12 md:py-4 rounded-full text-xs md:text-sm font-black tracking-widest uppercase transition-all border border-white/10 flex items-center gap-3 group"
                            >
                                <span className="group-hover:scale-125 transition-transform">💾</span>
                                Save to Device
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
