import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { gsap } from "gsap";

import ParticlesContainer from "../components/ParticlesContainer";
import ProjectsBtn from "../components/ProjectsBtn";
import Avatar from "../components/Avatar";

const Home = () => {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const glowRef = useRef(null);

  // --- Multi-Layered 3D Camera Parallax ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-400, 400], [12, -12]);
  const rotateY = useTransform(mouseX, [-400, 400], [-12, 12]);
  
  const bgX = useTransform(mouseX, [-400, 400], [-10, 10]);
  const bgY = useTransform(mouseY, [-400, 400], [-10, 10]);
  
  const textX = useTransform(mouseX, [-400, 400], [-15, 15]);
  const textY = useTransform(mouseY, [-400, 400], [-15, 15]);
  
  const avatarX = useTransform(mouseX, [-400, 400], [-30, 30]);
  const avatarY = useTransform(mouseY, [-400, 400], [-30, 30]);

  const springConfig = { damping: 35, stiffness: 90, mass: 0.75 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);
  const smoothBgX = useSpring(bgX, springConfig);
  const smoothBgY = useSpring(bgY, springConfig);
  const smoothTextX = useSpring(textX, springConfig);
  const smoothTextY = useSpring(textY, springConfig);
  const smoothAvatarX = useSpring(avatarX, springConfig);
  const smoothAvatarY = useSpring(avatarY, springConfig);

  useEffect(() => {
    // --- GSAP Timeline: Cinematic Page Reveal ---
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        containerRef.current,
        { scale: 1.1, filter: "blur(10px)", opacity: 0 },
        { scale: 1, filter: "blur(0px)", opacity: 1, duration: 1.8 }
      );

      tl.fromTo(
        ".cinematic-char",
        { y: "110%", opacity: 0, rotateX: 50 },
        { y: "0%", opacity: 1, rotateX: 0, duration: 1, stagger: 0.02 },
        "-=1.2"
      );

      tl.fromTo(
        ".cinematic-glow-title",
        { y: 30, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "back.out(1.2)" },
        "-=0.8"
      );

      tl.fromTo(
        ".cinematic-word",
        { opacity: 0, y: 10, filter: "blur(3px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.008 },
        "-=0.9"
      );

      tl.fromTo(
        ".cinematic-btn",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6 },
        "-=0.5"
      );

      // Smooth Infinite Background Camera Float
      gsap.to(".video-bg-layer", {
        scale: 1.05,
        duration: 25,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    mouseX.set(x);
    mouseY.set(y);

    // Dynamic Follow Spotlight Lighting
    if (glowRef.current) {
      const localX = clientX - left;
      const localY = clientY - top;
      glowRef.current.style.background = `radial-gradient(700px circle at ${localX}px ${localY}px, rgba(244, 63, 94, 0.07), transparent 75%)`;
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(700px circle at 50% 50%, rgba(244, 63, 94, 0.02), transparent 75%)`;
    }
  };

  const titleText = "Transforming Ideas Into";
  const subtext = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, exercitationem harum, quia nulla temporibus deleniti libero veniam vero beatae numquam ducimus illum ab similique ipsam tempore fugit quod laudantium debitis.";

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-[#0c0d14] h-screen w-full relative overflow-hidden select-none"
      style={{ perspective: 1800 }}
    >
      {/* GLOW OVERLAY: Interactive Follow Spotlight */}
      <div 
        ref={glowRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 transition-all duration-300 ease-out"
        style={{ background: "radial-gradient(700px circle at 50% 50%, rgba(244, 63, 94, 0.02), transparent 75%)" }}
      />

      {/* BACKGROUND LAYER: Parallax Space Canvas */}
      <motion.div 
        style={{ x: smoothBgX, y: smoothBgY }}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 video-bg-layer"
      >
        <div
          role="img"
          className="bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge opacity-30 xl:opacity-50 scale-105"
          aria-hidden="true"
        />
        <ParticlesContainer />
      </motion.div>

      {/* LUXURY ACCENT: Floating Glassmorphic Ambient Flares */}
      <motion.div 
        style={{ x: smoothBgX, y: smoothBgY, rotateX: smoothRotateX, rotateY: smoothRotateY }}
        className="hidden xl:block absolute top-[20%] right-[45%] w-72 h-40 bg-white/[0.01] border border-white/[0.04] backdrop-blur-xl rounded-2xl z-10 pointer-events-none shadow-2xl"
      />

      {/* FOREGROUND MATRIX: Text Content */}
      <div className="w-full h-full bg-gradient-to-r from-[#0c0d14]/90 via-[#0c0d14]/40 to-transparent relative z-20">
        <div className="text-center flex flex-col justify-center xl:pt-36 xl:text-left h-full container mx-auto px-6 sm:px-12 xl:px-16">
          
          {/* Text Container Workspace */}
          <motion.div 
            ref={textContainerRef}
            style={{ x: smoothTextX, y: smoothTextY, transformStyle: "preserve-3d", translateZ: 50 }}
            className="will-change-transform max-w-xl xl:max-w-2xl"
          >
            {/* Title Block with Reveal Masks */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[56px] font-black text-white tracking-tight leading-none overflow-hidden pb-1">
              {titleText.split(" ").map((word, wIdx) => (
                <span key={wIdx} className="inline-block overflow-hidden mr-3 whitespace-nowrap">
                  {word.split("").map((char, cIdx) => (
                    <span key={cIdx} className="cinematic-char inline-block will-change-transform origin-bottom">
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            {/* Premium Glowing Title Accent */}
            <div className="overflow-hidden py-2 leading-none mt-1">
              <span className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-wide text-accent inline-block cinematic-glow-title drop-shadow-[0_0_35px_rgba(244,63,94,0.4)]">
                Digital Reality
              </span>
            </div>
          </motion.div>

          {/* Subtext Paragraph Word-by-Word Animation */}
          <p className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 text-white/60 font-sans tracking-wide text-xs sm:text-sm xl:text-[15px] leading-relaxed mt-5 mb-10">
            {subtext.split(" ").map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden mr-1">
                <span className="cinematic-word inline-block will-change-transform">
                  {word}
                </span>
              </span>
            ))}
          </p>

          {/* Call to Action Controls */}
          <div className="flex justify-center xl:hidden relative cinematic-btn">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ProjectsBtn />
            </motion.div>
          </div>
          
          <div className="hidden xl:flex cinematic-btn">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <ProjectsBtn />
            </motion.div>
          </div>

        </div>
      </div>

      {/* AVATAR LAYER: Full 3D Cinematic Space Frame */}
      <div className="hidden md:block w-[42vw] h-[65vh] lg:h-[80vh] xl:h-full absolute right-[3%] lg:right-[6%] bottom-0 pointer-events-none z-30">
        <motion.div
          style={{ 
            rotateX: smoothRotateX, 
            rotateY: smoothRotateY,
            x: smoothAvatarX,
            y: smoothAvatarY,
            transformStyle: "preserve-3d" 
          }}
          className="w-full h-full relative flex items-end justify-center"
        >
          {/* Volumetric Backdrop Glow behind character */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-accent/5 blur-[120px]" />

          {/* Deep Forward Extrusion on Z-Axis */}
          <motion.div
            style={{ 
              transformStyle: "preserve-3d",
              translateZ: 130 
            }}
            className="w-full h-full pointer-events-auto flex items-end justify-center"
          >
            {/* Soft Ambient Floating Camera Simulation Loop */}
            <motion.div
              animate={{ 
                y: [0, -12, 0],
                rotateZ: [0, 0.6, -0.6, 0]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full h-full"
            >
              <Avatar />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

    </div>
  );
};

export default Home;