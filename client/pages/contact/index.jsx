import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";

import { useRef, useState, useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import { RxChatBubble, RxDashboard, RxHeading, RxStar } from "react-icons/rx";

import AnimatedText from "../../components/AnimatedText";

const rotatingTexts = [
  "Let's Build Something Epic",
  "Open For Remote Collaborations",
  "Fast Response Within 24 Hours",
  "Bring Your Design Ideas To Life",
];

// MASS STAGGER ENGINE FOR HIGH-VELOCITY ENTRANCE
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.2 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 35, x: -10, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 120, damping: 14 }
  }
};

const Contact = () => {
  const containerRef = useRef(null);
  const consoleRef = useRef(null);
  const canvasRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeText, setActiveText] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveText((prev) => (prev === rotatingTexts.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // MOUSE COORDINATE CHANNELS
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const consoleX = useMotionValue(0);
  const consoleY = useMotionValue(0);

  // ULTRALIGHT RADIAL CODES
  const glowX = useSpring(useMotionValue(0), { damping: 35, stiffness: 100 });
  const glowY = useSpring(useMotionValue(0), { damping: 35, stiffness: 100 });

  // MAXIMUM 3D PARALLAX DEPTH TRANSLATION MATRICES (DIVERGENT SHIFTS)
  const rotateX = useTransform(mouseY, [-500, 500], [15, -15]);
  const rotateY = useTransform(mouseX, [-500, 500], [-15, 15]);
  
  // Right Console pushes away from cursor
  const shiftRightX = useTransform(mouseX, [-500, 500], [-30, 30]);
  const shiftRightY = useTransform(mouseY, [-500, 500], [-30, 30]);
  
  // Left Heading pulls toward cursor (Dynamic Parallax Split)
  const shiftLeftX = useTransform(mouseX, [-500, 500], [25, -25]);
  const shiftLeftY = useTransform(mouseY, [-500, 500], [25, -25]);

  // HIGH-SPEED SPRING DECAY ATTRIBUTES
  const springConfig = { damping: 22, stiffness: 90, mass: 0.5 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);
  const smoothShiftRightX = useSpring(shiftRightX, springConfig);
  const smoothShiftRightY = useSpring(shiftRightY, springConfig);
  const smoothShiftLeftX = useSpring(shiftLeftX, springConfig);
  const smoothShiftLeftY = useSpring(shiftLeftY, springConfig);

  // HIGH-GLOSS RECONSTRUCTED ADVANCED SPOTLIGHT GLARE
  const glareTop = useTransform(consoleY, [-300, 300], [0, 550]);
  const glareLeft = useTransform(consoleX, [-500, 500], [0, 750]);
  const dynamicGlareBackground = useMotionTemplate`
    radial-gradient(
      700px circle at ${glareLeft}px ${glareTop}px,
      rgba(244,63,94,0.18) 0%,
      rgba(168,85,247,0.06) 30%,
      transparent 70%
    )
  `;

  useEffect(() => {
    setMounted(true);
  }, []);

  // MATRIX ATMOSPHERIC PARTICLES SIMULATOR
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
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.speedY = Math.random() * -0.7 - 0.2;
        this.opacity = Math.random() * 0.4 + 0.15;
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

    for (let i = 0; i < 55; i++) particles.push(new Particle());

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

    glowX.set(clientX - globalBounds.left - 150);
    glowY.set(clientY - globalBounds.top - 150);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const myForm = event.target;
    const formData = new FormData(myForm);

    fetch("/__forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Thank you. I will get back to you ASAP.");
          myForm.reset();
        } else {
          console.log(res);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        mouseX.set(0); mouseY.set(0); consoleX.set(0); consoleY.set(0);
        setIsHovered(false);
      }}
      className="h-screen w-screen bg-[#020306] flex items-center overflow-hidden relative py-0 select-none"
      style={{ perspective: 2500 }}
    >
      {/* CANVAS BACKGROUND ENGAGEMENT */}
      {mounted && <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none" />}

      {/* INTELLIGENT BACKGLOW SPREAD */}
      <motion.div
        style={{ x: glowX, y: glowY, opacity: isHovered ? 0.55 : 0 }}
        className="hidden xl:block absolute w-[350px] h-[350px] bg-gradient-to-tr from-pink-500/25 to-purple-500/5 rounded-full blur-[110px] pointer-events-none"
      />

      <div className="container mx-auto relative z-20 px-6 xl:px-20 flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-8 w-full">
        
        {/* LEFT COLUMN: CALL TO ACTION HEADINGS WITH DYNAMIC OPPOSING PARALLAX */}
        <motion.div
          style={{ x: smoothShiftLeftX, y: smoothShiftLeftY }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
          className="text-center xl:text-left flex flex-col items-center xl:items-start max-w-[540px]"
        >
          {/* BADGE COMPONENT WITH AMBIENT NEON PULSE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="inline-flex items-center gap-2 border border-pink-500/20 bg-pink-500/10 backdrop-blur-xl px-4 py-1.5 rounded-full text-pink-400 text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(244,63,94,0.15)]"
          >
            <RxChatBubble className="animate-pulse text-pink-500 text-sm" />
            Get In Touch
          </motion.div>

          {/* MAIN CHROMATIC TITLE DISPLAY */}
          <div className="text-4xl md:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.08]">
            <AnimatedText
              text="Let's build together"
              className="inline-block bg-gradient-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-md"
              delay={0.1}
              variant="word"
            />{" "}
            <motion.span
              className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent inline-block drop-shadow-[0_0_25px_rgba(244,63,94,0.45)]"
              initial={{ opacity: 0, scale: 0.5, rotate: -60 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.75, type: "spring", stiffness: 120, delay: 0.25 }}
            >
              connect.
            </motion.span>
          </div>

          {/* INFINITE ROTATING TRACK SLIDER HEADER BLOCK */}
          <div className="h-[35px] mt-6 overflow-hidden relative flex items-center xl:justify-start justify-center w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeText}
                initial={{ opacity: 0, x: -25, filter: "blur(3px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 25, filter: "blur(3px)" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex items-center gap-2.5 text-pink-400 font-bold text-xs tracking-widest uppercase bg-pink-500/[0.03] border border-pink-500/10 rounded-lg px-3 py-1 backdrop-blur-sm"
              >
                <RxStar className="text-rose-500 text-xs animate-spin-slow" />
                {rotatingTexts[activeText]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: INTERACTIVE 3D PERSPECTIVE CODE TERMINAL */}
        <div
          className="w-full xl:max-w-[620px] flex justify-center"
          style={{ perspective: 2500 }}
        >
          <motion.div
            ref={consoleRef}
            style={{
              rotateX: smoothRotateX,
              rotateY: smoothRotateY,
              x: smoothShiftRightX,
              y: smoothShiftRightY,
              transformStyle: "preserve-3d",
            }}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.25 }}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full bg-[#090a0d]/90 backdrop-blur-3xl border border-white/[0.1] rounded-[32px] p-6 relative overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)]"
          >
            {/* FLOATING INTERNAL LIQUID AMBIENT NEON GLOW DECK */}
            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-pink-500/[0.02] via-transparent to-purple-500/[0.02] opacity-100 pointer-events-none" />

            {/* DYNAMIC HIGH-GLOSS SPOTLIGHT LAYER */}
            <motion.div
              style={{ background: mounted ? dynamicGlareBackground : "none" }}
              className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay"
            />

            {/* CONSOLE TERMINAL ACTION METADATA BAR */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-6 relative z-20 pointer-events-none">
              <div className="flex items-center gap-2">
                <motion.span 
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="w-2.5 h-2.5 bg-gradient-to-r from-pink-500 to-rose-400 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.65)]"
                ></motion.span>
                <span className="w-2.5 h-2.5 bg-zinc-800 rounded-full"></span>
                <span className="w-2.5 h-2.5 bg-zinc-900 rounded-full"></span>
                <span className="text-[9px] font-mono tracking-[0.35em] font-extrabold bg-gradient-to-r from-zinc-500 to-zinc-600 bg-clip-text text-transparent ml-1.5 uppercase">
                  Contact_Secure_Console
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-600 text-xs">
                <RxDashboard className="hover:text-pink-400 transition-colors" />
                <RxHeading className="hover:text-pink-400 transition-colors" />
              </div>
            </div>

            {/* HIGH-GRADIENT MULTI-AXIS FORM CORE STACK */}
            <motion.form
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ translateZ: 60 }}
              className="relative z-20 flex flex-col gap-4.5 w-full"
              onSubmit={handleSubmit}
              autoComplete="off"
              autoCapitalize="off"
              name="contact"
            >
              <input type="hidden" name="form-name" value="contact" />

              {/* STAGGERED FORM FIELD MATRIX BLOCK ROWS */}
              <div className="flex flex-col sm:flex-row gap-4.5 w-full">
                <motion.div variants={staggerItem} className="flex-1">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full bg-black/50 border border-white/[0.07] rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500/60 focus:bg-black/70 focus:shadow-[0_0_15px_rgba(244,63,94,0.05)] focus:scale-[1.015] transition-all duration-300"
                    disabled={isLoading}
                    required
                  />
                </motion.div>
                <motion.div variants={staggerItem} className="flex-1">
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    className="w-full bg-black/50 border border-white/[0.07] rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500/60 focus:bg-black/70 focus:shadow-[0_0_15px_rgba(244,63,94,0.05)] focus:scale-[1.015] transition-all duration-300"
                    disabled={isLoading}
                    required
                  />
                </motion.div>
              </div>

              {/* SUBJECT INPUT FIELD */}
              <motion.div variants={staggerItem} className="w-full">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="w-full bg-black/50 border border-white/[0.07] rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500/60 focus:bg-black/70 focus:shadow-[0_0_15px_rgba(244,63,94,0.05)] focus:scale-[1.015] transition-all duration-300"
                  disabled={isLoading}
                  required
                />
              </motion.div>

              {/* MESSAGE DETAILS INPUT AREA */}
              <motion.div variants={staggerItem} className="w-full">
                <textarea
                  name="message"
                  placeholder="Your message details..."
                  rows="4"
                  className="w-full bg-black/50 border border-white/[0.07] rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500/60 focus:bg-black/70 focus:shadow-[0_0_15px_rgba(244,63,94,0.05)] focus:scale-[1.015] transition-all duration-300 resize-none animate-none"
                  disabled={isLoading}
                  required
                />
              </motion.div>

              {/* GLOWING ACTION CALL TRIGGER ROW */}
              <motion.div variants={staggerItem} className="mt-2.5">
                <motion.button
                  whileHover={{ scale: 1.035, shadow: "0 0 25px rgba(244,63,94,0.25)" }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto min-w-[170px] h-12 rounded-xl border border-pink-500/40 bg-gradient-to-r from-pink-500/10 to-rose-500/10 hover:from-pink-500/20 hover:to-rose-500/20 px-6 text-xs font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-center overflow-hidden relative group cursor-pointer text-pink-400 shadow-[0_0_20px_rgba(244,63,94,0.08)]"
                >
                  <span className="group-hover:-translate-y-[160%] group-hover:opacity-0 transition-all duration-500 flex items-center gap-2">
                    {isLoading ? "Sending..." : "Let's talk"}
                  </span>

                  <BsArrowRight
                    className="translate-y-[160%] opacity-0 group-hover:flex group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-xl text-pink-400"
                    aria-hidden
                  />
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Contact;