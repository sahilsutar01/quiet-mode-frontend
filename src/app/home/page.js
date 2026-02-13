"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

/* 
 * Home Layout: High Fidelity "Cozy Sunset" Dashboard
 * Features:
 * - Complex CSS gradient background (until image gen works)
 * - Script typography "Welcome back"
 * - 4 Hyper-Glass Cards with specific gradients
 * - Floating particles
 */

const features = [
    {
        href: "/roast",
        title: "Roast Mode",
        subtitle: "Closure, but make it funny.",
        icon: "🔥", // Using emoji for now, will replace with SVG if needed
        gradient: "linear-gradient(135deg, rgba(255, 90, 90, 0.15), rgba(255, 140, 140, 0.05))",
        border: "rgba(255, 150, 150, 0.4)",
        glow: "rgba(255, 50, 50, 0.3)",
        id: "roast"
    },
    {
        href: "/vent",
        title: "Dump It Here",
        subtitle: "Things you don’t feel like explaining.",
        icon: "📝",
        gradient: "linear-gradient(135deg, rgba(100, 140, 255, 0.15), rgba(160, 180, 255, 0.05))",
        border: "rgba(150, 180, 255, 0.4)",
        glow: "rgba(50, 100, 255, 0.3)",
        id: "vent"
    },
    {
        href: "/mood",
        title: "Mood",
        subtitle: "What’s quietly sitting with you today?",
        icon: "🌙",
        gradient: "linear-gradient(135deg, rgba(200, 160, 255, 0.15), rgba(255, 200, 100, 0.05))",
        border: "rgba(200, 180, 255, 0.4)",
        glow: "rgba(200, 150, 50, 0.3)",
        id: "mood"
    },
    {
        href: "/brain-break",
        title: "Reset",
        subtitle: "Pause. Breathe. Start fresh.",
        icon: "🌸",
        gradient: "linear-gradient(135deg, rgba(100, 255, 180, 0.15), rgba(100, 220, 220, 0.05))",
        border: "rgba(100, 255, 200, 0.4)",
        glow: "rgba(50, 255, 150, 0.3)",
        id: "reset"
    },
];

export default function HomePage() {
    const [particles, setParticles] = useState([]);

    // Generate random particles on client side
    useEffect(() => {
        const p = Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: 10 + Math.random() * 20,
            delay: Math.random() * 5,
            size: 2 + Math.random() * 4,
        }));
        setParticles(p);
    }, []);

    return (
        <div className="home-container">
            {/* Background Layers */}
            <div className="home-bg-gradient" />
            <div className="home-bg-overlay" /> {/* For sunset glow */}

            {/* Particles */}
            <div className="particles-container">
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="particle"
                        style={{
                            top: `${p.y}%`,
                            left: `${p.x}%`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            animationDuration: `${p.duration}s`,
                            animationDelay: `${p.delay}s`,
                        }}
                    />
                ))}
            </div>

            {/* Header */}
            <motion.div
                className="home-header"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <div className="title-wrapper">
                    <h1 className="title-main">Welcome</h1>
                    <span className="title-script">back,</span>
                </div>
                <p className="subtitle-main">You made it <strong>through again.</strong></p>
                <div className="header-divider">♡</div>
            </motion.div>

            {/* Card Stack */}
            <div className="card-stack">
                {features.map((item, i) => (
                    <Link key={item.id} href={item.href} className="card-link">
                        <motion.div
                            className="hyper-glass-card"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.3 + i * 0.15,
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                background: item.gradient,
                                borderColor: item.border,
                                boxShadow: `0 8px 32px -4px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.2), 0 0 20px ${item.glow}`
                            }}
                        >
                            <div className="card-icon-wrapper">
                                <span className="card-icon-emoji">{item.icon}</span>
                            </div>
                            <div className="card-content">
                                <div className="card-title-row">
                                    <h3>{item.title}</h3>
                                    {item.id === "roast" && <span className="card-badge">🔥</span>}
                                </div>
                                <p>{item.subtitle}</p>
                            </div>
                            <div className="card-arrow-circle">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14" />
                                    <path d="M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>

            {/* Floating Footer Message */}
            <motion.div
                className="home-footer-msg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <p>&ldquo; Take your time. You&#39;re <span className="script-highlight">safe here.</span> &rdquo;</p>
                <div className="footer-heart">♡</div>
            </motion.div>

        </div>
    );
}
