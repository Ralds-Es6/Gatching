import React from 'react';
import titleScreen from '../assets/bg/title screen.svg';

const Home = () => {
    return (
        <main
            className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10"
            style={{ backgroundImage: `url("${titleScreen}")` }}
        >
            {/* Blank page with full-screen fixed background */}
        </main>
    );
};

export default Home;
