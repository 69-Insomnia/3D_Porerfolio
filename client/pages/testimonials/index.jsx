import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";

import { useRef, useState, useEffect } from "react";

import {
  RxChatBubble,
  RxDashboard,
  RxHeading,
  RxStar,
} from "react-icons/rx";

import {
  FaYoutube,
  FaInstagram,
  FaFacebookF,
  FaDribbble,
  FaPinterestP,
  FaGithub,
} from "react-icons/fa";

import AnimatedText from "../../components/AnimatedText";

const rotatingTexts = [
  "Amazing UI/UX Experience",
  "Modern & Cinematic Design",
  "Super Fast Performance",
  "Professional Frontend Work",
  "Interactive User Experience",
];

const socialLinks = [
  { icon: <FaYoutube />, url: "https://youtube.com", label: "YouTube", color: "hover:text-red-500 hover:border-red-500/30 hover:bg-red-500/5" },
  { icon: <FaInstagram />, url: "https://instagram.com", label: "Instagram", color: "hover:text-pink-500 hover:border-pink-500/30 hover:bg-pink-500/5" },
  { icon: <FaFacebookF />, url: "https://facebook.com", label: "Facebook", color: "hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-500/5" },
  { icon: <FaDribbble />, url: "https://dribbble.com", label: "Dribbble", color: "hover:text-rose-400 hover:border-rose-400/30 hover:bg-rose-400/5" },
  { icon: <FaPinterestP />, url: "https://pinterest.com", label: "Pinterest", color: "hover:text-red-600 hover:border-red-600/30 hover:bg-red-600/5" },
  { icon: <FaGithub />, url: "https://github.com", label: "Github", color: "hover:text-purple-400 hover:border-purple-400/30 hover:bg-purple-400/5" },
];

const customerFeedbacks = [
  {
    name: "Anne Smith",
    role: "Product Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum expedita odit beatae, cupiditate saepe quam officia aut placeat quas neque! Absolute perfection in execution.",
  },
  {
    name: "Alex Martinez",
    role: "Frontend Engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    message: "The attention to UI performance and smooth animations is unmatched. It feels completely instantaneous and highly polished. Saved us months of design fine-tuning.",
  },
  {
    name: "Sarah Jenkins",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
    message: "Stunning aesthetics combined with high-grade utility. This clean interaction pattern immediately shifted our consumer onboarding performance vector up by 40%.",
  }
];

// STAGGER VARIATION ARCHITECTURE
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const Testimonials = () => {
  const containerRef = useRef(null);
  const consoleRef = useRef(null);
  const canvasRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // TRIGGER LOOP INTERACTIVE SLIDER SWAP
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === customerFeedbacks.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // MOUSE COORDINATE CHANNELS
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const consoleX = useMotionValue(0);
  const consoleY = useMotionValue(0);

  // AMBIENT GLOW SYSTEM CONFIGS
  const glowX = useSpring(useMotionValue(0), { damping: 40, stiffness: 120 });
  const glowY = useSpring(useMotionValue(0), { damping: 40, stiffness: 120 });

  // 3D DEPTH TRANSLATION INTERACTIVE FIELDS
  const rotateX = useTransform(mouseY, [-500, 500], [12, -12]);
  const rotateY = useTransform(mouseX, [-500, 500], [-12, 12]);
  const shiftX = useTransform(mouseX, [-500, 500], [-20, 20]);
  const shiftY = useTransform(mouseY, [-500, 500], [-20, 20]);
  const headingX = useTransform(mouseX, [-500, 500], [-10, 10]);
  const headingY = useTransform(mouseY, [-500, 500], [-10, 10]);

  const springConfig = { damping: 28, stiffness: 80, mass: 0.7 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);
  const smoothShiftX = useSpring(shiftX, springConfig);
  const smoothShiftY = useSpring(shiftY, springConfig);
  const smoothHeadingX = useSpring(headingX, springConfig);
  const smoothHeadingY = useSpring(headingY, springConfig);

  const glareTop = useTransform(consoleY, [-300, 300], [0, 500]);
  const glareLeft = useTransform(consoleX, [-500, 500], [0, 700]);
  const dynamicGlareBackground = useMotionTemplate`
    radial-gradient(
      650px circle at ${glareLeft}px ${glareTop}px,
      rgba(244,63,94,0.14) 0%,
      rgba(255,255,255,0.05) 30%,
      transparent 65%
    )
  `;

  useEffect(() => {
    setMounted(true);
  }, []);

  // MATRIX PARTICLE SIMULATOR
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * -0.6 - 0.2;
        this.opacity = Math.random() * 0.35 + 0.15;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) this.reset();
      }
      draw() {
        ctx.fillStyle = `rgba(244,63,94,${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 45; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  const handleMouseMove = (e) => {
    if (!containerRef.current || !consoleRef.current) return;
    const { clientX, clientY } = e;
    const globalBounds = containerRef.current.getBoundingClientRect();
    
    mouseX.set(clientX - (globalBounds.left + globalBounds.width / 2));
    mouseY.set(clientY - (globalBounds.top + globalBounds.height / 2));

    const consoleBounds = consoleRef.current.getBoundingClientRect();
    consoleX.set(clientX - (consoleBounds.left + consoleBounds.width / 2));
    consoleY.set(clientY - (consoleBounds.top + consoleBounds.height / 2));

    glowX.set(clientX - globalBounds.left - 130);
    glowY.set(clientY - globalBounds.top - 130);
  };

  const currentFeedback = customerFeedbacks[activeIndex];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        mouseX.set(0); mouseY.set(0); consoleX.set(0); consoleY.set(0);
        setIsHovered(false);
      }}
      className="h-screen w-screen bg-[#030408] flex items-center overflow-hidden relative py-0 select-none"
      style={{ perspective: 2000 }}
    >
      {/* BACKGROUND PARTICLE DECK */}
      {mounted && <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-45 pointer-events-none" />}

      {/* REACTIVE RADIUS BACKGLOW */}
      <motion.div
        style={{ x: glowX, y: glowY, opacity: isHovered ? 0.5 : 0 }}
        className="hidden xl:block absolute w-[320px] h-[320px] bg-gradient-to-tr from-pink-500/25 to-rose-500/5 rounded-full blur-[110px] pointer-events-none"
      />

      <div className="container mx-auto relative z-20 px-6 xl:px-20 flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-8 w-full">
        
        {/* LEFT COLUMN: BRAND HERO TEXT STACK WITH IDLE ENGINE */}
        <motion.div
          style={{ x: smoothHeadingX, y: smoothHeadingY }}
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="text-center xl:text-left flex flex-col items-center xl:items-start max-w-[540px]"
        >
          {/* BADGE COMPONENT WITH NEON RISE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="inline-flex items-center gap-2 border border-pink-500/20 bg-pink-500/10 backdrop-blur-xl px-4 py-1.5 rounded-full text-pink-400 text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(244,63,94,0.1)]"
          >
            <RxChatBubble className="animate-pulse text-pink-500 text-sm" />
            Social Endorsements
          </motion.div>

          {/* MAIN CHROMATIC TITLE */}
          <div className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1] text-white">
            <AnimatedText
              text="What customers"
              className="inline-block bg-gradient-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm"
              delay={0.15}
              variant="word"
            />{" "}
            <motion.span
              className="bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent inline-block drop-shadow-[0_0_20px_rgba(244,63,94,0.4)]"
              initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 110, delay: 0.3 }}
            >
              say.
            </motion.span>
          </div>

          {/* INFINITE ROTATING TRACK SLIDER ELEMENT */}
          <div className="h-[35px] mt-5 overflow-hidden relative flex items-center xl:justify-start justify-center w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -20, filter: "blur(2px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 20, filter: "blur(2px)" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex items-center gap-2.5 text-pink-400/90 font-semibold text-sm tracking-wider uppercase"
              >
                <RxStar className="text-rose-500 text-sm animate-spin-slow shadow-pink-500/50" />
                {rotatingTexts[activeIndex % rotatingTexts.length]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* FLEX SOCIAL DECK WITH MOVEMENT LOADERS */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center xl:justify-start gap-4 mt-10 pt-8 border-t border-white/[0.06] w-full"
          >
            {socialLinks.map((social, idx) => (
              <motion.a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                variants={staggerItem}
                whileHover={{ y: -6, scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                className={`w-11 h-11 flex items-center justify-center rounded-xl bg-white/[0.02] border border-white/[0.07] text-zinc-400 transition-all duration-300 relative group ${social.color}`}
                title={social.label}
              >
                <div className="text-base z-10">{social.icon}</div>
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-current/10 blur-md" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: 3D FLYING TERMINAL HUB */}
        <div
          className="w-full xl:max-w-[620px] flex justify-center"
          style={{ perspective: 2000 }}
        >
          <motion.div
            ref={consoleRef}
            style={{
              rotateX: smoothRotateX,
              rotateY: smoothRotateY,
              x: smoothShiftX,
              y: smoothShiftY,
              transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="w-full bg-[#0a0b0e]/90 backdrop-blur-3xl border border-white/[0.09] rounded-[32px] p-6 relative overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.9)]"
          >
            {/* HOVER DYNAMIC GLARE LAYER */}
            <motion.div
              style={{ background: mounted ? dynamicGlareBackground : "none" }}
              className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay"
            />

            {/* BAR CONTROLLER ACTION LINE */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-6 relative z-20 pointer-events-none">
              <div className="flex items-center gap-2">
                <motion.span 
                  animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="w-2.5 h-2.5 bg-gradient-to-r from-pink-500 to-rose-400 rounded-full shadow-[0_0_12px_rgba(244,63,94,0.6)]"
                ></motion.span>
                <span className="w-2.5 h-2.5 bg-zinc-800 rounded-full"></span>
                <span className="w-2.5 h-2.5 bg-zinc-900 rounded-full"></span>
                <span className="text-[9px] font-mono tracking-[0.32em] bg-gradient-to-r from-zinc-500 to-zinc-600 bg-clip-text text-transparent font-bold ml-1.5 uppercase">
                  Customer_Feedback_System
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-600 text-xs">
                <RxDashboard className="hover:text-pink-400 transition-colors duration-200" />
                <RxHeading className="hover:text-pink-400 transition-colors duration-200" />
              </div>
            </div>

            {/* DYNAMIC METADATA CONTROLLER ENGINE WINDOW */}
            <motion.div
              style={{ translateZ: 50 }}
              className="relative z-20 bg-black/50 border border-white/[0.04] rounded-2xl p-6 min-h-[210px] flex flex-col justify-start overflow-hidden shadow-inner"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 25, x: 5, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -25, x: -5, filter: "blur(6px)" }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  className="w-full flex flex-col gap-5"
                >
                  {/* SLIDER TOP HEADER BLOCK ROW */}
                  <div className="flex items-center gap-4 w-full">
                    <motion.div
                      initial={{ scale: 0.75, opacity: 0, rotate: -10 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 120 }}
                      className="relative shrink-0"
                    >
                      <img
                        src={currentFeedback.image}
                        alt={currentFeedback.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-pink-500/40 shadow-[0_0_15px_rgba(244,63,94,0.2)] bg-zinc-900"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0a0b0e] rounded-full shadow-md" />
                    </motion.div>

                    <div className="flex flex-col min-w-0">
                      <motion.h4 
                        initial={{ x: -8 }}
                        animate={{ x: 0 }}
                        className="bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent font-extrabold text-base tracking-wide truncate"
                      >
                        {currentFeedback.name}
                      </motion.h4>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="text-transparent bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-xs font-bold tracking-widest uppercase mt-0.5"
                      >
                        {currentFeedback.role}
                      </motion.p>
                    </div>
                  </div>

                  {/* BOTTOM RECONFIGURED BLOCKQUOTE DISPLAY */}
                  <div className="relative mt-1">
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.45 }}
                      className="text-zinc-300 text-sm leading-relaxed font-medium tracking-wide italic pl-4 border-l-2 border-pink-500/40 relative z-10"
                    >
                      "{currentFeedback.message}"
                    </motion.p>
                    <div className="absolute top-[-10px] left-2 text-6xl text-white/[0.02] font-serif font-black select-none pointer-events-none">“</div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Testimonials;