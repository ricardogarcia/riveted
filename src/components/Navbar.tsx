"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={isHome ? { y: "45vh", opacity: 0 } : { opacity: 0 }}
      animate={isHome ? { y: 0, opacity: 1 } : { opacity: 1 }}
      transition={{ duration: 1, ease: EASE }}
      className="fixed top-0 left-0 right-0 z-50 p-6 md:px-12 md:py-8 pointer-events-none"
    >
      <div className="w-full max-w-[1360px] mx-auto flex justify-between items-center relative pointer-events-auto">
        <Link
          href="/"
          className={`font-display text-3xl font-medium ${
            isHome ? "text-white" : "text-foreground"
          }`}
        >
          Riveted
        </Link>

        {/* Desktop pill nav */}
        <motion.nav
          layout
          initial={{ width: 110 }}
          animate={{ width: "auto" }}
          transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
          style={{ willChange: "width" }}
          className={`hidden lg:flex ${isHome ? "bg-black/40" : "bg-black/70"} backdrop-blur-lg rounded-3xl items-center overflow-hidden h-[64px] flex-row-reverse`}
        >
          <div className="p-1.5 shrink-0">
            <a
              href="mailto:hello@rivetedinc.com"
              className="h-12 px-6 rounded-full bg-white text-black text-xl font-medium flex items-center whitespace-nowrap hover:bg-neutral-100 transition-colors"
            >
              Book a Call
            </a>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="flex items-center gap-8 pl-8 pr-2 whitespace-nowrap"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white text-base opacity-90 hover:opacity-100 transition-opacity"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        </motion.nav>

        {/* Mobile toggle + dropdown */}
        <div className="lg:hidden relative">
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className={`w-12 h-12 rounded-full ${isHome ? "bg-black/40" : "bg-black/70"} backdrop-blur-lg flex items-center justify-center text-white`}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full right-0 mt-3 w-60 bg-black/70 backdrop-blur-lg rounded-2xl p-4 flex flex-col gap-3"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-white text-base opacity-90 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="mailto:hello@rivetedinc.com"
                  onClick={() => setMobileOpen(false)}
                  className="h-11 rounded-full bg-white text-black text-base font-medium flex items-center justify-center hover:bg-neutral-100 transition-colors"
                >
                  Book a Call
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
