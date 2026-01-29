import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import bgmFile from '../assets/bgm/Genshin.mp3';

const BackgroundMusic = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const location = useLocation();

    // Hide music on admin pages
    const isAdminPage = location.pathname.startsWith('/admin');

    useEffect(() => {
        if (isAdminPage) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            // Attempt to autoplay if previously playing (most browsers block autoplay though)
            // so we rely on user interaction mostly
        }
    }, [isAdminPage]);

    const toggleMusic = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(err => {
                console.log("Autoplay prevented or audio error:", err);
            });
        }
        setIsPlaying(!isPlaying);
    };

    if (isAdminPage) return null;

    return (
        <div className="fixed bottom-8 right-8 z-[500]">
            <audio ref={audioRef} src={bgmFile} loop />
            <button
                onClick={toggleMusic}
                title={isPlaying ? "Mute Music" : "Play Music"}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg border backdrop-blur-md ${isPlaying
                        ? 'bg-primary/20 border-primary/40 text-primary animate-pulse'
                        : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                    }`}
            >
                {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default BackgroundMusic;
