import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../variants";

const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      custom={delay}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedItem = ({ children, className = "" }) => {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
