"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Heart, PartyPopper, Sparkles } from "lucide-react";
import { giftMessageData } from "@/data/gift-message";
import { useProgressStore } from "@/store/progressStore";
import Image from "next/image";
const hearts = Array.from({ length: 20 });
interface Confetti {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
}

const generateConfetti = (): Confetti[] => {
  const colors = [
    "bg-accent-400",
    "bg-success-400",
    "bg-primary-400",
    "bg-warning-400",
  ];
  const confetti: Confetti[] = [];

  for (let i = 0; i < 50; i++) {
    confetti.push({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 1,
      size: Math.random() * 8 + 4,
    });
  }

  return confetti;
};

export default function GiftPage() {
  const router = useRouter();
  const { unlocked, completedPuzzles, isUnlocked } = useProgressStore();
  const [hasAccess, setHasAccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  useEffect(() => {
    if (unlocked || completedPuzzles.unlock) {
      setHasAccess(true);
      setTimeout(() => {
        setShowConfetti(true);
        setConfetti(generateConfetti());
      }, 300);
    } else if (!isUnlocked("unlock")) {
      router.push("/unlock");
    } else {
      setHasAccess(true);
      setTimeout(() => {
        setShowConfetti(true);
        setConfetti(generateConfetti());
      }, 300);
    }
  }, [unlocked, completedPuzzles.unlock, isUnlocked, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50/30 to-accent-50/30 dark:from-background dark:via-primary-950/20 dark:to-accent-950/20">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {confetti.map((piece) => (
            <motion.div
              key={piece.id}
              className={`absolute ${piece.color} rounded-full`}
              style={{
                left: `${piece.x}%`,
                width: piece.size,
                height: piece.size,
              }}
              initial={{ top: "-10%", opacity: 1, rotate: 0 }}
              animate={{
                top: "110%",
                opacity: [1, 1, 0],
                rotate: Math.random() * 360 * 5,
                x: [0, Math.random() * 100 - 50, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: piece.delay,
                ease: "easeIn",
              }}
            />
          ))}
        </div>
      )}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {hearts.map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: `${Math.random() * 100}vw`,
              y: "110vh",
              opacity: 0,
              scale: Math.random() * 0.8 + 0.4,
            }}
            animate={{
              y: "-10vh",
              opacity: [0, 0.7, 0.7, 0],
              rotate: [0, 20, -20, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          >
            <Heart
              className="fill-pink-300 text-pink-300"
              size={Math.random() * 24 + 12}
            />
          </motion.div>
        ))}
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 md:py-16 bg-[#550000]">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-black-400/10 blur-3xl rounded-full" />

          <div className="absolute -bottom-0 -right-0 w-96 h-96 bg-red-300/10 blur-3xl rounded-full" />

        <div className="w-full max-w-2xl mx-auto">
          <AnimatePresence>
            {hasAccess && (
              <>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
                  className="glass rounded-3xl p-8 md:p-12 shadow-2xl border border-accent-200/50"
                >
                  {giftMessageData.optionalImage && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="mb-8 rounded-2xl overflow-hidden shadow-lg"
                    >
                      <Image
                        src={giftMessageData.optionalImage}
                        alt="Special gift"
                        className="w-full h-48 md:h-64 object-cover"
                        width={1200}
                        height={800}
                      />
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="text-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                      className="inline-block mb-4"
                    >
                      <Heart className="w-14 h-14 text-destructive-400 fill-red-500" />
                    </motion.div>

                    <h1
                      className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 bg-clip-text text-secondary-foreground"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {giftMessageData.title}
                    </h1>

                    <h2 className="text-xl md:text-2xl font-semibold text-primary-600 dark:text-primary-400 mb-6">
                      {giftMessageData.subtitle}
                    </h2>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="prose prose-lg max-w-none"
                  >
                    {giftMessageData.mainMessage
                      .split("\n\n")
                      .map((paragraph, index) => (
                        <motion.p
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 + index * 0.15, duration: 0.4 }}
                          className="text-base md:text-lg text-foreground/90 leading-relaxed text-center whitespace-pre-line"
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                    className="mt-8 pt-8 border-t border-border text-center"
                  >
                    <p className="text-lg md:text-xl font-semibold text-primary-600 dark:text-primary-400 italic">
                      {giftMessageData.signature}
                    </p>

                    {giftMessageData.optionalFooter && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.6, duration: 0.4 }}
                        className="text-sm text-muted-foreground mt-4"
                      >
                        {giftMessageData.optionalFooter}
                      </motion.p>
                    )}
                  </motion.div>
                </motion.div>

              </>
            )}
          </AnimatePresence>

          {!hasAccess && (
            <div className="text-center">
              <div className="animate-pulse">Loading your special gift...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
