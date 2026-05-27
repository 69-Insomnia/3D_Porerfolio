// Fade In variants
export const fadeIn = (direction, delay) => {
  return {
    hidden: {
      y: direction === "up" ? 80 : direction === "down" ? -80 : 0,
      opacity: 0,
      x: direction === "left" ? 80 : direction === "right" ? -80 : 0,
      transition: {
        type: "tween",
        duration: 1.5,
        delay: delay,
        ease: [0.25, 0.6, 0.3, 0.8],
      },
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 1.4,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

// 3D Flip animation
export const flip3D = (delay = 0) => {
  return {
    hidden: {
      rotateY: 90,
      opacity: 0,
    },
    show: {
      rotateY: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.8,
        delay,
        stiffness: 100,
        damping: 15,
      },
    },
  };
};

// 3D Rotate animation
export const rotate3D = (delay = 0) => {
  return {
    hidden: {
      rotateX: 90,
      rotateY: 45,
      opacity: 0,
      scale: 0.8,
    },
    show: {
      rotateX: 0,
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        duration: 1,
        delay,
        stiffness: 80,
        damping: 20,
      },
    },
  };
};

// Scale + Rotate animation
export const scaleRotate = (delay = 0) => {
  return {
    hidden: {
      scale: 0,
      rotate: -180,
      opacity: 0,
    },
    show: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.8,
        delay,
        stiffness: 100,
      },
    },
  };
};

// Bounce in animation
export const bounceIn = (direction = "up", delay = 0) => {
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.8,
        delay,
        bounce: 0.4,
      },
    },
  };
};

// Container for staggered animations
export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Child item for stagger
export const itemVariants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Text animation - character by character
export const textVariants = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: {
      delay: i * 0.02,
      duration: 0.3,
    },
  }),
};

// Slide in from side
export const slideInVariants = (direction = "left", delay = 0) => {
  const distance = 100;
  return {
    hidden: {
      x: direction === "left" ? -distance : direction === "right" ? distance : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.8,
        delay,
        ease: "easeOut",
      },
    },
  };
};

// Hover effect for cards
export const cardHoverVariants = {
  initial: { scale: 1, y: 0, rotateX: 0 },
  whileHover: {
    scale: 1.05,
    y: -8,
    rotateX: 5,
    transition: { duration: 0.3 },
  },
  whileTap: { scale: 0.98 },
};

// Glow animation
export const glowVariants = (delay = 0) => {
  return {
    hidden: {
      opacity: 0,
      boxShadow: "0 0 0px rgba(241, 48, 36, 0)",
    },
    show: {
      opacity: 1,
      boxShadow: "0 0 20px rgba(241, 48, 36, 0.8)",
      transition: {
        duration: 0.8,
        delay,
        ease: "easeOut",
      },
    },
  };
};
