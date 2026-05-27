import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

import {
  RxChevronRight,
  RxLayers,
  RxDashboard,
  RxExternalLink,
} from "react-icons/rx";

import { fadeIn } from "../../variants";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import WorkSlider from "../../components/WorkSlider";

const Work = () => {
  const workRef = useRef(null);
  const cardRef = useRef(null);
  const canvasRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  // MOUSE TRACKING
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);

  // GLOW EFFECT
  const glowX = useSpring(useMotionValue(0), {
    damping: 35,
    stiffness: 150,
  });

  const glowY = useSpring(useMotionValue(0), {
    damping: 35,
    stiffness: 150,
  });

  // ROTATION
  const rotateX = useTransform(mouseY, [-400, 400], [15, -15]);

  const rotateY = useTransform(mouseX, [-400, 400], [-15, 15]);

  // MOVEMENT
  const shiftX = useTransform(mouseX, [-400, 400], [-25, 25]);

  const shiftY = useTransform(mouseY, [-400, 400], [-25, 25]);

  // TEXT MOVEMENT
  const textSubtleX = useTransform(mouseX, [-400, 400], [-10, 10]);

  const textSubtleY = useTransform(mouseY, [-400, 400], [-10, 10]);

  // SPRING
  const springConfig = {
    damping: 22,
    stiffness: 90,
    mass: 0.6,
  };

  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const smoothShiftX = useSpring(shiftX, springConfig);
  const smoothShiftY = useSpring(shiftY, springConfig);

  const smoothTextX = useSpring(textSubtleX, springConfig);
  const smoothTextY = useSpring(textSubtleY, springConfig);

  // GLARE
  const glareTop = useTransform(cardY, [-300, 300], [0, 500]);

  const glareLeft = useTransform(cardX, [-500, 500], [0, 700]);

  // PARTICLES
  useEffect(() => {
    setMounted(true);

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
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 2 + 0.5;

        this.speedX = Math.random() * 0.4 - 0.2;

        this.speedY = Math.random() * -0.5 - 0.2;

        this.opacity = Math.random() * 0.6 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.y < 0) {
          this.y = canvas.height;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.fillStyle = `rgba(244,63,94,${this.opacity})`;

        ctx.beginPath();

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fill();
      }
    }

    for (let i = 0; i < 70; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);

      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // MOUSE MOVE
  const handleMouseMove = (e) => {
    if (!workRef.current || !cardRef.current) return;

    const { clientX, clientY } = e;

    const globalBounds = workRef.current.getBoundingClientRect();

    const xGlobal =
      clientX - (globalBounds.left + globalBounds.width / 2);

    const yGlobal =
      clientY - (globalBounds.top + globalBounds.height / 2);

    mouseX.set(xGlobal);
    mouseY.set(yGlobal);

    const cardBounds = cardRef.current.getBoundingClientRect();

    const xCard =
      clientX - (cardBounds.left + cardBounds.width / 2);

    const yCard =
      clientY - (cardBounds.top + cardBounds.height / 2);

    cardX.set(xCard);
    cardY.set(yCard);

    glowX.set(clientX - globalBounds.left - 150);

    glowY.set(clientY - globalBounds.top - 150);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);

    cardX.set(0);
    cardY.set(0);

    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const headingWords = "My Work".split(" ");

  const containerVariants = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 1,

      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      rotateX: 45,
    },

    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,

      transition: {
        type: "spring",
        damping: 12,
        stiffness: 90,
      },
    },
  };

  return (
    <div
      ref={workRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="h-screen bg-[#020306] flex items-center overflow-hidden relative pt-20 xl:pt-28"
      style={{
        perspective: 1400,
      }}
    >
      {/* PARTICLE BACKGROUND */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* BACKGROUND */}
      <Circles />

      {/* GLOW */}
      <motion.div
        style={{
          x: glowX,
          y: glowY,
          opacity: isHovered ? 0.8 : 0,
        }}
        className="hidden xl:block absolute w-[260px] h-[260px] bg-pink-500/20 rounded-full blur-[100px]"
      />

      <div className="container mx-auto relative z-20 px-6">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-10">

          {/* LEFT SIDE */}
          <motion.div
            style={{
              x: smoothTextX,
              y: smoothTextY,
            }}
            className="text-center xl:text-left xl:w-[35vw]"
          >
            {/* TAG */}
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className="flex items-center gap-2 text-pink-500 text-xs uppercase mb-5"
            >
              <RxLayers />
              Portfolio Showcase
            </motion.div>

            {/* TITLE */}
            <motion.h2
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-5xl xl:text-6xl font-bold text-white leading-tight mb-6"
            >
              {headingWords.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordVariants}
                  className="inline-block mr-4"
                >
                  {word}
                </motion.span>
              ))}

              <span className="text-pink-500">.</span>
            </motion.h2>

            {/* DESCRIPTION */}
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              className="text-zinc-400 max-w-[450px] mb-8 leading-relaxed"
            >
              Creative frontend developer crafting modern,
              cinematic and immersive web experiences with
              React, Next.js and Tailwind CSS.
            </motion.p>

            {/* BUTTON */}
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="hidden xl:flex items-center gap-3 bg-pink-500 hover:bg-pink-600 transition px-6 py-3 rounded-full text-white font-semibold"
            >
              Launch Projects
              <RxChevronRight />
            </motion.button>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            ref={cardRef}
            style={{
              rotateX: smoothRotateX,
              rotateY: smoothRotateY,
              x: smoothShiftX,
              y: smoothShiftY,
            }}
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.5,
            }}
            className="w-full max-w-[430px] xl:max-w-[450px] bg-[#0a0a0a]/95 border border-white/10 rounded-[30px] p-5 relative overflow-hidden mt-4 xl:mt-0"
          >
            {/* GLARE */}
            <motion.div
              style={{
                background: mounted
                  ? `radial-gradient(
                    600px circle at ${glareLeft.get()}px ${glareTop.get()}px,
                    rgba(255,255,255,0.08),
                    transparent 40%
                  )`
                  : "none",
              }}
              className="absolute inset-0 pointer-events-none"
            />

            {/* TOP BAR */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>

                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>

                <span className="w-3 h-3 bg-green-500 rounded-full"></span>

                <span className="text-xs text-zinc-500 ml-2">
                  Engine Console
                </span>
              </div>

              <div className="flex items-center gap-3 text-zinc-500">
                <RxDashboard />

                <RxExternalLink />
              </div>
            </div>

            {/* WORK SLIDER */}
            <div className="relative z-20 scale-[0.92] origin-top">
              <WorkSlider />
            </div>
          </motion.div>
        </div>
      </div>

      {/* BULB */}
      <Bulb />
    </div>
  );
};

export default Work;