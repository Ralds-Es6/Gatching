import React from 'react';

const Home = () => {
    return (
        <main className="container mt-20 text-center">
            <header>
                <h1 className="text-[4rem] font-extrabold mb-6 animate-[fadeInDown_0.8s_ease-out]">
                    Modern <span className="text-accent">MERN</span> Boilerplate
                </h1>
                <p className="text-text-muted text-xl max-w-[600px] mx-auto mb-12">
                    A premium, decoupled setup for building powerful full-stack applications with speed and style.
                </p>
                <div className="flex justify-center gap-4">
                    <button className="btn-primary">Explore Features</button>
                    <button className="bg-transparent border border-text-muted text-text-main py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105">
                        Read Docs
                    </button>
                </div>
            </header>

            <section className="mt-32 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
                <div className="card">
                    <h3 className="text-xl font-extrabold">Decoupled Architecture</h3>
                    <p className="text-text-muted mt-4">Separate backend and frontend directories for clean organization and independent scaling.</p>
                </div>
                <div className="card">
                    <h3 className="text-xl font-extrabold">Premium Styling</h3>
                    <p className="text-text-muted mt-4">Modern design system with glassmorphism, gradients, and responsive layouts.</p>
                </div>
                <div className="card">
                    <h3 className="text-xl font-extrabold">Ready to Scale</h3>
                    <p className="text-text-muted mt-4">Pre-configured with Express, Mongoose, Vite, and React for a solid foundation.</p>
                </div>
            </section>
        </main>
    );
};

export default Home;
