"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";
import { A } from "@/lib/assets";

const ITEMS = [
  "SEO-optimized design",
  "24/7 AI lead capture",
  "Smart forms & follow-ups",
  "Conversion-focused copy",
  "Fast AI-powered delivery",
  "Ongoing growth support",
  "Analytics that matter",
];

const PILL_ROW_HEIGHT = 56;
const PILL_GAP = 18;
const ACTIVE_HEIGHT = 80;
const ACTIVE_GAP = 22;

function Pill({ label, isActive }: { label: string; isActive: boolean }) {
  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className={
        isActive
          ? "w-[calc(100%_-_60px)] mx-[30px] h-[80px] p-[8.5px] bg-white/25 backdrop-blur-xl shadow-xl rounded-full flex items-center gap-[8.5px]"
          : "w-[261px] h-[56px] px-3 bg-white/15 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-[8.5px]"
      }
    >
      <div
        className={`rounded-full bg-white/30 flex items-center justify-center shrink-0 ${
          isActive ? "w-[63px] h-[63px]" : "w-[44px] h-[44px]"
        }`}
      >
        {isActive ? (
          <motion.div
            layoutId={`icon-${label}`}
            className="flex items-center justify-center"
          >
            <Sparkles className="w-7 h-7 text-white" />
          </motion.div>
        ) : (
          <div className="w-full h-full rounded-full bg-white/10" />
        )}
      </div>
      <div className="relative flex-1 h-[44px] text-left ml-1">
        <motion.div
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex flex-col justify-center"
        >
          <div className="text-white text-lg font-medium leading-tight">
            {label}
          </div>
          <div className="text-white/70 text-[11px] tracking-[0.15em]">
            RIVETED BUILD
          </div>
        </motion.div>
        <motion.div
          animate={{ opacity: isActive ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex flex-col justify-center gap-1.5"
        >
          <div className="h-2 w-[140px] bg-white/50 rounded-full" />
          <div className="h-2 w-[70px] bg-white/35 rounded-full" />
        </motion.div>
      </div>
    </motion.div>
  );
}

function StyleCarouselCard() {
  const [active, setActive] = useState(2);

  useEffect(() => {
    const id = setInterval(
      () => setActive((a) => (a + 1) % ITEMS.length),
      2800
    );
    return () => clearInterval(id);
  }, []);

  const len = ITEMS.length;
  const half = Math.floor(len / 2);

  return (
    <div className="relative flex-1 h-[585px] rounded-3xl overflow-hidden bg-stone-300">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${A.cardBackground})` }}
      />
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full" style={{ height: ACTIVE_HEIGHT }}>
          {ITEMS.map((label, i) => {
            const diff = ((i - active + len + half) % len) - half;
            const isActive = diff === 0;
            const visible = Math.abs(diff) <= 2;
            const y =
              diff === 0
                ? 0
                : diff < 0
                  ? diff * (PILL_ROW_HEIGHT + PILL_GAP) - ACTIVE_GAP
                  : diff * (PILL_ROW_HEIGHT + PILL_GAP) + ACTIVE_GAP;
            const opacity = !visible ? 0 : Math.abs(diff) === 2 ? 0.55 : 1;
            return (
              <motion.div
                key={label}
                animate={{ y, opacity }}
                transition={{
                  y: { type: "spring", stiffness: 260, damping: 28 },
                  opacity: { ease: "easeInOut", duration: 0.4 },
                }}
                className="absolute left-0 right-0 flex justify-center pointer-events-none"
              >
                <Pill label={label} isActive={isActive} />
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  );
}

function CardReveal({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  return (
    <motion.div
      ref={ref}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ delay: index * 0.35, duration: 1.1, ease: "easeOut" }}
      className="flex flex-1"
    >
      {children}
    </motion.div>
  );
}

export default function CraftExperiences() {
  return (
    <section id="services" className="bg-white">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 pt-16 pb-20">
        <h2 className="font-display text-center text-5xl md:text-6xl font-normal leading-[1.1] mb-12 text-neutral-900">
          <em className="font-serif italic">Craft experiences</em> your
          <br />
          customers will remember
        </h2>
        <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6">
          <CardReveal index={0}>
            <StyleCarouselCard />
          </CardReveal>
        </div>
      </div>
    </section>
  );
}
