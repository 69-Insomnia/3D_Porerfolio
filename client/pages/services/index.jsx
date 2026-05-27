import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  RxCrop, 
  RxPencil2, 
  RxDesktop, 
  RxReader, 
  RxRocket,
  RxLayers,
  RxChevronRight,
  RxCode,
  RxMobile,
  RxDashboard,
  RxGear,
  RxActivity
} from "react-icons/rx";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import AnimatedText from "../../components/AnimatedText";

const serviceData = [
  {
    icon: <RxCode />,
    title: "Frontend Development",
    description: "Build modern, responsive, and high-performance websites using React, Next.js, Tailwind CSS, and modern UI/UX practices.",
  },
  {
    icon: <RxGear />,
    title: "Backend Development",
    description: "Develop secure and scalable backend systems using Node.js, Express.js, PHP, and REST APIs with database integration.",
  },
  {
    icon: <RxDesktop />,
    title: "Full Stack Web Development",
    description: "Create complete web applications from frontend to backend with authentication, dashboards, admin panels, and dynamic features.",
  },
  {
    icon: <RxMobile />,
    title: "Mobile App Development",
    description: "Build cross-platform mobile applications using React Native with smooth UI and real-time functionality.",
  },
  {
    icon: <RxPencil2 />,
    title: "UI/UX Design",
    description: "Design clean, modern, and user-friendly interfaces with interactive layouts, animations, and responsive experiences.",
  },
  {
    icon: <RxLayers />,
    title: "Portfolio Website Development",
    description: "Create cinematic and animated portfolio websites with modern transitions, 3D effects, and premium visuals.",
  },
  {
    icon: <RxDashboard />,
    title: "Admin Dashboard Development",
    description: "Build powerful admin panels with analytics, CRUD operations, charts, authentication, and complete content management systems.",
  },
  {
    icon: <RxReader />,
    title: "E-commerce Website Development",
    description: "Develop online stores with product management, payment integration, cart systems, and responsive design.",
  },
  {
    icon: <RxLayers />,
    title: "API Integration",
    description: "Integrate third-party APIs, payment gateways, authentication systems, cloud services, and real-time data systems.",
  },
  {
    icon: <RxReader />,
    title: "Database Management",
    description: "Design and manage MySQL, MongoDB, and Firebase databases with optimized structures and secure connections.",
  },
  {
    icon: <RxRocket />,
    title: "Performance Optimization",
    description: "Improve website speed, SEO, responsiveness, and overall performance for better user experience.",
  },
  {
    icon: <RxActivity />,
    title: "Website Maintenance & Support",
    description: "Provide bug fixing, updates, optimization, and long-term technical support for websites and applications.",
  },
];

const slideVariants = {
  enter: {
    x: 80,
    opacity: 0,
    scale: 0.96,
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.65,
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  exit: {
    x: -80,
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: 0.45,
      ease: "easeInOut",
    },
  },
};

// WE COMPRESSED THIS TO GUARANTEE BOTH NAMED AND DEFAULT EXPORTS MATCH COMPLETELY
export const Services = () => {
  const serviceRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentService, setCurrentService] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentService((prev) => (prev === serviceData.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glowX = useSpring(useMotionValue(0), { damping: 35, stiffness: 150 });
  const glowY = useSpring(useMotionValue(0), { damping: 35, stiffness: 150 });

  const rotateX = useTransform(mouseY, [-500, 500], [15, -15]);
  const rotateY = useTransform(mouseX, [-500, 500], [-15, 15]);

  const shiftX = useTransform(mouseX, [-500, 500], [-45, 45]);
  const shiftY = useTransform(mouseY, [-500, 500], [-45, 45]);

  const springConfig = { damping: 28, stiffness: 80, mass: 0.8 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);
  const smoothShiftX = useSpring(shiftX, springConfig);
  const smoothShiftY = useSpring(shiftY, springConfig);

  const canvasRef = useRef(null);
  useEffect(() => {
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
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * -0.3 - 0.1;
        this.opacity = Math.random() * 0.5 + 0.2;
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
        ctx.fillStyle = `rgba(244, 63, 94, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 40; i++) {
      particles.push(new Particle());
    }

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
  }, []);

  const handleMouseMove = (e) => {
    if (!serviceRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = serviceRef.current.getBoundingClientRect();
    
    const xRelative = clientX - (left + width / 2);
    const yRelative = clientY - (top + height / 2);
    
    mouseX.set(xRelative);
    mouseY.set(yRelative);

    glowX.set(clientX - left - 150);
    glowY.set(clientY - top - 150);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div 
      ref={serviceRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="h-screen bg-[#040508] bg-gradient-to-b from-[#080911] via-[#040508] to-[#010203] py-24 xl:py-32 flex items-center select-none overflow-hidden relative antialiased"
      style={{ perspective: 1800 }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-60 mix-blend-screen" />
      
      <Circles />

      <motion.div 
        style={{
          x: glowX,
          y: glowY,
          opacity: isHovered ? 1 : 0
        }}
        className="hidden xl:block absolute w-[300px] h-[300px] bg-gradient-to-r from-accent/20 to-[#ff4b6e]/10 rounded-full filter blur-[80px] pointer-events-none z-0 transition-opacity duration-500 will-change-transform mix-blend-screen"
      />

      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary/5 rounded-full filter blur-[200px] pointer-events-none z-0" />

      <div className="container mx-auto h-full flex flex-col justify-center relative z-20 px-6 md:px-12 xl:px-16">
        <div className="flex flex-col xl:flex-row gap-y-12 xl:gap-y-0 xl:gap-x-20 items-center justify-between">
          
          {/* LEFT PANEL */}
          <div className="text-center flex xl:w-[35vw] flex-col xl:text-left z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              style={{ rotateX: smoothRotateX, rotateY: smoothRotateY, transformStyle: "preserve-3d" }}
              className="block text-4xl sm:text-5xl xl:text-[56px] font-extrabold text-white tracking-tight leading-[1.1] mb-6"
            >
              <AnimatedText text="My services" className="inline-block" delay={0.15} variant="word" />
              <motion.span
                className="text-accent inline-block ml-1 drop-shadow-[0_0_20px_rgba(244,63,94,0.8)]"
                initial={{ opacity: 0, rotate: -270, scale: 0.2 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.6, type: "spring", stiffness: 110, damping: 12 }}
              >
                .
              </motion.span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="max-w-[460px] text-zinc-400 text-sm md:text-base leading-relaxed font-light mx-auto xl:mx-0 mb-10 shadow-sm"
            >
              Delivering high-performance digital solutions across complex full-stack web architectures 
              and beautiful user experience frameworks.
            </motion.p>

            <div className="hidden xl:flex items-center gap-x-3 text-[11px] font-bold tracking-widest text-zinc-500 uppercase group/link cursor-pointer w-fit">
              <span className="group-hover/link:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-accent after:transition-all after:duration-300 group-hover/link:after:w-full">
                See my work milestone model
              </span>
              <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center group-hover/link:border-accent/50 group-hover/link:bg-accent/10 transition-all duration-300">
                <RxChevronRight className="text-sm text-zinc-500 group-hover/link:text-accent group-hover/link:translate-x-[1px] transition-all duration-300" />
              </div>
            </div>
          </div>

          {/* RIGHT CANVAS CONTAINER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.2 }}
            style={{
              rotateX: smoothRotateX,
              rotateY: smoothRotateY,
              x: smoothShiftX,
              y: smoothShiftY,
              transformStyle: "preserve-3d",
              boxShadow: "0 1px 0 rgba(255,255,255,0.08) inset, 0 40px 90px rgba(0,0,0,0.85)"
            }}
            whileHover={{ borderColor: "rgba(244,63,94,0.4)", scale: 1.02 }}
            className="w-full xl:w-[55%] min-h-[360px] flex items-center bg-gradient-to-b from-[#10121b]/90 to-[#050608]/98 border border-white/[0.05] p-8 md:p-12 rounded-[40px] backdrop-blur-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/6 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent filter blur-sm transition-opacity duration-700" />
            
            <div style={{ translateZ: 50 }} className="w-full relative h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentService}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full flex flex-col gap-y-4"
                >
                  <div className="text-4xl text-accent mb-2 w-fit p-3 bg-white/[0.02] border border-white/5 rounded-2xl">
                    {serviceData[currentService]?.icon}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    {serviceData[currentService]?.title}
                  </h3>
                  <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed max-w-[95%]">
                    {serviceData[currentService]?.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* TRACKING PAGINATION DOTS */}
              <div className="absolute bottom-[-20px] right-0 flex flex-wrap gap-1.5 z-30 max-w-[200px] justify-end">
                {serviceData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentService(index)}
                    className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
                      index === currentService ? "w-6 bg-accent" : "w-1.5 bg-zinc-800"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      <Bulb />
    </div>
  );
};

export default Services;