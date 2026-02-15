"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const affirmations = [
    "You don’t have to be strong all the time.",
    "Breathe. You are exactly where you need to be.",
    "This feeling is temporary. You are permanent.",
    "It’s okay to rest. The world will wait.",
    "You are loved more than you know.",
    "Healing is not linear. Be gentle with yourself.",
    "You have survived 100% of your bad days.",
    "Let go of what you cannot control.",
    "Your peace is more important than driving yourself crazy trying to understand why.",
    "Inhale peace. Exhale worry.",
];

export default function ComfortPage() {
    const router = useRouter();
    const [currentQuote, setCurrentQuote] = useState("");
    const [key, setKey] = useState(0);

    // Initial load
    useEffect(() => {
        setCurrentQuote(affirmations[Math.floor(Math.random() * affirmations.length)]);
    }, []);

    function generateAnother() {
        let next;
        do {
            next = affirmations[Math.floor(Math.random() * affirmations.length)];
        } while (next === currentQuote && affirmations.length > 1);
        setCurrentQuote(next);
        setKey((k) => k + 1);
    }

    return (
        <div style={{
            height: "100vh",
            height: "100dvh",
            display: "flex",
            justifyContent: "center",
            background: "#F5EFE6",
            overflow: "hidden"
        }}>
            <div className="app-container" style={{
                padding: "1rem 1.5rem 2.5rem",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between"
            }}>
                {/* Celestial Background - Blue/Purple */}
                <div className="comfort-mode-bg" />
                <div className="celestial-stars" />

                {/* Top Section: Back Button & Header */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', position: 'relative', zIndex: 10 }}>
                        <button
                            onClick={() => router.push('/home')}
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                cursor: 'pointer',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backdropFilter: 'blur(4px)'
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                        </button>
                    </div>

                    <motion.div
                        className="mode-header"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', marginBottom: '1rem' }}
                    >
                        <h1 style={{ fontSize: '2.2rem', fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>Comfort Mode</h1>
                    </motion.div>
                </div>

                {/* Middle Section: Quote & Breathing */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '1.5rem' }}>

                    {/* Glass Card */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={key}
                            className="celestial-glass-card"
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            style={{ padding: '2rem 1.5rem', width: '100%', maxHeight: '40vh', overflowY: 'auto' }}
                        >
                            <p className="celestial-quote" style={{ marginBottom: 0, fontSize: '1.35rem' }}>
                                {currentQuote}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Breathing Exercise */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        style={{ position: "relative", display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                        <div className="breathing-circle" style={{ width: '100px', height: '100px' }}>
                            {/* Visual only */}
                        </div>
                        <div className="breathing-text" style={{ marginTop: '0.75rem', position: 'static', fontSize: '0.9rem' }}>
                            Inhale for 4...<br />Exhale slowly...
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Section: Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1rem" }}
                >
                    <button className="action-pill"
                        onClick={generateAnother}
                        style={{ padding: '1rem' }}
                    >
                        Another one
                    </button>

                    <button className="nav-pill" onClick={() => router.push('/roast')} style={{ marginTop: 0, padding: '0.9rem' }}>
                        Switch to Roast Mode
                    </button>
                </motion.div>

            </div>
        </div>
    );
}
