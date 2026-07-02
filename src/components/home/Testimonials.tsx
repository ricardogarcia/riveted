"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import AnimatedWords from "./AnimatedWords";
import { A } from "@/lib/assets";

const QUOTE =
  "We went from a site that just existed to one that converts every day. Riveted understood exactly what our business needed — and delivered it fast.";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <section id="work" className="bg-white">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-20">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.18 }}
          className="flex flex-col lg:flex-row justify-between items-stretch gap-8 lg:gap-[25px]"
        >
          <div className="flex flex-col lg:flex-row gap-[25px] items-stretch">
            {/* Block A */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-row lg:flex-col justify-between lg:h-full lg:min-h-[447px] gap-4 lg:gap-8 items-center lg:items-start"
            >
              <div className="flex flex-col gap-6 flex-1 lg:flex-none">
                <h3 className="text-3xl text-black leading-tight max-w-[260px]">
                  <span className="font-medium">Riveted</span>{" "}
                  <em className="font-serif italic">changed our website</em>
                </h3>
                <div className="hidden lg:flex items-center gap-2">
                  <div className="w-8 h-2 bg-black rounded-full" />
                  <div className="w-2 h-2 bg-stone-300 rounded-full" />
                  <div className="w-2 h-2 bg-stone-300 rounded-full" />
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                className="self-start"
              >
                <Link
                  href="/blog"
                  className="inline-block bg-black text-white px-7 py-3 rounded-2xl text-xl font-medium hover:bg-neutral-800 transition-colors whitespace-nowrap"
                >
                  Read More
                </Link>
              </motion.div>
            </motion.div>

            {/* Block B */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-3 w-full lg:w-[282px]"
            >
              <div className="w-full h-[280px] lg:h-[351px] rounded-2xl overflow-hidden relative">
                <Image
                  src={A.testimonialImage}
                  alt="The Prima Pave team collaborating"
                  fill
                  sizes="(min-width: 1024px) 282px, 100vw"
                  className="object-cover"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.55, ease: "easeOut" }}
                className="w-full h-24 rounded-2xl flex items-center justify-center gap-3 bg-[#F1F0EF]"
              >
                <span className="font-display text-3xl font-bold text-black">
                  Prima Pave
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Right quote card */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-[748px] flex-1 p-10 rounded-2xl flex flex-col justify-between gap-10 bg-[#7D756E1C]"
          >
            <p className="text-3xl leading-10 text-black">
              <AnimatedWords
                active={isInView}
                baseDelay={0.4}
                step={0.04}
                duration={0.35}
                y={6}
                text={QUOTE}
              />
            </p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-1"
            >
              <span className="font-serif italic text-xl text-black">
                Marco Marano,
              </span>
              <span className="text-xl text-black/50">Founder, Prima Pave</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
