"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const roasts = [
    "He mistook attention for effort.",
    "You weren’t asking for too much. He just wasn’t enough.",
    "The bar wasn’t high. He still tripped.",
    "You outgrew what couldn’t grow with you.",
    "Some people are lessons. Not destinations.",
    "He offered confusion where clarity was required.",
    "Emotional maturity was not in stock.",
    "He thought showing up was the same as being present.",
    "You were a chapter. He was a footnote.",
    "He peaked at potential and called it love.",
    "Not every bond is a loss. Some are a correction.",
    "He treated loyalty like a subscription he could cancel.",
    "You don’t miss him. You miss what you imagined he’d become.",
    "He confused comfort with connection.",
    "You were patient. He was a pattern.",
];

export default function RoastPage() {
    const router = useRouter();
    const [currentRoast, setCurrentRoast] = useState("");
    const [key, setKey] = useState(0);

    // Initial load
    useEffect(() => {
        setCurrentRoast(roasts[Math.floor(Math.random() * roasts.length)]);
    }, []);

    function generateAnother() {
        let next;
        do {
            next = roasts[Math.floor(Math.random() * roasts.length)];
        } while (next === currentRoast && roasts.length > 1);
        setCurrentRoast(next);
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
                {/* Celestial Background - Absolute to this container */}
                <div className="roast-mode-bg" />
                <div className="celestial-stars" />

                {/* Top Section: Back Button */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', position: 'relative', zIndex: 10 }}>
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

                    {/* Header - Centered & Clean aligned */}
                    <motion.div
                        className="mode-header"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', padding: '0 1rem' }}
                    >
                        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', lineHeight: 1.2, marginTop: '5rem' }}>Closure, But Make It Happy.</h1>
                        <p style={{ fontSize: '0.9rem', lineHeight: 1.5, opacity: 0.9, maxWidth: '90%', margin: '1rem auto 0' }}>
                            Not every ending needs a dramatic speech. Sometimes growth looks like realizing you survived something that wasn’t meant to stay.
                        </p>
                    </motion.div>
                </div>

                {/* Middle Section: Quote */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={key}
                            className="celestial-glass-card"
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.4 }}
                            style={{ padding: '2rem 1.5rem', width: '100%', marginTop: '1rem' }}
                        >
                            <span className="quote-mark" style={{ top: '-1rem', left: '-0.5rem' }}>“</span>
                            <p className="celestial-quote" style={{ fontSize: '1.3rem', lineHeight: 1.5, marginBottom: 0, textAlign: 'center' }}>
                                {currentRoast}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        style={{
                            textAlign: "center",
                            color: "rgba(255,255,255,0.7)",
                            fontSize: "0.8rem",
                            marginTop: "2rem"
                        }}
                    >
                        You’re allowed to choose better.
                    </motion.p>
                </div>

                {/* Bottom Section: Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1rem" }}
                >
                    <button className="action-pill" onClick={generateAnother} style={{ padding: '1rem' }}>
                        Generate Again
                    </button>

                    <button className="nav-pill" onClick={() => router.push('/comfort')} style={{ marginTop: 0, padding: '0.9rem' }}>
                        Switch to Comfort Mode
                    </button>
                </motion.div>

            </div>
        </div>
    );
}
