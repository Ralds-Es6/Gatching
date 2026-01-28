import React from 'react';

const UserDashboard = () => {
    const userGatchaCards = [
        { id: 1, name: 'Normal Warrior', rarity: 'Common', power: 100 },
        { id: 2, name: 'Swift Archer', rarity: 'Uncommon', power: 150 },
        { id: 3, name: 'Shield Guard', rarity: 'Common', power: 120 },
    ];

    const superGatchaCards = [
        { id: 4, name: 'Divine Knight', rarity: 'Legendary', power: 5000 },
        { id: 5, name: 'Shadow Assassin', rarity: 'Epic', power: 2500 },
        { id: 6, name: 'Flame Sorcerer', rarity: 'Epic', power: 2800 },
    ];

    return (
        <div className="container py-12">
            <header className="mb-12">
                <h1 className="text-4xl font-extrabold mb-2">User Dashboard</h1>
                <p className="text-text-muted">Welcome to your Gatcha collection and community.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* User Gatcha Section */}
                <section className="lg:col-span-2 space-y-12">
                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-2 h-8 bg-primary rounded-full"></span>
                            User Gatcha
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {userGatchaCards.map(card => (
                                <div key={card.id} className="card group hover:border-primary/50">
                                    <div className="aspect-[3/4] bg-white/5 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
                                        <span className="text-4xl opacity-20 group-hover:scale-110 transition-transform">⚔️</span>
                                        <div className="absolute top-2 right-2 px-2 py-1 bg-white/10 rounded text-[10px] font-bold uppercase">{card.rarity}</div>
                                    </div>
                                    <h4 className="font-bold text-lg">{card.name}</h4>
                                    <div className="flex justify-between items-center mt-2 text-sm">
                                        <span className="text-text-muted">Power</span>
                                        <span className="text-accent font-mono">{card.power}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-2 h-8 bg-accent rounded-full"></span>
                            Super Gatcha
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {superGatchaCards.map(card => (
                                <div key={card.id} className="card group border-accent/20 hover:border-accent">
                                    <div className="aspect-[3/4] bg-accent/5 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative border border-accent/10">
                                        <span className="text-4xl opacity-50 group-hover:rotate-12 transition-transform">🔥</span>
                                        <div className="absolute top-2 right-2 px-2 py-1 bg-accent/20 text-accent rounded text-[10px] font-bold uppercase ring-1 ring-accent/30">{card.rarity}</div>
                                    </div>
                                    <h4 className="font-bold text-lg text-accent">{card.name}</h4>
                                    <div className="flex justify-between items-center mt-2 text-sm">
                                        <span className="text-text-muted">Power</span>
                                        <span className="text-accent font-black tracking-widest">{card.power}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Comments Section */}
                <aside>
                    <div className="card glass h-full">
                        <h2 className="text-xl font-bold mb-6">Recent Comments</h2>
                        <div className="space-y-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="pb-4 border-b border-white/5 last:border-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">U{i}</div>
                                        <span className="text-sm font-semibold">User_{i}00</span>
                                        <span className="text-[10px] text-text-muted ml-auto">2h ago</span>
                                    </div>
                                    <p className="text-xs text-text-muted leading-relaxed">
                                        Wow, I just pulled a legendary from the Super Gatcha! This is amazing.
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8">
                            <textarea
                                placeholder="Write a comment..."
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm min-h-[100px] outline-none focus:border-primary transition-colors"
                            ></textarea>
                            <button className="btn-primary w-full mt-4 !py-2 text-sm">Post Comment</button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default UserDashboard;
