"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import AnimatedWords from "./AnimatedWords";
import { A } from "@/lib/assets";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full text-white flex flex-col justify-between p-6 md:p-12 overflow-hidden bg-[#141413]">
      <video
        src={A.heroVideo}
        poster={A.heroPoster}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* Spacer under the global fixed navbar */}
      <div className="h-[64px]" aria-hidden="true" />

      <div className="w-full max-w-[800px] mx-auto flex flex-col justify-center items-center gap-6 md:gap-8 text-center my-auto z-10 px-4">
        <h1 className="font-display text-white text-[40px] sm:text-[52px] md:text-[64px] font-normal leading-[1.1] md:leading-[1.02]">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="block"
          >
            Meet Riveted.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="block"
          >
            <em className="font-serif italic font-normal">
              Build what&rsquo;s next
            </em>{" "}
            with
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="block"
          >
            AI-first engineering
          </motion.span>
        </h1>
        <motion.a
          href="mailto:hello@rivetedinc.com"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="h-12 md:h-14 px-6 md:px-8 py-3 bg-white rounded-2xl inline-flex justify-center items-center text-black text-lg md:text-xl font-medium hover:bg-neutral-200 transition-colors shadow-lg mt-2 md:mt-0"
        >
          Start your project
        </motion.a>
      </div>

      <footer className="w-full max-w-[1360px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 z-10">
        <p className="w-full md:w-[480px] max-w-prose text-white/80 text-xl leading-[1.25] text-left">
          <AnimatedWords
            baseDelay={1.2}
            text="We provide fractional CTO leadership for small businesses and partner with founders to ship production-grade products — engineering rigor and business sense in everything we do."
          />
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-row flex-wrap lg:flex-col items-center lg:items-end gap-2.5 w-full md:w-auto justify-end"
        >
          <div className="h-[56px] px-5 rounded-2xl border border-white/40 text-white text-xl whitespace-nowrap flex items-center justify-center">
            Fractional CTO leadership
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[56px] h-[56px] rounded-2xl border border-white/40 flex items-center justify-center shrink-0">
              <ArrowUpRight className="w-6 h-6 text-white" />
            </div>
            <div className="h-[56px] px-5 rounded-2xl border border-white/40 text-white text-xl whitespace-nowrap flex items-center justify-center">
              Consulting &amp; Coaching
            </div>
          </div>
        </motion.div>
      </footer>
    </section>
  );
}
