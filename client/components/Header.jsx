import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";

import Socials from "../components/Socials";

// Entry stagger animations
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -25, rotateX: -45 },
  show: { 
    opacity: 1, 
    y: 0,
    rotateX: 0,
    transition: { type: "spring", stiffness: 80, damping: 12 }
  },
};

// Dropdown animation — slides down smoothly
const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 22 },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.96,
    transition: { duration: 0.14 },
  },
};

const Header = () => {
  const headerRef = useRef(null);
  const [socialsOpen, setSocialsOpen] = useState(false);

  // --- Real-time 3D Mouse Movement Variables ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [20, -20]);
  const rotateY = useTransform(mouseX, [-300, 300], [-20, 20]);
  const shiftX  = useTransform(mouseX, [-300, 300], [-12, 12]);
  const shiftY  = useTransform(mouseY, [-300, 300], [-12, 12]);
  const shadowX = useTransform(mouseX, [-300, 300], [15, -15]);
  const shadowY = useTransform(mouseY, [-300, 300], [25, -5]);

  const springConfig   = { damping: 20, stiffness: 100, mass: 0.5 };
  const smoothRotateX  = useSpring(rotateX,  springConfig);
  const smoothRotateY  = useSpring(rotateY,  springConfig);
  const smoothShiftX   = useSpring(shiftX,   springConfig);
  const smoothShiftY   = useSpring(shiftY,   springConfig);
  const smoothShadowX  = useSpring(shadowX,  springConfig);
  const smoothShadowY  = useSpring(shadowY,  springConfig);

  const handleMouseMove = (e) => {
    if (!headerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = headerRef.current.getBoundingClientRect();
    mouseX.set(clientX - (left + width  / 2));
    mouseY.set(clientY - (top  + height / 2));
  };

  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  // Shared 3D motion style applied to both logo + socials wrappers
  const motionStyle3D = {
    rotateX: smoothRotateX,
    rotateY: smoothRotateY,
    x: smoothShiftX,
    y: smoothShiftY,
    transformStyle: "preserve-3d",
  };

  // Shared extruded pill shadow
  const pillShadow = {
    translateZ: 40,
    boxShadow: `
      0 1px 0 #111, 
      0 2px 0 #1b1b1b, 
      0 3px 0 #252525, 
      0 12px 25px rgba(0, 0, 0, 0.6)
    `,
  };

  return (
    <motion.header 
      ref={headerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="absolute z-50 w-full items-center min-h-[56px] sm:min-h-[70px] xl:h-[90px]"
      style={{ perspective: 1000 }}
    >
      <div className="container mx-auto px-3 sm:px-8 md:px-12 xl:px-16">
        <div className="flex flex-row justify-between items-center gap-x-2 py-3 sm:py-5 md:py-6 xl:py-8">

          {/* ══════════════════════════════
              3D LOGO — scales with breakpoint
              xs  : 80px   (very small phones)
              sm  : 130px  (phablets / small tablets)
              md  : 160px
              xl  : 190px
          ══════════════════════════════ */}
          <motion.div
            variants={itemVariants}
            style={motionStyle3D}
            whileHover={{ scale: 1.03, translateZ: 20 }}
            whileTap={{ scale: 0.97, translateZ: -10 }}
            className="will-change-transform cursor-pointer relative group flex-shrink-0"
          >
            <Link href="/" className="block" style={{ transformStyle: "preserve-3d" }}>
              <div
                className="relative bg-gradient-to-b from-white/[0.07] to-white/[0.01]
                           border border-white/10
                           px-2 py-1.5
                           sm:px-4 sm:py-2
                           md:px-5 md:py-2.5
                           xl:px-6 xl:py-3
                           rounded-xl sm:rounded-2xl backdrop-blur-md
                           transition-all duration-300 group-hover:border-accent/40"
                style={{
                  transformStyle: "preserve-3d",
                  translateZ: 30,
                  boxShadow: `
                    0 1px 0 #111, 
                    0 2px 0 #151515, 
                    0 3px 0 #222, 
                    0 4px 0 #2a2a2a, 
                    0 5px 0 #333, 
                    0 15px 30px rgba(0, 0, 0, 0.7)
                  `,
                }}
              >
                {/* Dynamic Ambient Underglow */}
                <div className="absolute inset-0 bg-accent/20 rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <Image
                  src="/logo.svg"
                  alt="logo"
                  width={190}
                  height={42}
                  sizes="(max-width: 360px) 80px, (max-width: 480px) 100px, (max-width: 640px) 130px, (max-width: 768px) 160px, 190px"
                  priority
                  className="btn-animate relative z-10 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]
                             w-[80px] min-[380px]:w-[100px] sm:w-[130px] md:w-[160px] xl:w-[190px] h-auto"
                />
              </div>
            </Link>
          </motion.div>

          {/* ══════════════════════════════
              SOCIALS
              sm+ : always-visible pill (row)
              <sm : hidden behind toggle → dropdown in COLUMN
          ══════════════════════════════ */}
          <motion.div
            variants={itemVariants}
            style={motionStyle3D}
            className="will-change-transform flex items-center justify-end"
          >

            {/* ── Desktop / Tablet pill ── */}
            <motion.div
              style={pillShadow}
              className="hidden sm:block bg-black/40 border border-white/5
                         px-5 py-2 md:px-6 md:py-3
                         rounded-full backdrop-blur-md relative group
                         hover:border-accent/30 transition-colors duration-300"
            >
              <Socials />
            </motion.div>

            {/* ── Mobile toggle + column dropdown ── */}
            <div className="relative sm:hidden">

              {/* Toggle button */}
              <motion.button
                onClick={() => setSocialsOpen((prev) => !prev)}
                whileTap={{ scale: 0.92 }}
                style={{
                  translateZ: 40,
                  boxShadow: `0 1px 0 #111, 0 2px 0 #1b1b1b, 0 3px 0 #252525, 0 10px 20px rgba(0,0,0,0.6)`,
                }}
                className="flex items-center gap-1.5 bg-black/40 border border-white/10
                           px-2.5 py-1.5 rounded-full backdrop-blur-md
                           hover:border-accent/30 transition-colors duration-300
                           focus:outline-none"
                aria-label="Toggle social links"
              >
                {/* Animated bars → X */}
                <div className="flex flex-col justify-center items-end w-4 gap-[4px]">
                  <motion.span
                    animate={socialsOpen
                      ? { rotate: 45, y: 5.5, width: "16px" }
                      : { rotate: 0,  y: 0,   width: "16px" }}
                    transition={{ duration: 0.2 }}
                    className="block h-[1.5px] bg-white/80 rounded-full origin-center"
                    style={{ width: "16px" }}
                  />
                  <motion.span
                    animate={socialsOpen
                      ? { opacity: 0, scaleX: 0 }
                      : { opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.16 }}
                    className="block h-[1.5px] bg-white/60 rounded-full"
                    style={{ width: "11px" }}
                  />
                  <motion.span
                    animate={socialsOpen
                      ? { rotate: -45, y: -6, width: "16px" }
                      : { rotate: 0,   y: 0,  width: "16px" }}
                    transition={{ duration: 0.2 }}
                    className="block h-[1.5px] bg-white/80 rounded-full origin-center"
                    style={{ width: "16px" }}
                  />
                </div>
                <span className="text-white/50 text-[10px] tracking-wide">Links</span>
              </motion.button>

              {/* Column dropdown */}
              <AnimatePresence>
                {socialsOpen && (
                  <motion.div
                    key="socials-dropdown"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    style={{
                      boxShadow: `
                        0 1px 0 #111,
                        0 2px 0 #1b1b1b,
                        0 3px 0 #252525,
                        0 16px 32px rgba(0,0,0,0.75)
                      `,
                    }}
                    className="absolute top-[calc(100%+8px)] right-0
                               bg-black/70 border border-white/10
                               px-3 py-3 rounded-2xl backdrop-blur-xl
                               flex flex-col items-start gap-2
                               min-w-[120px] z-50"
                  >
                    {/* Accent top line */}
                    <div className="absolute top-0 left-3 right-3 h-px bg-accent/30 rounded-full" />
                    {/* 
                      Socials renders its icons — we force a column layout by 
                      wrapping in a flex-col container.
                      The [&>*] targets whatever Socials renders internally.
                    */}
                    <div className="flex flex-col items-start gap-2 pt-1 w-full [&>div]:flex-col [&>div]:items-start [&>div]:gap-2">
                      <Socials />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
            {/* ── end mobile ── */}

          </motion.div>

        </div>
      </div>
    </motion.header>
  );
};

export default Header;