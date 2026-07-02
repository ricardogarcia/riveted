"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function ContactCta() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <section id="contact" className="bg-white px-6 md:px-12 pb-20">
      <motion.div
        ref={ref}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-[1360px] mx-auto bg-[#141413] rounded-3xl px-8 py-16 md:px-16 md:py-24 text-center"
      >
        <h2 className="font-display text-white text-4xl md:text-6xl font-normal leading-[1.1] mb-6">
          Ready to be <em className="font-serif italic">riveted?</em>
        </h2>
        <p className="text-white/60 text-lg md:text-xl max-w-[520px] mx-auto mb-10 leading-relaxed">
          Whether you need a website that generates leads or a partner to build
          your AI product — let&apos;s talk. Free consultation, no obligations.
        </p>
        <a
          href="mailto:hello@rivetedinc.com"
          className="h-12 md:h-14 px-6 md:px-8 bg-white rounded-2xl inline-flex justify-center items-center text-black text-lg md:text-xl font-medium hover:bg-neutral-200 transition-colors"
        >
          hello@rivetedinc.com
        </a>
      </motion.div>
    </section>
  );
}
