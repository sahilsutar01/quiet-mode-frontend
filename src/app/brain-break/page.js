"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import PageWrapper from "@/components/PageWrapper";
import { motion, AnimatePresence } from "framer-motion";

const wholesomeMessages = [
    "You\u2019re doing better than you think.",
    "You survived something that once felt impossible.",
    "You don\u2019t have to rush your heart.",
    "Healing isn\u2019t linear, and that\u2019s okay.",
    "Your peace matters more than their approval.",
    "Someone out there is proud of you quietly.",
    "You\u2019ve handled 100% of your worst days so far.",
    "Rest is not giving up. It\u2019s gearing up.",
    "You\u2019re allowed to choose yourself this time.",
    "The version of you that existed yesterday would be proud of today.",
    "You\u2019re not behind. You\u2019re on your own timeline.",
    "Being gentle with yourself is also a form of strength.",
];

const quizQuestions = [
    {
        question: "It\u2019s Saturday morning. You\u2019d rather:",
        options: [
            { text: "Sleep in. Obviously.", type: "chill" },
            { text: "Go for a quiet walk", type: "reflective" },
            { text: "Reorganize something", type: "productive" },
            { text: "Stare at the ceiling (with intent)", type: "creative" },
        ],
    },
    {
        question: "You get an unexpected compliment. You:",
        options: [
            { text: "Deflect immediately", type: "reflective" },
            { text: "Smile and save it mentally forever", type: "chill" },
            { text: "Analyze what they meant", type: "productive" },
            { text: "Compliment them back, panicking", type: "creative" },
        ],
    },
    {
        question: "Your ideal comfort food right now?",
        options: [
            { text: "Something warm and soupy", type: "chill" },
            { text: "Snacks. Many, varied snacks.", type: "creative" },
            { text: "Home-cooked meal", type: "reflective" },
            { text: "Coffee counts as food", type: "productive" },
        ],
    },
];

const quizResults = {
    chill: {
        title: "The Quiet Storm",
        desc: "You process things slowly, deeply, and on your own terms. People underestimate how much happens beneath your surface.",
    },
    reflective: {
        title: "The Observer",
        desc: "You notice everything and say little. That\u2019s not weakness \u2014 that\u2019s wisdom still forming.",
    },
    productive: {
        title: "The Rebuilder",
        desc: "You heal by doing. By fixing. By creating order where chaos lived. That\u2019s your quiet superpower.",
    },
    creative: {
        title: "The Unscripted",
        desc: "You don\u2019t follow the expected emotional timeline. Good. The best things rarely do.",
    },
};

export default function BrainBreakPage() {
    const [activeTab, setActiveTab] = useState(null);

    return (
        <PageWrapper>
            <div style={{ paddingTop: "1rem" }}>
                <motion.h1
                    className="page-title"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Pause. Not Everything Needs Solving.
                </motion.h1>

                <motion.div
                    className="page-intro"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                >
                    <p style={{ marginBottom: "0.5rem" }}>
                        You&apos;re allowed to step out of your thoughts for a minute.
                    </p>
                    <p>The world will still be here.</p>
                </motion.div>

                {/* Activity cards */}
                <motion.div
                    style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                >
                    <button
                        className={`soft-card ${activeTab === "tap" ? "selected" : ""}`}
                        onClick={() => setActiveTab(activeTab === "tap" ? null : "tap")}
                        style={{
                            cursor: "pointer",
                            textAlign: "left",
                            border:
                                activeTab === "tap"
                                    ? "1px solid var(--dusty-rose)"
                                    : undefined,
                        }}
                    >
                        <span style={{ fontSize: "1.25rem", marginRight: "0.5rem" }}>⏱</span>
                        <span style={{ fontWeight: 500 }}>30-Second Tap Game</span>
                    </button>

                    <button
                        className={`soft-card ${activeTab === "wholesome" ? "selected" : ""}`}
                        onClick={() =>
                            setActiveTab(activeTab === "wholesome" ? null : "wholesome")
                        }
                        style={{
                            cursor: "pointer",
                            textAlign: "left",
                            border:
                                activeTab === "wholesome"
                                    ? "1px solid var(--dusty-rose)"
                                    : undefined,
                        }}
                    >
                        <span style={{ fontSize: "1.25rem", marginRight: "0.5rem" }}>✨</span>
                        <span style={{ fontWeight: 500 }}>Wholesome Message</span>
                    </button>

                    <button
                        className={`soft-card ${activeTab === "quiz" ? "selected" : ""}`}
                        onClick={() => setActiveTab(activeTab === "quiz" ? null : "quiz")}
                        style={{
                            cursor: "pointer",
                            textAlign: "left",
                            border:
                                activeTab === "quiz"
                                    ? "1px solid var(--dusty-rose)"
                                    : undefined,
                        }}
                    >
                        <span style={{ fontSize: "1.25rem", marginRight: "0.5rem" }}>🧩</span>
                        <span style={{ fontWeight: 500 }}>Mini Personality Quiz</span>
                    </button>
                </motion.div>

                {/* Activity content */}
                <AnimatePresence mode="wait">
                    {activeTab === "tap" && <TapGame key="tap" />}
                    {activeTab === "wholesome" && <WholesomeGenerator key="wholesome" />}
                    {activeTab === "quiz" && <PersonalityQuiz key="quiz" />}
                </AnimatePresence>
            </div>
        </PageWrapper>
    );
}

/* ─── Tap Game ───────────────────────────────────────────── */
function TapGame() {
    const [gameState, setGameState] = useState("idle"); // idle | playing | done
    const [taps, setTaps] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const intervalRef = useRef(null);

    const endGame = useCallback(() => {
        setGameState("done");
        if (intervalRef.current) clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        if (gameState === "playing") {
            intervalRef.current = setInterval(() => {
                setTimeLeft((t) => {
                    if (t <= 1) {
                        endGame();
                        return 0;
                    }
                    return t - 1;
                });
            }, 1000);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [gameState, endGame]);

    function startGame() {
        setTaps(0);
        setTimeLeft(30);
        setGameState("playing");
    }

    return (
        <motion.div
            className="soft-card"
            style={{ marginTop: "1.25rem", textAlign: "center" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
        >
            {gameState === "idle" && (
                <>
                    <p style={{ marginBottom: "1rem", fontSize: "0.9rem", color: "rgba(46,46,46,0.6)" }}>
                        Tap the circle as many times as you can in 30 seconds.
                    </p>
                    <button className="btn-primary" onClick={startGame}>
                        Start
                    </button>
                </>
            )}

            {gameState === "playing" && (
                <>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "1.25rem",
                            fontSize: "0.85rem",
                            color: "rgba(46,46,46,0.5)",
                        }}
                    >
                        <span>{timeLeft}s left</span>
                        <span>{taps} taps</span>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "1rem",
                        }}
                    >
                        <div
                            className="tap-target"
                            onClick={() => setTaps((t) => t + 1)}
                            role="button"
                            tabIndex={0}
                            aria-label="Tap target"
                        />
                    </div>
                </>
            )}

            {gameState === "done" && (
                <>
                    <p
                        style={{
                            fontSize: "2rem",
                            fontWeight: 600,
                            fontFamily: "'Poppins', sans-serif",
                            color: "var(--dusty-rose)",
                            marginBottom: "0.5rem",
                        }}
                    >
                        {taps}
                    </p>
                    <p
                        style={{
                            fontSize: "0.85rem",
                            color: "rgba(46,46,46,0.6)",
                            marginBottom: "1rem",
                        }}
                    >
                        taps in 30 seconds. Not bad.
                    </p>
                    <button className="btn-secondary" onClick={startGame}>
                        Try Again
                    </button>
                </>
            )}
        </motion.div>
    );
}

/* ─── Wholesome Message Generator ────────────────────────── */
function WholesomeGenerator() {
    const [msg, setMsg] = useState(
        wholesomeMessages[Math.floor(Math.random() * wholesomeMessages.length)]
    );
    const [key, setKey] = useState(0);

    function generate() {
        let next;
        do {
            next =
                wholesomeMessages[
                Math.floor(Math.random() * wholesomeMessages.length)
                ];
        } while (next === msg && wholesomeMessages.length > 1);
        setMsg(next);
        setKey((k) => k + 1);
    }

    return (
        <motion.div
            className="soft-card"
            style={{ marginTop: "1.25rem", textAlign: "center" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
        >
            <AnimatePresence mode="wait">
                <motion.p
                    key={key}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        fontSize: "1rem",
                        lineHeight: 1.7,
                        marginBottom: "1.25rem",
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 500,
                    }}
                >
                    &ldquo;{msg}&rdquo;
                </motion.p>
            </AnimatePresence>
            <button className="btn-secondary" onClick={generate}>
                Another One
            </button>
        </motion.div>
    );
}

/* ─── Mini Personality Quiz ──────────────────────────────── */
function PersonalityQuiz() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState(null);

    function answer(type) {
        const newAnswers = [...answers, type];
        if (step < quizQuestions.length - 1) {
            setAnswers(newAnswers);
            setStep(step + 1);
        } else {
            // Tally
            const counts = {};
            newAnswers.forEach((a) => {
                counts[a] = (counts[a] || 0) + 1;
            });
            const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
            setResult(quizResults[winner]);
        }
    }

    function restart() {
        setStep(0);
        setAnswers([]);
        setResult(null);
    }

    return (
        <motion.div
            className="soft-card"
            style={{ marginTop: "1.25rem" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
        >
            <AnimatePresence mode="wait">
                {!result ? (
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p
                            style={{
                                fontSize: "0.75rem",
                                color: "rgba(46,46,46,0.4)",
                                marginBottom: "0.75rem",
                            }}
                        >
                            {step + 1} / {quizQuestions.length}
                        </p>
                        <p
                            style={{
                                fontSize: "0.95rem",
                                fontWeight: 500,
                                marginBottom: "1rem",
                                lineHeight: 1.5,
                            }}
                        >
                            {quizQuestions[step].question}
                        </p>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                            }}
                        >
                            {quizQuestions[step].options.map((opt, i) => (
                                <button
                                    key={i}
                                    className="btn-secondary"
                                    style={{
                                        width: "100%",
                                        textAlign: "left",
                                        justifyContent: "flex-start",
                                        padding: "0.75rem 1rem",
                                        fontSize: "0.88rem",
                                    }}
                                    onClick={() => answer(opt.type)}
                                >
                                    {opt.text}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        style={{ textAlign: "center" }}
                    >
                        <p
                            style={{
                                fontSize: "0.75rem",
                                color: "rgba(46,46,46,0.4)",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                marginBottom: "0.5rem",
                            }}
                        >
                            You are
                        </p>
                        <p
                            style={{
                                fontSize: "1.25rem",
                                fontWeight: 600,
                                fontFamily: "'Poppins', sans-serif",
                                color: "var(--dusty-rose)",
                                marginBottom: "0.75rem",
                            }}
                        >
                            {result.title}
                        </p>
                        <p
                            style={{
                                fontSize: "0.9rem",
                                lineHeight: 1.7,
                                color: "rgba(46,46,46,0.7)",
                                marginBottom: "1.25rem",
                            }}
                        >
                            {result.desc}
                        </p>
                        <button className="btn-secondary" onClick={restart}>
                            Take Again
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
