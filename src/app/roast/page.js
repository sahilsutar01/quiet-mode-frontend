"use client";

import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const roasts = [
    "He mistook attention for effort.",
    "You weren\u2019t asking for too much. He just wasn\u2019t enough.",
    "The bar wasn\u2019t high. He still tripped.",
    "You outgrew what couldn\u2019t grow with you.",
    "Some people are lessons. Not destinations.",
    "He offered confusion where clarity was required.",
    "Emotional maturity was not in stock.",
    "He thought showing up was the same as being present.",
    "You were a chapter. He was a footnote.",
    "He peaked at potential and called it love.",
    "Not every bond is a loss. Some are a correction.",
    "He treated loyalty like a subscription he could cancel.",
    "You don\u2019t miss him. You miss what you imagined he\u2019d become.",
    "He confused comfort with connection.",
    "You were patient. He was a pattern.",
];

export default function RoastPage() {
    const [currentRoast, setCurrentRoast] = useState(
        roasts[Math.floor(Math.random() * roasts.length)]
    );
    const [shared, setShared] = useState(false);
    const [sending, setSending] = useState(false);
    const [key, setKey] = useState(0);

    function generateAnother() {
        let next;
        do {
            next = roasts[Math.floor(Math.random() * roasts.length)];
        } while (next === currentRoast && roasts.length > 1);
        setCurrentRoast(next);
        setShared(false);
        setKey((k) => k + 1);
    }

    async function shareRoast() {
        setSending(true);
        try {
            await fetch(`${API_URL}/api/roast`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: currentRoast }),
            });
        } catch (e) {
            // silently handle
        }
        setSending(false);
        setShared(true);
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
                    Closure, But Make It Funny.
                </motion.h1>

                <motion.div
                    className="page-intro"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <p style={{ marginBottom: "0.5rem" }}>
                        Not every ending needs a dramatic speech.
                    </p>
                    <p>
                        Sometimes growth looks like realizing you survived something that
                        wasn&apos;t meant to stay.
                    </p>
                </motion.div>

                {/* Roast Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={key}
                        className="soft-card"
                        style={{
                            textAlign: "center",
                            padding: "2rem 1.5rem",
                            marginBottom: "1.5rem",
                            minHeight: "100px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <p
                            style={{
                                fontSize: "1.1rem",
                                fontWeight: 500,
                                lineHeight: 1.6,
                                color: "var(--charcoal)",
                                fontFamily: "'Poppins', sans-serif",
                            }}
                        >
                            &ldquo;{currentRoast}&rdquo;
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Buttons */}
                {!shared ? (
                    <motion.div
                        style={{ display: "flex", gap: "0.75rem" }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                    >
                        <button
                            className="btn-secondary"
                            style={{ flex: 1 }}
                            onClick={generateAnother}
                        >
                            Generate Another
                        </button>
                        <button
                            className="btn-primary"
                            style={{ flex: 1 }}
                            onClick={shareRoast}
                            disabled={sending}
                        >
                            {sending ? "Sharing..." : "Share This 😏"}
                        </button>
                    </motion.div>
                ) : (
                    <motion.p
                        className="success-message"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Roast delivered. Emotional clarity unlocked.
                    </motion.p>
                )}

                {shared && (
                    <motion.div
                        style={{ textAlign: "center", marginTop: "1rem" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <button className="btn-secondary" onClick={generateAnother}>
                            One More
                        </button>
                    </motion.div>
                )}
            </div>
        </PageWrapper>
    );
}
