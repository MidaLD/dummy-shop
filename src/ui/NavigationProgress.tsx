import { useEffect, useState } from "react";
import { useNavigation } from "react-router";
import { motion, AnimatePresence } from "motion/react";

function NavigationProgress() {
  const { state } = useNavigation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (state === "loading") {
      const timer = setTimeout(() => setShow(true), 150);
      return () => clearTimeout(timer);
    }
    setShow(false);
  }, [state]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed top-0 left-0 right-0 z-[9999] h-0.5">
          <motion.div
            className="h-full bg-indigo-500"
            initial={{ width: "0%" }}
            animate={{ width: "85%" }}
            exit={{ width: "100%", opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}

export default NavigationProgress;
