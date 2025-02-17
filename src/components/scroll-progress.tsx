"use client";
import React from "react";
import { motion, useScroll } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-ring"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgress;
