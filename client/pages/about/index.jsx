import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useRef } from "react";
import CountUp from "react-countup";
import {
  FaCss3,
  FaFigma,
  FaHtml5,
  FaJs,
  FaReact,
  FaWordpress,
} from "react-icons/fa";
import {
  SiAdobephotoshop,
  SiAdobexd,
  SiFramer,
  SiNextdotjs,
} from "react-icons/si";

// FIXED: Added missing internal component imports back
import Avatar from "../../components/Avatar";
import Circles from "../../components/Circles";
import AnimatedText from "../../components/AnimatedText";

export const aboutData = [
  {
    title: "skills",
    info: [
      {
        title: "Web Development",
        level: 95,
        icons: [FaHtml5, FaCss3, FaJs, FaReact, SiNextdotjs, SiFramer, FaWordpress],
      },
      {
        title: "UI/UX Design",
        level: 88,
        icons: [FaFigma, SiAdobexd, SiAdobephotoshop],
      },
    ],
  },
  {
    title: "awards",
    info: [
      { title: "Webby Awards - Honoree", stage: "2011 - 2012", desc: "Recognized for structural layout excellence." },
      { title: "Adobe Design Achievement Awards - Finalist", stage: "2009 - 2010", desc: "Top global 5% innovative interface architecture." },
    ],
  },
  {
    title: "experience",
    info: [
      { title: "UX/UI Designer - XYZ Company", stage: "2012 - 2023", desc: "Led architectural workflows for core client portals." },
      { title: "Web Developer - ABC Agency", stage: "2010 - 2012", desc: "Engineered scalable custom full-stack solutions." },
      { title: "Intern - DEF Corporation", stage: "2008 - 2010", desc: "Optimized responsive UI layout metrics." },
    ],
  },
  {
    title: "credentials",
    info: [
      { title: "Web Development - ABC University, LA, CA", stage: "2011", desc: "BSc Computer Systems Engineering Integration." },
      { title: "Computer Science Diploma - AV Technical Institute", stage: "2009", desc: "Advanced algorithmic structuring architecture." },
      { title: "Certified Graphic Designer - ABC Institute, LA, CA", stage: "2006", desc: "Visual composition & typographic mechanics layout." },
    ],
  },
];

const About = () => {
  const [index, setIndex] = useState(0);
  const aboutRef = useRef(null);

  // --- Cinematic 3D Tracking Dynamics ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-400, 400], [18, -18]);
  const rotateY = useTransform(mouseX, [-400, 400], [-18, 18]);
  const shiftX = useTransform(mouseX, [-400, 400], [-12, 12]);
  const shiftY = useTransform(mouseY, [-400, 400], [-12, 12]);

  const springConfig = { damping: 20, stiffness: 90, mass: 0.5 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);
  const smoothShiftX = useSpring(shiftX, springConfig);
  const smoothShiftY = useSpring(shiftY, springConfig);

  const handleMouseMove = (e) => {
    if (!aboutRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = aboutRef.current.getBoundingClientRect();
    mouseX.set(clientX - (left + width / 2));
    mouseY.set(clientY - (top + height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={aboutRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-screen bg-gradient-to-b from-primary/10 via-[#0a0b10] to-[#12131c] py-24 xl:py-32 text-center xl:text-left select-none overflow-hidden relative"
      style={{ perspective: 1500 }}
    >
      <Circles />

      {/* 3D AVATAR PERSPECTIVE ANCHOR */}
      <motion.div
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          x: smoothShiftX,
          y: smoothShiftY,
          transformStyle: "preserve-3d"
        }}
        initial={{ opacity: 0, x: -450 }}
        animate={{ opacity: 1, x: -370 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="hidden xl:flex absolute bottom-0 -left-[370px] z-10 pointer-events-none"
      >
        <div style={{ translateZ: 80 }}>
          <Avatar />
        </div>
      </motion.div>

      <div className="container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-12 relative z-20 px-4 md:px-12">
        
        {/* ================= LEFT COLUMN ================= */}
        <div className="flex-1 flex flex-col justify-center items-center xl:items-start mt-12">
          <motion.div
            style={{ rotateX: smoothRotateX, rotateY: smoothRotateY, transformStyle: "preserve-3d" }}
            className="mb-6"
          >
            <AnimatedText
              text="Captivating stories birth magnificent designs."
              className="h3 block text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight"
              delay={0.1}
              variant="word"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-[540px] text-white/50 text-sm md:text-base leading-relaxed mb-8 xl:mb-12 font-light"
          >
            10 years ago, I began freelancing as a developer. Since then, I've
            done remote work for agencies, consulted for startups, and
            collaborated on digital products for business and consumer use.
          </motion.p>

          {/* 3D COUNTER CARDS */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-lg xl:max-w-none mb-8" style={{ transformStyle: "preserve-3d" }}>
            {[
              { end: 10, label: "Years of experience", glow: "rgba(244,63,94,0.4)" },
              { end: 250, label: "Satisfied clients", glow: "rgba(59,130,246,0.4)" },
              { end: 650, label: "Finished projects", glow: "rgba(168,85,247,0.4)" },
              { end: 8, label: "Winning awards", glow: "rgba(34,197,94,0.4)" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                style={{
                  rotateX: smoothRotateX,
                  rotateY: smoothRotateY,
                  transformStyle: "preserve-3d",
                  boxShadow: "0 4px 0 #07080c, 0 16px 30px rgba(0,0,0,0.6)"
                }}
                whileHover={{ 
                  scale: 1.05, 
                  translateZ: 30,
                  borderColor: "rgba(244,63,94,0.3)"
                }}
                className="relative bg-white/[0.02] border border-white/[0.06] p-5 rounded-2xl transition-colors duration-300 group"
              >
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] rounded-full filter blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                  style={{ backgroundColor: stat.glow, boxShadow: `0 0 15px ${stat.glow}` }}
                />
                <div style={{ translateZ: 20 }} className="text-3xl xl:text-4xl font-black text-accent mb-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                  <CountUp start={0} end={stat.end} duration={3.5} />+
                </div>
                <div className="text-[10px] uppercase font-semibold tracking-widest text-white/40 leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <motion.div
          style={{
            rotateX: smoothRotateX,
            rotateY: smoothRotateY,
            x: smoothShiftX,
            y: smoothShiftY,
            transformStyle: "preserve-3d",
            boxShadow: `
              0 1px 0 rgba(255,255,255,0.08) inset,
              0 4px 0 #05060a,
              0 25px 60px rgba(0,0,0,0.75)
            `
          }}
          className="flex flex-col w-full xl:max-w-[50%] h-auto md:h-[460px] xl:h-[520px] bg-gradient-to-b from-[#11121a]/95 to-[#07080c]/98 border border-white/10 p-5 md:p-8 rounded-[32px] will-change-transform mt-11"
        >
          {/* TABS */}
          <div className="flex flex-wrap gap-2.5 justify-center xl:justify-start mb-6" style={{ transformStyle: "preserve-3d" }}>
            {aboutData.map((item, itemI) => {
              const isSelected = index === itemI;
              return (
                <motion.button
                  key={itemI}
                  onClick={() => setIndex(itemI)}
                  style={{
                    transformStyle: "preserve-3d",
                    boxShadow: isSelected 
                      ? "0 3px 0 #9f1239, 0 8px 20px rgba(244,63,94,0.3)" 
                      : "0 2px 0 #050608"
                  }}
                  whileHover={{ scale: 1.05, translateZ: 20 }}
                  whileTap={{ scale: 0.95 }}
                  className={`cursor-pointer capitalize text-xs px-4 py-2.5 rounded-xl transition-all duration-300 font-black tracking-widest border ${
                    isSelected
                      ? "bg-gradient-to-b from-accent/20 to-accent/5 border-accent/40 text-accent shadow-[inset_0_0_10px_rgba(244,63,94,0.2)]"
                      : "bg-white/[0.01] border-white/5 text-white/40 hover:text-white hover:border-white/20"
                  }`}
                >
                  {item.title}
                </motion.button>
              );
            })}
          </div>

          {/* LIST MATRIX CONTAINER */}
          <div className="flex flex-col gap-y-4 overflow-y-auto pr-1 flex-1 scrollbar-thin scrollbar-thumb-white/10 " style={{ transformStyle: "preserve-3d" }}>
            {aboutData[index].info.map((item, itemI) => (
              <motion.div
                key={itemI}
                initial={{ opacity: 0, x: 30, rotateY: -10 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 14, delay: itemI * 0.08 }}
                className="w-full bg-white/[0.01] border border-white/[0.04] p-4 rounded-2xl flex flex-col gap-y-3 group/row hover:bg-white/[0.03] hover:border-accent/40 transition-all duration-300"
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow: "0 3px 0 #040508"
                }}
              >
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-y-2 w-full" style={{ transformStyle: "preserve-3d" }}>
                  <div className="text-center md:text-left">
                    <div className="font-bold text-white text-base xl:text-lg tracking-wide group-hover/row:text-accent transition-colors duration-300">
                      {item.title}
                    </div>
                    {item.desc && (
                      <div className="text-xs text-white/40 mt-1 max-w-sm font-light">
                        {item.desc}
                      </div>
                    )}
                  </div>

                  {item.stage && (
                    <div 
                      style={{ translateZ: 15, boxShadow: "0 2px 0 rgba(0,0,0,0.5)" }}
                      className="text-[10px] text-white/80 font-mono tracking-widest font-black uppercase px-2.5 py-1 bg-white/5 rounded-md border border-white/10"
                    >
                      {item.stage}
                    </div>
                  )}

                  {item.level && (
                    <div className="flex items-center gap-x-2" style={{ translateZ: 15 }}>
                      <span className="text-xs font-mono font-bold text-accent drop-shadow-[0_0_5px_rgba(244,63,94,0.5)]">{item.level}%</span>
                    </div>
                  )}
                </div>

                {item.level && (
                  <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden relative border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-accent to-[#ff4b6e] rounded-full shadow-[0_0_10px_#f43f5e]"
                    />
                  </div>
                )}

                {item.icons && (
                  <div className="flex flex-wrap gap-2 mt-1 justify-center md:justify-start" style={{ transformStyle: "preserve-3d" }}>
                    {item.icons.map((Icon, iconI) => (
                      <motion.div
                        key={iconI}
                        style={{
                          transformStyle: "preserve-3d",
                          boxShadow: "0 2px 0 #030406, 0 6px 12px rgba(0,0,0,0.4)"
                        }}
                        whileHover={{ 
                          scale: 1.2, 
                          translateZ: 25,
                          y: -3,
                          transition: { type: "spring", stiffness: 450, damping: 10 }
                        }}
                        className="w-10 h-10 flex items-center justify-center bg-[#0d0e15] border border-white/10 rounded-xl text-xl text-white/70 hover:text-white hover:border-accent/40 hover:shadow-[0_0_15px_rgba(244,63,94,0.4)] transition-all duration-300"
                      >
                        <div style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.6))" }}>
                          <Icon />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;