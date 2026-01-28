import React, { useState } from 'react';
import userGatchaImg from '../assets/banner/banner 1/user1 gatcha.jpg';
import superGatchaImg from '../assets/banner/banner 2/user 2 gatcha.jpg';
import userCardIcon from '../assets/buttons/user card.svg';
import adminCardIcon from '../assets/buttons/admin card.svg';
import commentCardIcon from '../assets/buttons/comment card.svg';

const UserDashboard = () => {
    // State to handle which view to display: 'user', 'super', or 'comments'
    const [activeView, setActiveView] = useState('user');

    return (
        <div className="container py-12">
            <div className="max-w-6xl mx-auto">
                {/* Header with Navigation */}
                <header className="flex items-center gap-8 mb-12">
                    <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
                        <span className={`w-2.5 h-10 rounded-full transition-colors duration-500 ${activeView === 'user' ? 'bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]' :
                                activeView === 'super' ? 'bg-accent shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)]' :
                                    'bg-white/40'
                            }`}></span>
                        {activeView === 'user' ? 'User Gatcha' : activeView === 'super' ? 'Super Gatcha' : 'Recent Comments'}
                    </h1>

                    {/* Navigation Icons Overlaying the Main Interaction */}
                    <nav className="flex gap-6 items-center ml-auto">
                        {/* 1st SVG: User Gatcha View */}
                        <button
                            onClick={() => setActiveView('user')}
                            title="User Gatcha"
                            className="relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 group"
                        >
                            <div className={`absolute -inset-1 rounded-full border-2 border-primary transition-all duration-500 ${activeView === 'user' ? 'scale-100 opacity-100 shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'}`}></div>
                            <div className="w-14 h-14 rounded-full overflow-hidden bg-white/5 border border-white/10 group-hover:border-transparent transition-all duration-500 relative z-10">
                                <img src={userCardIcon} alt="User" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>
                        </button>

                        {/* 2nd SVG: Super Gatcha View */}
                        <button
                            onClick={() => setActiveView('super')}
                            title="Super Gatcha"
                            className="relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 group"
                        >
                            <div className={`absolute -inset-1 rounded-full border-2 border-accent transition-all duration-500 ${activeView === 'super' ? 'scale-100 opacity-100 shadow-[0_0_20px_rgba(var(--accent-rgb),0.5)]' : 'scale-150 opacity-0 group-hover:scale-100 group-hover:opacity-100'}`}></div>
                            <div className="w-14 h-14 rounded-full overflow-hidden bg-white/5 border border-white/10 group-hover:border-transparent transition-all duration-500 relative z-10">
                                <img src={adminCardIcon} alt="Super" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>
                        </button>

                        {/* 3rd SVG: Comments View */}
                        <button
                            onClick={() => setActiveView('comments')}
                            title="Comments Feed"
                            className="relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 group"
                        >
                            <div className={`absolute -inset-1 rounded-full border-2 border-white/40 transition-all duration-500 ${activeView === 'comments' ? 'scale-100 opacity-100 shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'}`}></div>
                            <div className="w-14 h-14 rounded-full overflow-hidden bg-white/5 border border-white/10 group-hover:border-transparent transition-all duration-500 relative z-10">
                                <img src={commentCardIcon} alt="Comments" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>
                        </button>
                    </nav>
                </header>

                {/* Conditional View Rendering */}
                <main className="min-h-[600px] animate-[fadeIn_0.5s_ease-out]">

                    {/* View 1: User Gatcha */}
                    {activeView === 'user' && (
                        <div className="w-full relative overflow-hidden rounded-3xl border border-white/10 group shadow-2xl animate-[fadeInRight_0.4s_ease-out]">
                            <img
                                src={userGatchaImg}
                                alt="User Gatcha Banner"
                                className="w-full aspect-video lg:aspect-[21/9] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex items-end p-12">
                                <div className="space-y-4">
                                    <span className="px-5 py-2 bg-primary text-white text-xs font-black rounded-full uppercase tracking-widest shadow-lg border border-white/20">Limited Time</span>
                                    <h3 className="text-6xl font-black text-white drop-shadow-2xl">Legendary Gatcha Event</h3>
                                    <p className="text-white/80 text-lg max-w-2xl leading-relaxed">The special gatcha event is now live! Summon powerful warriors to join your ranks and dominate the battlefield.</p>
                                    <button className="btn-primary px-10 py-4 text-sm font-black uppercase tracking-widest mt-4">Summon Now</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* View 2: Super Gatcha */}
                    {activeView === 'super' && (
                        <div className="w-full relative overflow-hidden rounded-3xl border border-white/10 group shadow-2xl animate-[fadeInRight_0.4s_ease-out]">
                            <img
                                src={superGatchaImg}
                                alt="Super Gatcha Banner"
                                className="w-full aspect-video lg:aspect-[21/9] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex items-end p-12">
                                <div className="space-y-4">
                                    <span className="px-5 py-2 bg-accent text-white text-xs font-black rounded-full uppercase tracking-widest shadow-lg border border-white/20">Premium Access</span>
                                    <h3 className="text-6xl font-black text-white drop-shadow-2xl">Elite Super Gatcha</h3>
                                    <p className="text-white/80 text-lg max-w-2xl leading-relaxed">Unlock the rarest heroes and legendary equipment with the newly updated Super Gatcha pool. High drop rates for the next 24 hours!</p>
                                    <button className="bg-accent hover:brightness-110 text-white px-10 py-4 rounded-xl text-sm font-black uppercase tracking-widest mt-4 shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] transition-all">Summon Elite</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* View 3: Comments Feed */}
                    {activeView === 'comments' && (
                        <div className="card glass !rounded-3xl border-white/10 shadow-2xl p-12 animate-[fadeInUp_0.4s_ease-out]">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <h2 className="text-3xl font-black">Community Discussion</h2>
                                    <div className="space-y-8 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <div key={i} className="pb-6 border-b border-white/5 last:border-0 group cursor-default">
                                                <div className="flex items-center gap-4 mb-3">
                                                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-sm font-black border border-primary/30 group-hover:bg-primary group-hover:text-white transition-all">U{i}</div>
                                                    <div className="flex flex-col">
                                                        <span className="text-base font-bold group-hover:text-primary transition-colors">Commander_User_{i}00</span>
                                                        <span className="text-xs text-text-muted">{i * 15} mins ago</span>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-text-muted leading-relaxed italic group-hover:text-text-main transition-colors">
                                                    "This new gatcha event is incredible. I managed to pull a 5-star unit on my third try! The drop rates feel much more generous this time."
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-white/5 rounded-2xl p-8 border border-white/10 h-fit">
                                    <h3 className="text-xl font-bold mb-6">Leave a Reply</h3>
                                    <textarea
                                        placeholder="Share your battle glory..."
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-base min-h-[200px] outline-none focus:border-primary focus:bg-white/10 transition-all placeholder:text-text-muted/50 mb-6"
                                    ></textarea>
                                    <button className="btn-primary w-full py-4 text-sm font-black uppercase tracking-widest shadow-xl shadow-primary/20">Post to Feed</button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default UserDashboard;
