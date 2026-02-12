"use client";

import { motion } from "framer-motion";

export default function PageWrapper({ children, className = "" }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`app-container ${className}`}
        >
            {children}
            <p className="page-footer">
                This space isn&apos;t trying to change you. Just to give you room.
            </p>
        </motion.div>
    );
}
