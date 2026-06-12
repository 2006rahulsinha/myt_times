"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { ProgressTracker } from "./ProgressTracker";

interface PageWrapperProps {
  children: ReactNode;
  hideProgress?: boolean;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: "easeIn" as const,
    },
  },
};

export function PageWrapper({ children, hideProgress = false }: PageWrapperProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex flex-col"
    >
      {!hideProgress && (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
          <ProgressTracker />
        </header>
      )}
      <main className="flex-1 flex flex-col">{children}</main>
    </motion.div>
  );
}
