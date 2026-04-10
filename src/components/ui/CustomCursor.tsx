"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

type CustomCursorProps = {
  /** Optional label shown next to the cursor (used in Teamwork chat badges) */
  label?: string;
  /** Control visibility for scoped areas; defaults to always on */
  isActive?: boolean;
  /** Optional background color for the label pill (e.g. per-user badge color) */
  labelColor?: string;
};

/**
 * CustomCursor
 *
 * Animated cursor used across the marketing site.
 * - Follows the mouse with a smooth spring animation
 * - Shows a soft neon ring plus a subtle inner dot
 * - Can optionally show a small pill label next to the cursor
 * - Visibility can be scoped via the `isActive` prop
 */
export default function CustomCursor({
  label,
  isActive = true,
  labelColor,
}: CustomCursorProps) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth follow with spring for a premium feel
  const springConfig = { stiffness: 350, damping: 30, mass: 0.7 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  const baseAnimate = isActive
    ? { scale: 1, opacity: 1 }
    : { scale: 0.5, opacity: 0 };

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="sensei-cursor pointer-events-none fixed top-0 left-0 z-9999 hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={baseAnimate}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
      >
        <div className="relative w-10 h-10 rounded-full border border-[#7460FF]/70 bg-[#432CEF]/10 shadow-[0_0_25px_rgba(67,44,239,0.65)] backdrop-blur-sm mix-blend-screen">
          <div className="absolute inset-0 rounded-full bg-radial from-[#FFFFFF] via-transparent to-transparent opacity-20" />
        </div>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="sensei-cursor-dot pointer-events-none fixed top-0 left-0 z-9999 hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={baseAnimate}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.03,
        }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-[#E4E6FF] shadow-[0_0_12px_rgba(228,230,255,0.95)]" />
      </motion.div>

      {/* Optional label that follows the cursor (used for chat badges) */}
      {label && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-9999 hidden lg:block"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "130%",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.02,
          }}
        >
          <div
            className="rounded-sm border border-white/20 px-3.5 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.8)]"
            style={{
              backgroundColor: labelColor || "#F25532",
            }}
          >
            <span className="text-[11px] font-medium text-white font-inter whitespace-nowrap">
              {label}
            </span>
          </div>
        </motion.div>
      )}
    </>
  );
}
