import { Variants } from "framer-motion";

export const fadeIn = (direction: "up" | "down" | "left" | "right" = "up", delay: number = 0): Variants => {
  return {
    hidden: {
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150,
        delay,
        duration: 0.6
      }
    }
  };
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
      ease: "easeInOut"
    }
  }
};

export const textVariant = (delay: number = 0): Variants => {
  return {
    hidden: {
      y: 30,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120,
        delay
      }
    }
  };
};

export const slideIn = (direction: "up" | "down" | "left" | "right", delay: number = 0, duration: number = 0.75): Variants => {
  return {
    hidden: {
      y: direction === "up" ? 120 : direction === "down" ? -120 : 0,
      x: direction === "left" ? 120 : direction === "right" ? -120 : 0,
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 130,
        delay,
        duration,
        ease: "easeOut"
      }
    }
  };
};

export const scaleIn = (delay: number = 0): Variants => {
  return {
    hidden: {
      scale: 0.7,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 140,
        delay,
        ease: "easeOut"
      }
    }
  };
};

export const cardHoverVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.08,
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export const imageHoverVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.15, transition: { duration: 0.5, ease: "easeOut" } }
};

export const rubikRotate = (delay: number = 0): Variants => {
  return {
    hidden: { opacity: 0, rotateY: 90, scale: 0.5 },
    visible: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 120,
        delay
      }
    }
  };
};

export const glitchEffect: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 0.1,
      ease: "easeInOut"
    }
  }
};

export const morphEffect = (delay: number = 0): Variants => {
  return {
    hidden: { opacity: 0, scale: 0.8, borderRadius: "50%" },
    visible: {
      opacity: 1,
      scale: 1,
      borderRadius: "5%",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        delay
      }
    }
  };
};

export const cinematicReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
      staggerChildren: 0.2
    }
  }
};

export const neonPulse: Variants = {
  initial: { scale: 1, boxShadow: "0px 0px 10px rgba(0,255,255,0.2)" },
  animate: {
    scale: [1, 1.05, 1],
    boxShadow: [
      "0px 0px 10px rgba(0,255,255,0.5)",
      "0px 0px 20px rgba(0,255,255,0.8)",
      "0px 0px 10px rgba(0,255,255,0.5)"
    ],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
  }
};
