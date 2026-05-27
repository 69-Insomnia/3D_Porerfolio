import React, { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

// icons
import {
  HiHome,
  HiUser,
  HiViewColumns,
  HiRectangleGroup,
  HiChatBubbleBottomCenterText,
  HiEnvelope,
} from "react-icons/hi2";

// nav data
export const navData = [
  { name: "home", path: "/", Icon: HiHome },
  { name: "about", path: "/about", Icon: HiUser },
  { name: "services", path: "/services", Icon: HiRectangleGroup },
  { name: "work", path: "/work", Icon: HiViewColumns },
  { name: "testimonials", path: "/testimonials", Icon: HiChatBubbleBottomCenterText },
  { name: "contact", path: "/contact", Icon: HiEnvelope },
];

const Nav = () => {
  const pathname = usePathname();
  const navDockRef = useRef(null);

  // --- Fluid 3D Holographic Parallax ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-400, 400], [22, -22]);
  const rotateY = useTransform(mouseX, [-400, 400], [-22, 22]);
  const shiftX = useTransform(mouseX, [-400, 400], [-15, 15]);
  const shiftY = useTransform(mouseY, [-400, 400], [-15, 15]);

  const springConfig = { damping: 18, stiffness: 120, mass: 0.5 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);
  const smoothShiftX = useSpring(shiftX, springConfig);
  const smoothShiftY = useSpring(shiftY, springConfig);

  const handleMouseMove = (e) => {
    if (!navDockRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = navDockRef.current.getBoundingClientRect();

    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <nav 
      ref={navDockRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col items-center xl:justify-center fixed h-max bottom-0 mt-auto xl:right-[3%] z-50 top-0 w-full xl:w-20 xl:max-w-md xl:h-screen select-none overflow-visible"
      style={{ perspective: 1000 }}
    >
      {/* HOLOGRAPHIC CYBERPUNK CHASSIS */}
      <motion.div 
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          x: smoothShiftX,
          y: smoothShiftY,
          transformStyle: "preserve-3d",
          boxShadow: `
            0 1px 0 rgba(255,255,255,0.15) inset,
            0 1px 1px rgba(0,0,0,0.8),
            0 4px 10px rgba(0,0,0,0.9),
            0 25px 50px rgba(0, 0, 0, 0.85)
          `
        }}
        className="flex w-full xl:flex-col items-center justify-between xl:justify-center gap-y-6 px-6 md:px-36 xl:px-3 h-[84px] xl:h-max py-6 bg-gradient-to-b from-[#14151f]/90 via-[#0d0e15]/95 to-[#050609]/98 border border-white/[0.06] backdrop-blur-xl xl:rounded-[28px] relative will-change-transform group"
      >
        {/* Rear Deep Plasma Ambience Field */}
        <div className="absolute -inset-2 xl:rounded-[32px] bg-gradient-to-b from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl" />

        {navData.map((link, i) => {
          const isActive = link.path === pathname;
          return (
            <Link
              href={link.path}
              key={i}
              className="relative flex items-center group/item"
              style={{ transformStyle: "preserve-3d" }}
            >
              
              {/* INTERACTIVE GLOWING TOOLTIP TAG */}
              <div
                role="tooltip"
                className="absolute pr-16 right-0 hidden xl:group-hover/item:flex"
                style={{ 
                  transformStyle: "preserve-3d",
                  translateZ: 80 // Max depth offset projection
                }}
              >
                <motion.div 
                  initial={{ opacity: 0, x: 20, rotateY: -15 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  className="bg-gradient-to-r from-accent to-[#e11d48] text-white relative flex items-center px-4 py-2 rounded-xl font-sans tracking-widest border border-white/20 shadow-[0_10px_25px_rgba(244,63,94,0.4)]"
                  style={{
                    boxShadow: "0 4px 0 #9f1239, 0 12px 25px rgba(244,63,94,0.3)"
                  }}
                >
                  <div className="text-[11px] leading-none font-black uppercase text-white drop-shadow-md">
                    {link.name}
                  </div>

                  {/* Laser Polygon Pointer Arrow */}
                  <div
                    className="border-solid border-l-accent border-l-[8px] border-y-transparent border-y-[6px] border-r-0 absolute -right-2 drop-shadow-[2px_2px_0_#9f1239]"
                    aria-hidden
                  />
                </motion.div>
              </div>

              {/* CYBERNETIC 3D BUTTON CELL */}
              <motion.div
                whileHover={{ 
                  scale: 1.15,
                  translateZ: 45,
                  transition: { type: "spring", stiffness: 500, damping: 12 }
                }}
                whileTap={{ scale: 0.92, translateZ: -10 }}
                className={`w-12 h-12 flex items-center justify-center rounded-2xl border transition-all duration-300 will-change-transform relative ${
                  isActive 
                    ? "bg-gradient-to-b from-accent/20 to-accent/5 border-accent/50 text-accent shadow-[inset_0_0_12px_rgba(244,63,94,0.3)]" 
                    : "bg-white/[0.02] border-white/[0.05] text-white/50 hover:border-white/20 hover:text-white"
                }`}
                style={{ 
                  transformStyle: "preserve-3d",
                  translateZ: isActive ? 30 : 15,
                  boxShadow: isActive 
                    ? "0 2px 0 #9f1239, 0 4px 12px rgba(244,63,94,0.5), 0 12px 20px rgba(0,0,0,0.5)" 
                    : "0 2px 0 #08090d, 0 4px 8px rgba(0,0,0,0.4)"
                }}
              >
                {/* Active Inner Digital Indicator Light */}
                {isActive && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent rounded-full animate-pulse shadow-[0_0_8px_#f43f5e]" />
                )}

                {/* Elevated Icon Graphic Face */}
                <div 
                  style={{ 
                    translateZ: 15,
                    filter: isActive ? "drop-shadow(0 0 8px rgba(244,63,94,0.8))" : "drop-shadow(0 3px 4px rgba(0,0,0,0.4))"
                  }}
                  className="text-xl sm:text-2xl xl:text-lg"
                >
                  <link.Icon aria-hidden />
                </div>
              </motion.div>

            </Link>
          );
        })}
      </motion.div>
    </nav>
  );
};

export default Nav;