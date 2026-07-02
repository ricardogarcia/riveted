"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import AnimatedWords from "./AnimatedWords";
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

function ChatSkeletonRows() {
  return (
    <div className="flex items-start">
      <div className="w-10 h-10 rounded-xl bg-[#FFFFFF54] shrink-0" />
      <div className="ml-[12px] flex-1 flex flex-col gap-[9px] pr-[22px]">
        <div className="h-[6px] w-[31px] bg-[#FFFFFF3D] rounded-full mt-[17px]" />
        <div className="h-[6px] w-[85%] bg-[#FFFFFF3D] rounded-full" />
        <div className="h-[6px] w-[55%] bg-[#FFFFFF3D] rounded-full" />
      </div>
    </div>
  );
}

function ChatCard() {
  const [filled, setFilled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  useEffect(() => {
    const t = setTimeout(() => setFilled(true), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex-1 h-[585px] rounded-3xl overflow-hidden bg-[#141413] flex flex-col pt-10 pb-10 justify-between"
    >
      <div className="flex-1 flex flex-col justify-center gap-[10px] mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-[58px] h-[108px] rounded-2xl bg-[#FAFAFA14] flex items-start pt-[22px] pl-[22px] relative"
        >
          <ChatSkeletonRows />
        </motion.div>

        <motion.div
          layout
          animate={{ backgroundColor: filled ? "#9E948B" : "#FAFAFA14" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-[45px] h-[135px] rounded-3xl p-[22px] overflow-hidden relative"
        >
          <AnimatePresence mode="wait">
            {filled ? (
              <motion.div
                key="filled"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <div className="flex items-center gap-[12px] h-[44px]">
                  <div className="w-10 h-10 rounded-full bg-[#141413] text-white flex items-center justify-center text-base font-medium shrink-0">
                    M
                  </div>
                  <span className="text-white text-base leading-none">Me</span>
                </div>
                <p className="text-white text-[15px] leading-snug mt-[-9px] ml-[56px]">
                  My website isn&apos;t bringing in leads — can Riveted help?
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChatSkeletonRows />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="flex justify-between items-end pl-[32px] pr-[32px]">
        <div className="w-64 text-white text-4xl leading-10">
          <AnimatedWords
            active={isInView}
            baseDelay={0.5}
            step={0.1}
            duration={0.5}
            y={10}
            text="Engage and delight customers"
          />
        </div>
        <div className="flex items-center shrink-0">
          <div className="w-10 h-10 rounded-full border-2 border-[#141413] bg-[#5F5D4D] text-white flex items-center justify-center text-xl z-30">
            01
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-[#141413] bg-[#252522] text-white/40 flex items-center justify-center text-xl -ml-3 z-20">
            2
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-[#141413] bg-[#252522] text-white/40 flex items-center justify-center text-xl -ml-3 z-10">
            3
          </div>
        </div>
      </div>
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
          <CardReveal index={1}>
            <ChatCard />
          </CardReveal>
        </div>
      </div>
    </section>
  );
}
