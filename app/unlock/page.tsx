"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Lock, PartyPopper } from "lucide-react";
import { PageWrapper } from "@/components/layout";
import { useProgressStore } from "@/store/progressStore";
import { unlockData } from "@/data/unlock";

export default function UnlockPage() {
  const router = useRouter();
  const { completePuzzle, completedPuzzles, unlocked, setUnlocked } =
    useProgressStore();

  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isReadonly, setIsReadonly] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (completedPuzzles.unlock || unlocked) {
      setIsReadonly(true);
      setIsSuccess(true);
    }
  }, [completedPuzzles.unlock, unlocked]);

  useEffect(() => {
    if (!unlocked && !completedPuzzles.sudoku) {
      router.push("/sudoku");
    }
  }, [unlocked, completedPuzzles.sudoku, router]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (isReadonly || isSuccess) return;

    const digit = value.replace(/[^0-9]/g, "").slice(-1);

    if (digit || value === "") {
      const newDigits = [...digits];
      newDigits[index] = digit;
      setDigits(newDigits);
      setIsIncorrect(false);

      if (digit && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      if (newDigits.every((d) => d !== "")) {
        const enteredCode = newDigits.join("");
        if (enteredCode === unlockData.code) {
          setIsSuccess(true);
          setUnlocked(true);
          completePuzzle("unlock");

          setTimeout(() => {
            router.push("/gift");
          }, 2000);
        } else {
          setIsIncorrect(true);
          setTimeout(() => {
            setDigits(Array(6).fill(""));
            inputRefs.current[0]?.focus();
          }, 500);
        }
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (isReadonly || isSuccess) return;

    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (isReadonly || isSuccess) return;

    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6);

    if (pastedData) {
      const newDigits = [...digits];
      pastedData.split("").forEach((digit, i) => {
        if (i < 6) newDigits[i] = digit;
      });
      setDigits(newDigits);
      setIsIncorrect(false);

      if (newDigits.every((d) => d !== "")) {
        const enteredCode = newDigits.join("");
        if (enteredCode === unlockData.code) {
          setIsSuccess(true);
          setUnlocked(true);
          completePuzzle("unlock");

          setTimeout(() => {
            router.push("/gift");
          }, 2000);
        } else {
          setIsIncorrect(true);
          setTimeout(() => {
            setDigits(Array(6).fill(""));
            inputRefs.current[0]?.focus();
          }, 500);
        }
      }

      const nextEmptyIndex = newDigits.findIndex((d) => d === "");
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[5]?.focus();
      }
    }
  };

  return (
    <PageWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md mx-auto"
        >
          <div className="glass rounded-2xl p-8 md:p-10 shadow-lg border border-border/50">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center mx-auto mb-6"
            >
              <Lock className="w-10 h-10 md:w-12 md:h-12 text-primary-foreground" />
            </motion.div>

            <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
              One Final Step
            </h1>

            <p className="text-muted-foreground text-center mb-8">
              Enter the special date
            </p>

            <motion.div
              animate={isIncorrect ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="flex justify-center gap-2 md:gap-3 mb-6"
            >
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  disabled={isReadonly || isSuccess}
                  className={`
                    w-12 h-14 md:w-14 md:h-16 rounded-lg text-center text-2xl md:text-3xl
                    font-bold border-2 transition-all outline-none
                    ${
                      isSuccess
                        ? "bg-green-500 border-success-500 text-success-700"
                        : isIncorrect
                        ? "bg-red-500 border-destructive-500 text-destructive-700"
                        : digit
                        ? "bg-accent/20 border-primary-500 text-primary-700"
                        : "bg-card border-border focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                    }
                    ${isReadonly || isSuccess ? "cursor-default" : "cursor-pointer"}
                  `}
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </motion.div>

            <AnimatePresence>
              {isIncorrect && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-destructive text-center text-sm"
                >
                  Not quite right. Try again.
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center mt-4"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                    className="inline-block"
                  >
                    <PartyPopper className="w-12 h-12 text-success-500 mx-auto mb-3" />
                  </motion.div>

                  <p className="text-success-600 dark:text-success-400 font-semibold">
                    Unlocked! Preparing your gift...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-center text-xs text-muted-foreground mt-6">
              Hint: Think of meaningful dates
            </p>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
