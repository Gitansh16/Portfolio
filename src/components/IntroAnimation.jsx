import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useMemo } from "react";

export default function IntroAnimation({ onFinish }) {
  const greetings = useMemo(
    () => [
      "Namaste Developer...",
      "Coffee First...",
      "Code Later...",
      "Brewing Ideas...",
      "Ctrl + Coffee + Create...",
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (index < greetings.length - 1) {
      const id = setTimeout(() => {
        setIndex((i) => i + 1);
      }, 1100);

      return () => clearTimeout(id);
    } else {
      const t = setTimeout(() => {
        setVisible(false);
      }, 1200);

      return () => clearTimeout(t);
    }
  }, [index, greetings.length]);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white overflow-hidden"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={index}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-center px-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
              }}
            >
              {greetings[index]}
            </motion.h1>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}