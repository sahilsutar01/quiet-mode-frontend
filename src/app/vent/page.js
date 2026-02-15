"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const moodTags = ["overthinking", "annoyed", "numb", "tired", "calm"];

export default function VentPage() {
    const router = useRouter();
    const [content, setContent] = useState("");
    const [mood, setMood] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);
    const [submissionType, setSubmissionType] = useState("kept"); // 'kept' or 'sent'

    // Saved Vents State
    const [savedVents, setSavedVents] = useState([]);
    const [showSaved, setShowSaved] = useState(false);

    // Load saved vents on mount
    useEffect(() => {
        const saved = localStorage.getItem("quiet_mode_vents");
        if (saved) {
            setSavedVents(JSON.parse(saved));
        }
    }, []);

    // "Keep it here" - Save locally
    function handleKeep() {
        if (!content.trim()) return;

        const newVent = {
            id: Date.now(),
            content,
            mood,
            date: new Date().toLocaleDateString(),
            timestamp: new Date().toISOString()
        };

        const updatedVents = [newVent, ...savedVents];
        setSavedVents(updatedVents);
        localStorage.setItem("quiet_mode_vents", JSON.stringify(updatedVents));

        setSubmissionType("kept");
        setSubmitted(true);
        setTimeout(() => {
            reset();
        }, 2000);
    }

    // "Share with Prime God" - Send to API
    async function handleShare(ventContent = content, ventMood = mood) {
        if (!ventContent.trim()) return;

        setSending(true);
        try {
            const res = await fetch(`${API_URL}/api/vent`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: ventContent, mood: ventMood }),
            });

            if (res.ok) {
                if (!showSaved) {
                    setSubmissionType("sent");
                    setSubmitted(true);
                }
                return true;
            } else {
                throw new Error("Failed to send");
            }
        } catch (e) {
            console.error("Failed to share:", e);
            alert("Could not send message. Please check your connection.");
            return false;
        } finally {
            setSending(false);
        }
    }

    // Send a saved vent
    async function sendSavedVent(id) {
        const vent = savedVents.find(v => v.id === id);
        if (!vent) return;

        const success = await handleShare(vent.content, vent.mood);
        if (success) {
            deleteSavedVent(id);
            setShowSaved(false);
            setSubmissionType("sent");
            setSubmitted(true);
        }
    }

    // Delete a saved vent
    function deleteSavedVent(id) {
        const updated = savedVents.filter(v => v.id !== id);
        setSavedVents(updated);
        localStorage.setItem("quiet_mode_vents", JSON.stringify(updated));
    }

    function reset() {
        setContent("");
        setMood("");
        setSubmitted(false);
        setSubmissionType("kept"); // reset default
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
                justifyContent: "space-between",
                position: "relative"
            }}>
                {/* Background Image */}
                <div className="vent-mode-bg" />

                {/* Top Section: Header & Controls */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', position: 'relative', zIndex: 10 }}>
                        <button
                            onClick={() => {
                                if (showSaved) {
                                    setShowSaved(false);
                                } else {
                                    router.push('/home');
                                }
                            }}
                            style={{
                                background: 'rgba(0, 0, 0, 0.05)',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                color: '#4A4A4A',
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

                        {/* Saved Vents Toggle */}
                        <button
                            onClick={() => setShowSaved(!showSaved)}
                            style={{
                                background: showSaved ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                                border: 'none',
                                color: '#4A4A4A',
                                cursor: 'pointer',
                                padding: '0.5rem',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.9rem',
                                fontWeight: 500
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                            </svg>
                            {savedVents.length > 0 && <span>({savedVents.length})</span>}
                        </button>
                    </div>

                    {/* Header Text */}
                    <motion.div
                        className="mode-header"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'left', padding: '0 0.5rem' }}
                    >
                        <h1 style={{
                            fontSize: '2rem',
                            marginBottom: '0.8rem',
                            lineHeight: 1.2,
                            color: '#3D3D3D',
                            fontFamily: 'var(--font-serif)',
                            marginTop: '0.5rem'
                        }}>
                            {showSaved ? "Your Drafts." : "Things You Don't Feel Like Explaining."}
                        </h1>
                        <p style={{
                            fontSize: '0.95rem',
                            lineHeight: 1.6,
                            color: '#5A5A5A',
                            maxWidth: '100%',
                            margin: '0',
                            fontFamily: 'var(--font-sans)',
                        }}>
                            {showSaved
                                ? "Thoughts you decided to keep for a while. Send them when you're ready, or let them go."
                                : "You don't have to organize your thoughts here. Incomplete sentences are welcome."}
                        </p>
                    </motion.div>
                </div>

                {/* Main Content Area */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, width: '100%', position: 'relative', overflow: 'hidden' }}>

                    <AnimatePresence mode="wait">
                        {showSaved ? (
                            /* SAVED VENTS LIST */
                            <motion.div
                                key="saved-list"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '1rem 0' }}
                            >
                                {savedVents.length === 0 ? (
                                    <div style={{ textAlign: 'center', marginTop: '3rem', color: '#999' }}>
                                        <p>No saved drafts yet.</p>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {savedVents.map((vent) => (
                                            <div key={vent.id} style={{
                                                background: 'rgba(255, 255, 255, 0.6)',
                                                borderRadius: '16px',
                                                padding: '1.25rem',
                                                backdropFilter: 'blur(8px)',
                                                border: '1px solid rgba(255, 255, 255, 0.8)',
                                                boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
                                            }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', color: '#888' }}>
                                                    <span>{vent.date}</span>
                                                    <span>{vent.mood}</span>
                                                </div>
                                                <p style={{ color: '#333', fontSize: '1rem', lineHeight: 1.5, marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>
                                                    {vent.content}
                                                </p>
                                                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                                                    <button
                                                        onClick={() => deleteSavedVent(vent.id)}
                                                        style={{
                                                            padding: '0.5rem 1rem',
                                                            borderRadius: '20px',
                                                            border: 'none',
                                                            background: 'rgba(0,0,0,0.05)',
                                                            color: '#666',
                                                            fontSize: '0.85rem',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        onClick={() => sendSavedVent(vent.id)}
                                                        disabled={sending}
                                                        style={{
                                                            padding: '0.5rem 1rem',
                                                            borderRadius: '20px',
                                                            border: 'none',
                                                            background: 'linear-gradient(135deg, #D48ba0, #C26a80)',
                                                            color: 'white',
                                                            fontSize: '0.85rem',
                                                            cursor: 'pointer',
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        {sending ? "..." : "Send to Prime God"}
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            /* VENT FORM */
                            !submitted ? (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1rem'
                                    }}
                                >
                                    <textarea
                                        className="soft-textarea"
                                        placeholder="Whatever shows up is fine..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        style={{
                                            minHeight: "180px",
                                            background: "rgba(255, 255, 255, 0.45)",
                                            border: "1px solid rgba(255, 255, 255, 0.6)",
                                            color: "#333",
                                            borderRadius: "20px",
                                            padding: "1.2rem",
                                            fontSize: "1.05rem",
                                            resize: "none",
                                            fontFamily: "var(--font-sans)",
                                            backdropFilter: "blur(10px)",
                                            boxShadow: "0 4px 20px rgba(0,0,0,0.03)"
                                        }}
                                    />

                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <select
                                            className="soft-select"
                                            value={mood}
                                            onChange={(e) => setMood(e.target.value)}
                                            style={{
                                                background: "rgba(255, 255, 255, 0.45) url(\"data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E\") right 1rem center no-repeat",
                                                backgroundSize: "0.65em auto",
                                                border: "1px solid rgba(255, 255, 255, 0.6)",
                                                color: "#555",
                                                borderRadius: "50px",
                                                padding: "1rem 2.5rem 1rem 1.2rem",
                                                width: "100%",
                                                fontSize: "0.95rem",
                                                appearance: "none",
                                                WebkitAppearance: "none",
                                                backdropFilter: "blur(10px)",
                                                boxShadow: "0 4px 20px rgba(0,0,0,0.03)"
                                            }}
                                        >
                                            <option value="" style={{ color: "#999" }}>How does it feel? (optional)</option>
                                            {moodTags.map((tag) => (
                                                <option key={tag} value={tag} style={{ color: "#333" }}>
                                                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Action Buttons */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '0.8rem', marginTop: '0.5rem' }}>
                                        <button
                                            onClick={handleKeep}
                                            style={{
                                                padding: '1.1rem',
                                                borderRadius: '50px',
                                                border: 'none',
                                                background: 'rgba(255, 255, 255, 0.5)',
                                                color: '#5A4A4A',
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                backdropFilter: 'blur(5px)',
                                                transition: 'transform 0.2s',
                                                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                                            }}
                                        >
                                            Keep it here
                                        </button>

                                        <button
                                            onClick={() => handleShare()}
                                            disabled={!content.trim() || sending}
                                            style={{
                                                padding: '1.1rem',
                                                borderRadius: '50px',
                                                border: 'none',
                                                background: 'linear-gradient(135deg, #D48ba0, #C26a80)',
                                                color: 'white',
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                boxShadow: '0 8px 20px rgba(194, 106, 128, 0.4)',
                                                opacity: !content.trim() || sending ? 0.8 : 1,
                                                transition: 'transform 0.2s, box-shadow 0.2s'
                                            }}
                                        >
                                            {sending ? "Sending..." : "Share with Prime God"}
                                        </button>
                                    </div>

                                </motion.div>
                            ) : (
                                <motion.div
                                    key="success"
                                    className="celestial-glass-card"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{
                                        padding: '3rem 2rem',
                                        background: 'rgba(255,255,255,0.2)',
                                        borderColor: 'rgba(255,255,255,0.4)',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.05)'
                                    }}
                                >
                                    <h2 style={{ fontSize: '1.6rem', color: '#3D3D3D', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
                                        {submissionType === "sent" ? "Sent to Prime God." : "Saved."}
                                    </h2>
                                    <p style={{ color: '#5A5A5A', marginBottom: '2rem' }}>
                                        {submissionType === "sent"
                                            ? "Your message has been delivered."
                                            : "Your thoughts are safe with you."}
                                        <br />
                                        {submissionType === "sent" ? "You can let it go now." : "You can view or send them anytime."}
                                    </p>
                                    <button
                                        className="nav-pill"
                                        onClick={reset}
                                        style={{
                                            marginTop: 0,
                                            background: 'rgba(255,255,255,0.5)',
                                            color: '#333',
                                            borderColor: 'rgba(0,0,0,0.1)',
                                            fontWeight: '600'
                                        }}
                                    >
                                        Write Again
                                    </button>
                                </motion.div>
                            )
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Text - Hide when showing Saved list */}
                {!submitted && !showSaved && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        style={{
                            textAlign: "center",
                            color: "rgba(60, 60, 60, 0.8)",
                            fontSize: "0.85rem",
                            margin: "0 0 1.5rem 0",
                            fontWeight: 500
                        }}
                    >
                        This space isn&apos;t trying to change you. Just to give you room.
                    </motion.p>
                )}

            </div>
        </div>
    );
}
