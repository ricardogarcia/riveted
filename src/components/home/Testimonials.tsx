"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "framer-motion";
import AnimatedWords from "./AnimatedWords";
import { A } from "@/lib/assets";

interface Testimonial {
  headlinePlain: string;
  headlineItalic: string;
  tile: string;
  quote: string;
  attributionName: string;
  attributionRole: string;
  ctaHref: string;
  ctaExternal: boolean;
}

const TESTIMONIALS: Testimonial[] = [
  {
    headlinePlain: "Riveted",
    headlineItalic: "changed our website",
    tile: "Prima Pave",
    quote:
      "We went from a site that just existed to one that converts every day. Riveted understood exactly what our business needed — and delivered it fast.",
    attributionName: "Marco Marano,",
    attributionRole: "Founder, Prima Pave",
    ctaHref: "/blog",
    ctaExternal: false,
  },
  {
    headlinePlain: "Riveted",
    headlineItalic: "shipped our product",
    tile: "WeatherFreight",
    quote:
      "From concept to the Shopify App Store — an AI-powered app that monitors weather along shipping routes and protects temperature-sensitive freight, designed, built, and shipped to production.",
    attributionName: "WeatherFreight,",
    attributionRole: "weatherfreight.com · Shopify app built by Riveted",
    ctaHref: "https://weatherfreight.com",
    ctaExternal: true,
  },
  {
    headlinePlain: "Riveted",
    headlineItalic: "built our platform",
    tile: "Roster",
    quote:
      "A custom tool delivered end to end — Riveted designed and shipped a production-grade platform that streamlined how the Roster team runs their operations.",
    attributionName: "Roster,",
    attributionRole: "roster.co · Custom platform built by Riveted",
    ctaHref: "https://roster.co",
    ctaExternal: true,
  },
];

const ROTATE_MS = 6000;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const CTA_CLASSES =
  "inline-block bg-black text-white px-7 py-3 rounded-2xl text-xl font-medium hover:bg-neutral-800 transition-colors whitespace-nowrap";

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  // `active` in deps restarts the timer after a manual dot click too.
  useEffect(() => {
    if (!isInView || hovering) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % TESTIMONIALS.length),
      ROTATE_MS
    );
    return () => clearInterval(id);
  }, [isInView, hovering, active]);

  const t = TESTIMONIALS[active];

  return (
    <section id="work" className="bg-white">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-20">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.18 }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
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
                <h3 className="text-3xl text-black leading-tight max-w-[260px] min-h-[76px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={active}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="inline-block"
                    >
                      <span className="font-medium">{t.headlinePlain}</span>{" "}
                      <em className="font-serif italic">{t.headlineItalic}</em>
                    </motion.span>
                  </AnimatePresence>
                </h3>
                <div className="hidden lg:flex items-center gap-2">
                  {TESTIMONIALS.map((item, i) => (
                    <button
                      key={item.tile}
                      onClick={() => setActive(i)}
                      aria-label={`Show testimonial ${i + 1}: ${item.tile}`}
                      aria-current={i === active}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === active
                          ? "w-8 bg-black"
                          : "w-2 bg-stone-300 hover:bg-stone-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                className="self-start"
              >
                {t.ctaExternal ? (
                  <a
                    href={t.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={CTA_CLASSES}
                  >
                    Read More
                  </a>
                ) : (
                  <Link href={t.ctaHref} className={CTA_CLASSES}>
                    Read More
                  </Link>
                )}
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
                  alt="Riveted client work"
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
                <AnimatePresence mode="wait">
                  <motion.span
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-display text-3xl font-bold text-black"
                  >
                    {t.ctaExternal ? (
                      <a
                        href={t.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {t.tile}
                      </a>
                    ) : (
                      t.tile
                    )}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>

          {/* Right quote card */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-[748px] flex-1 p-10 rounded-2xl flex flex-col justify-between gap-10 bg-[#7D756E1C]"
          >
            <p className="text-3xl leading-10 text-black min-h-[200px]">
              <AnimatedWords
                key={active}
                active={isInView}
                baseDelay={0.2}
                step={0.04}
                duration={0.35}
                y={6}
                text={t.quote}
              />
            </p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-1"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-1"
                >
                  <span className="font-serif italic text-xl text-black">
                    {t.attributionName}
                  </span>
                  {t.ctaExternal ? (
                    <a
                      href={t.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl text-black/50 hover:text-black hover:underline transition-colors"
                    >
                      {t.attributionRole}
                    </a>
                  ) : (
                    <span className="text-xl text-black/50">
                      {t.attributionRole}
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
