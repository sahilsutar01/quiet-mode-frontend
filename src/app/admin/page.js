"use client";

import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import { motion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminPage() {
    const [password, setPassword] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState(null);

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${API_URL}/api/admin`, {
                headers: { "x-admin-password": password },
            });
            const json = await res.json();

            if (!json.success) {
                setError("Incorrect password.");
                setLoading(false);
                return;
            }

            setData(json);
            setAuthenticated(true);
        } catch (err) {
            setError("Could not connect to the server.");
        }
        setLoading(false);
    }

    if (!authenticated) {
        return (
            <PageWrapper>
                <div
                    style={{
                        paddingTop: "4rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minHeight: "60vh",
                    }}
                >
                    <motion.div
                        className="soft-card"
                        style={{
                            width: "100%",
                            maxWidth: "340px",
                            textAlign: "center",
                            padding: "2rem",
                        }}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2
                            style={{
                                fontFamily: "'Poppins', sans-serif",
                                fontSize: "1.1rem",
                                fontWeight: 600,
                                marginBottom: "1.5rem",
                            }}
                        >
                            Admin Access
                        </h2>
                        <form
                            onSubmit={handleLogin}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                            }}
                        >
                            <input
                                type="password"
                                className="admin-input"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {error && (
                                <p style={{ fontSize: "0.82rem", color: "var(--dusty-rose)" }}>
                                    {error}
                                </p>
                            )}
                            <button
                                className="btn-primary"
                                type="submit"
                                disabled={loading || !password}
                                style={{ width: "100%" }}
                            >
                                {loading ? "Checking..." : "Enter"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </PageWrapper>
        );
    }

    const { stats, submissions } = data;

    const vents = submissions.filter((s) => s.type === "vent");
    const roasts = submissions.filter((s) => s.type === "roast");

    // Simple bar chart for mood frequency
    const moodEntries = Object.entries(stats.moodFrequency || {});
    const maxMoodCount = Math.max(...moodEntries.map(([, c]) => c), 1);

    return (
        <PageWrapper>
            <div style={{ paddingTop: "1rem" }}>
                <motion.h1
                    className="page-title"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Dashboard
                </motion.h1>

                {/* Stats grid */}
                <motion.div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "0.75rem",
                        marginBottom: "1.5rem",
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                >
                    <div className="soft-card stat-card">
                        <div className="stat-number">{stats.total}</div>
                        <div className="stat-label">Total</div>
                    </div>
                    <div className="soft-card stat-card">
                        <div className="stat-number">{stats.vents}</div>
                        <div className="stat-label">Vents</div>
                    </div>
                    <div className="soft-card stat-card">
                        <div className="stat-number">{stats.roasts}</div>
                        <div className="stat-label">Roasts</div>
                    </div>
                    <div className="soft-card stat-card">
                        <div className="stat-number">{stats.moods}</div>
                        <div className="stat-label">Moods</div>
                    </div>
                </motion.div>

                {/* Mood frequency chart */}
                {moodEntries.length > 0 && (
                    <motion.div
                        className="soft-card"
                        style={{ marginBottom: "1.5rem" }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.5 }}
                    >
                        <p
                            style={{
                                fontSize: "0.82rem",
                                fontWeight: 500,
                                color: "rgba(46,46,46,0.6)",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                marginBottom: "1rem",
                            }}
                        >
                            Mood Frequency
                        </p>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.6rem",
                            }}
                        >
                            {moodEntries.map(([mood, count]) => (
                                <div key={mood} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                    <span
                                        style={{
                                            fontSize: "0.82rem",
                                            width: "80px",
                                            textTransform: "capitalize",
                                            color: "rgba(46,46,46,0.6)",
                                        }}
                                    >
                                        {mood}
                                    </span>
                                    <div
                                        style={{
                                            flex: 1,
                                            height: "8px",
                                            borderRadius: "4px",
                                            background: "rgba(216,167,177,0.15)",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: `${(count / maxMoodCount) * 100}%`,
                                                height: "100%",
                                                borderRadius: "4px",
                                                background: "linear-gradient(90deg, var(--dusty-rose), var(--blush-pink))",
                                                transition: "width 0.5s ease",
                                            }}
                                        />
                                    </div>
                                    <span
                                        style={{
                                            fontSize: "0.78rem",
                                            color: "rgba(46,46,46,0.4)",
                                            width: "24px",
                                            textAlign: "right",
                                        }}
                                    >
                                        {count}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Vent messages */}
                {vents.length > 0 && (
                    <motion.div
                        className="soft-card"
                        style={{ marginBottom: "1.5rem" }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.5 }}
                    >
                        <p
                            style={{
                                fontSize: "0.82rem",
                                fontWeight: 500,
                                color: "rgba(46,46,46,0.6)",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                marginBottom: "1rem",
                            }}
                        >
                            Vent Messages ({vents.length})
                        </p>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.75rem",
                            }}
                        >
                            {vents.map((v) => (
                                <div
                                    key={v._id}
                                    style={{
                                        padding: "0.75rem",
                                        borderRadius: "12px",
                                        background: "rgba(245, 239, 230, 0.5)",
                                        fontSize: "0.85rem",
                                        lineHeight: 1.7,
                                    }}
                                >
                                    <p>{v.content}</p>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginTop: "0.5rem",
                                            fontSize: "0.72rem",
                                            color: "rgba(46,46,46,0.35)",
                                        }}
                                    >
                                        <span>{v.mood && `Mood: ${v.mood}`}</span>
                                        <span>
                                            {new Date(v.createdAt).toLocaleDateString()} •{" "}
                                            {v.device}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Roast shares */}
                {roasts.length > 0 && (
                    <motion.div
                        className="soft-card"
                        style={{ marginBottom: "1.5rem" }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45, duration: 0.5 }}
                    >
                        <p
                            style={{
                                fontSize: "0.82rem",
                                fontWeight: 500,
                                color: "rgba(46,46,46,0.6)",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                marginBottom: "1rem",
                            }}
                        >
                            Roast Shares ({roasts.length})
                        </p>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.75rem",
                            }}
                        >
                            {roasts.map((r) => (
                                <div
                                    key={r._id}
                                    style={{
                                        padding: "0.75rem",
                                        borderRadius: "12px",
                                        background: "rgba(248, 200, 220, 0.15)",
                                        fontSize: "0.85rem",
                                        lineHeight: 1.7,
                                    }}
                                >
                                    <p>&ldquo;{r.content}&rdquo;</p>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            marginTop: "0.5rem",
                                            fontSize: "0.72rem",
                                            color: "rgba(46,46,46,0.35)",
                                        }}
                                    >
                                        <span>
                                            {new Date(r.createdAt).toLocaleDateString()} •{" "}
                                            {r.device}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </PageWrapper>
    );
}
