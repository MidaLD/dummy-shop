import { motion } from "motion/react";

function CategoryBackdrop() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 z-10 bg-black/20"
    />
  );
}

export default CategoryBackdrop;
