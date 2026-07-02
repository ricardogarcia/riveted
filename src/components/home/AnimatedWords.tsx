"use client";

import { motion } from "framer-motion";

interface AnimatedWordsProps {
  text: string;
  baseDelay?: number;
  step?: number;
  duration?: number;
  y?: number;
  active?: boolean;
  className?: string;
}

export default function AnimatedWords({
  text,
  baseDelay = 0,
  step = 0.045,
  duration = 0.5,
  y = 10,
  active = true,
  className,
}: AnimatedWordsProps) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y }}
          transition={{ delay: baseDelay + i * step, duration, ease: "easeOut" }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
