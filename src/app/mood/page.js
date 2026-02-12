"use client";

import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const moods = [
    {
        emoji: "🙂",
        label: "fine",
        message:
            "Some days are just\u2026 fine. And that\u2019s not settling. That\u2019s surviving.",
        action: "Take a slow breath. You earned this ordinary moment.",
        spotify: "https://open.spotify.com/embed/track/1BxfuPKGuaTgP7aM0Bbdwr",
    },
    {
        emoji: "😒",
        label: "frustrated",
        message:
            "Not every frustration deserves a breakdown.\nSome days are just heavier than they look.",
        action: "Drink water. Stretch your shoulders. That\u2019s enough for now.",
        spotify: "https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT",
    },
    {
        emoji: "😴",
        label: "tired",
        message:
            "Being tired isn\u2019t weakness.\nIt\u2019s often what happens when you\u2019ve been strong for longer than you admit.",
        action: "Close your eyes for 60 seconds. No screen. Just stillness.",
        spotify: "https://open.spotify.com/embed/track/6UelLqGlWMcVH1E5c4H7lY",
    },
    {
        emoji: "😤",
        label: "angry",
        message:
            "Anger isn\u2019t always destructive.\nSometimes it\u2019s the first sign you\u2019re finally setting a boundary.",
        action: "Clench your fists for 5 seconds. Release. Feel the difference.",
        spotify: "https://open.spotify.com/embed/track/3KkXRkHbMCARz0aVfEt68P",
    },
    {
        emoji: "🤷‍♀️",
        label: "neutral",
        message:
            "Neutral days count too.\nYou don\u2019t need a dramatic emotion to exist.",
        action: "Look out a window. Name three things you see. That\u2019s grounding.",
        spotify: "https://open.spotify.com/embed/track/7qiZfU4dY1lWllzX7mPBI3",
    },
    {
        emoji: "😌",
        label: "peaceful",
        message:
            "Peace doesn\u2019t always arrive loudly.\nSometimes it slips in quietly.",
        action: "Sit with this feeling. Don\u2019t question it. Let it stay.",
        spotify: "https://open.spotify.com/embed/track/1HNkqx9Ahdgi1Ixy2xkKkL",
    },
];

export default function MoodPage() {
    const [selected, setSelected] = useState(null);

    async function selectMood(mood) {
        setSelected(mood);
        try {
            await fetch(`${API_URL}/api/mood`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mood: mood.label }),
            });
        } catch (e) {
            // silently handle
        }
    }

    return (
        <PageWrapper>
            <div style={{ paddingTop: "1rem" }}>
                <motion.h1
                    className="page-title"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    What&apos;s quietly sitting with you today?
                </motion.h1>

                {/* Emoji Grid */}
                <motion.div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.75rem",
                        justifyContent: "center",
                        marginBottom: "2rem",
                        marginTop: "0.5rem",
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    {moods.map((mood) => (
                        <button
                            key={mood.label}
                            className={`emoji-btn ${selected?.label === mood.label ? "selected" : ""}`}
                            onClick={() => selectMood(mood)}
                            aria-label={mood.label}
                        >
                            {mood.emoji}
                        </button>
                    ))}
                </motion.div>

                {/* Response */}
                <AnimatePresence mode="wait">
                    {selected && (
                        <motion.div
                            key={selected.label}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
                        >
                            {/* Mood message */}
                            <div className="soft-card" style={{ textAlign: "center" }}>
                                <p
                                    style={{
                                        fontSize: "0.95rem",
                                        lineHeight: 1.8,
                                        whiteSpace: "pre-line",
                                        color: "var(--charcoal)",
                                    }}
                                >
                                    {selected.message}
                                </p>
                            </div>

                            {/* Action suggestion */}
                            <div
                                className="soft-card"
                                style={{
                                    background: "rgba(200, 213, 185, 0.2)",
                                    borderColor: "rgba(200, 213, 185, 0.3)",
                                    textAlign: "center",
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: "0.82rem",
                                        fontWeight: 500,
                                        color: "rgba(46, 46, 46, 0.6)",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.06em",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    Small Action
                                </p>
                                <p style={{ fontSize: "0.9rem", lineHeight: 1.7 }}>
                                    {selected.action}
                                </p>
                            </div>

                            {/* Spotify embed */}
                            <div className="soft-card" style={{ padding: "1rem" }}>
                                <p
                                    style={{
                                        fontSize: "0.82rem",
                                        fontWeight: 500,
                                        color: "rgba(46, 46, 46, 0.6)",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.06em",
                                        marginBottom: "0.75rem",
                                        textAlign: "center",
                                    }}
                                >
                                    Something Calm
                                </p>
                                <iframe
                                    style={{
                                        borderRadius: "12px",
                                        width: "100%",
                                        height: "80px",
                                        border: "none",
                                    }}
                                    src={`${selected.spotify}?utm_source=generator&theme=0`}
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                    title="Spotify Suggestion"
                                />
                            </div>

                            {/* Select another */}
                            <p
                                style={{
                                    textAlign: "center",
                                    fontSize: "0.78rem",
                                    color: "rgba(46, 46, 46, 0.35)",
                                    fontStyle: "italic",
                                }}
                            >
                                Tap another emoji whenever you&apos;re ready.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </PageWrapper>
    );
}
