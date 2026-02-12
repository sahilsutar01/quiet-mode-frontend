"use client";

import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const moodTags = ["overthinking", "annoyed", "numb", "tired", "calm"];

export default function VentPage() {
    const [content, setContent] = useState("");
    const [mood, setMood] = useState("");
    const [shareMode, setShareMode] = useState("keep");
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);

    async function handleSubmit() {
        if (!content.trim()) return;

        if (shareMode === "share") {
            setSending(true);
            try {
                await fetch(`${API_URL}/api/vent`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ content, mood }),
                });
            } catch (e) {
                // silently handle
            }
            setSending(false);
        }

        setSubmitted(true);
    }

    function reset() {
        setContent("");
        setMood("");
        setShareMode("keep");
        setSubmitted(false);
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
                    Things You Don&apos;t Feel Like Explaining.
                </motion.h1>

                <motion.div
                    className="page-intro"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                >
                    <p style={{ marginBottom: "0.5rem" }}>
                        You don&apos;t have to organize your thoughts here.
                    </p>
                    <p style={{ marginBottom: "0.5rem" }}>
                        Incomplete sentences are welcome. Contradictions are allowed.
                    </p>
                    <p>Messy feelings are still valid.</p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!submitted ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
                        >
                            {/* Textarea */}
                            <textarea
                                className="soft-textarea"
                                placeholder="Whatever shows up is fine..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                style={{ minHeight: "180px" }}
                            />

                            {/* Mood tag dropdown */}
                            <select
                                className="soft-select"
                                value={mood}
                                onChange={(e) => setMood(e.target.value)}
                            >
                                <option value="">How does it feel? (optional)</option>
                                {moodTags.map((tag) => (
                                    <option key={tag} value={tag}>
                                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                                    </option>
                                ))}
                            </select>

                            {/* Toggle — keep or share */}
                            <div className="toggle-group">
                                <button
                                    className={`toggle-option ${shareMode === "keep" ? "active" : ""}`}
                                    onClick={() => setShareMode("keep")}
                                    type="button"
                                >
                                    Keep it here
                                </button>
                                <button
                                    className={`toggle-option ${shareMode === "share" ? "active" : ""}`}
                                    onClick={() => setShareMode("share")}
                                    type="button"
                                >
                                    Share it
                                </button>
                            </div>

                            {/* Submit */}
                            <button
                                className="btn-primary"
                                style={{ width: "100%" }}
                                onClick={handleSubmit}
                                disabled={!content.trim() || sending}
                            >
                                {sending ? "Sending..." : shareMode === "share" ? "Share" : "Done"}
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{ textAlign: "center" }}
                        >
                            <p className="success-message">
                                Thank you for trusting this space with something real.
                            </p>
                            <button
                                className="btn-secondary"
                                onClick={reset}
                                style={{ marginTop: "1rem" }}
                            >
                                Write Again
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </PageWrapper>
    );
}
