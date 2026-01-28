import React, { useState } from 'react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('list1');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const users1 = [
        { id: 1, name: 'John Doe', email: 'john@example.com', joined: '2026-01-10' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', joined: '2026-01-12' },
    ];

    const users2 = [
        { id: 3, name: 'Robert Brown', email: 'robert@example.com', joined: '2026-01-15' },
        { id: 4, name: 'Emily Davis', email: 'emily@example.com', joined: '2026-01-20' },
    ];

    return (
        <div className="flex min-h-[calc(100vh-80px)]">
            {/* Sidebar */}
            <aside className={`glass border-r border-white/10 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} p-4`}>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 px-2 py-4 border-b border-white/5 mb-4">
                        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold">A</div>
                        {sidebarOpen && <span className="font-bold tracking-tight">ADMIN PANEL</span>}
                    </div>

                    <button
                        onClick={() => { }}
                        className="flex items-center gap-4 p-3 rounded-lg bg-primary/10 text-primary border border-primary/20 w-full text-left"
                    >
                        <span className="text-xl">👥</span>
                        {sidebarOpen && <span className="font-medium">Members</span>}
                    </button>

                    {/* Add more sidebar items here */}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 bg-bg-dark/50">
                <div className="max-w-6xl mx-auto">
                    <header className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-extrabold flex items-center gap-3">
                                <span className="p-2 bg-primary/20 rounded-lg">👥</span>
                                Member Management
                            </h1>
                            <p className="text-text-muted mt-1">Review and manage your store users</p>
                        </div>

                        {/* Toggle Button for Users 1 vs Users 2 */}
                        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                            <button
                                onClick={() => setActiveTab('list1')}
                                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'list1' ? 'bg-primary text-white shadow-button' : 'text-text-muted hover:text-text-main'}`}
                            >
                                Users 1 List
                            </button>
                            <button
                                onClick={() => setActiveTab('list2')}
                                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'list2' ? 'bg-primary text-white shadow-button' : 'text-text-muted hover:text-text-main'}`}
                            >
                                Users 2 List
                            </button>
                        </div>
                    </header>

                    {/* Table Section */}
                    <div className="card !p-0 overflow-hidden border-white/5">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10">
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-muted">ID</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-muted">Name</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-muted">Email</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-muted">Joined Date</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-muted">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(activeTab === 'list1' ? users1 : users2).map(user => (
                                    <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                        <td className="p-4 text-sm font-mono text-text-muted">#{user.id}</td>
                                        <td className="p-4 font-semibold">{user.name}</td>
                                        <td className="p-4 text-sm text-text-muted">{user.email}</td>
                                        <td className="p-4 text-sm text-text-muted">{user.joined}</td>
                                        <td className="p-4">
                                            <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold rounded-full uppercase">Active</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {((activeTab === 'list1' ? users1 : users2).length === 0) && (
                            <div className="p-12 text-center text-text-muted">No users found in this list.</div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
