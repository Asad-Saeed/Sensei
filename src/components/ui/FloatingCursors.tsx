"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type FloatingCursor = {
  id: string;
  cursorType: "cursor1" | "cursor2";
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  duration: number;
};

type FloatingCursorsProps = {
  containerRef: React.RefObject<HTMLDivElement>;
};

export default function FloatingCursors({
  containerRef,
}: FloatingCursorsProps) {
  const [cursors, setCursors] = useState<FloatingCursor[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const getRandomPosition = (rect: DOMRect, padding: number) => {
      return {
        x: padding + Math.random() * (rect.width - padding * 2),
        y: padding + Math.random() * (rect.height - padding * 2),
      };
    };

    const initializeCursors = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const padding = 80;

      // Use exactly 2 cursors: one Cursor1 and one Cursor2 (no repetition)
      // Each cursor moves independently to random positions with different speeds
      const newCursors: FloatingCursor[] = [
        {
          id: "cursor-0",
          cursorType: "cursor1",
          x: getRandomPosition(rect, padding).x,
          y: getRandomPosition(rect, padding).y,
          targetX: getRandomPosition(rect, padding).x,
          targetY: getRandomPosition(rect, padding).y,
          duration: 1 + Math.random() * 3, // 1-4 seconds (random speed)
        },
        {
          id: "cursor-1",
          cursorType: "cursor2",
          x: getRandomPosition(rect, padding).x,
          y: getRandomPosition(rect, padding).y,
          targetX: getRandomPosition(rect, padding).x,
          targetY: getRandomPosition(rect, padding).y,
          duration: 1 + Math.random() * 3, // 1-4 seconds (random speed, different from cursor1)
        },
      ];

      setCursors(newCursors);
    };

    // Initialize on mount - use a small delay to ensure container is ready
    const initTimeout = setTimeout(() => {
      initializeCursors();
    }, 100);

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const padding = 80;

      setCursors((prevCursors) =>
        prevCursors.map((cursor) => {
          // Each cursor gets a random position independently
          const newPos = getRandomPosition(rect, padding);
          return {
            ...cursor,
            x: Math.min(cursor.x, rect.width - padding),
            y: Math.min(cursor.y, rect.height - padding),
            targetX: newPos.x,
            targetY: newPos.y,
          };
        })
      );
    };

    window.addEventListener("resize", handleResize);

    // Update individual cursor target - each cursor updates independently
    const updateCursorTarget = (cursorId: string) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const padding = 80;

      setCursors((prevCursors) =>
        prevCursors.map((cursor) => {
          if (cursor.id === cursorId) {
            // Each cursor moves to a random position with random speed
            const newPos = getRandomPosition(rect, padding);
            return {
              ...cursor,
              // Only update target - framer-motion will animate from current visual position
              targetX: newPos.x,
              targetY: newPos.y,
              duration: 1 + Math.random() * 3, // 1-4 seconds (random speed)
            };
          }
          return cursor;
        })
      );
    };

    // Set up independent update intervals for each cursor
    // Cursor 1 updates at different times than Cursor 2
    const cursor1FirstUpdate = setTimeout(() => {
      updateCursorTarget("cursor-0");
    }, 1000 + Math.random() * 2000); // 1-3 seconds

    const cursor2FirstUpdate = setTimeout(() => {
      updateCursorTarget("cursor-1");
    }, 1500 + Math.random() * 2000); // 1.5-3.5 seconds (different from cursor1)

    // Cursor 1 interval: 2-5 seconds (random)
    const cursor1Interval = setInterval(() => {
      updateCursorTarget("cursor-0");
    }, 2000 + Math.random() * 3000);

    // Cursor 2 interval: 2.5-5.5 seconds (random, different from cursor1)
    const cursor2Interval = setInterval(() => {
      updateCursorTarget("cursor-1");
    }, 2500 + Math.random() * 3000);

    return () => {
      clearTimeout(initTimeout);
      clearTimeout(cursor1FirstUpdate);
      clearTimeout(cursor2FirstUpdate);
      clearInterval(cursor1Interval);
      clearInterval(cursor2Interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef]);

  return (
    <>
      {cursors.map((cursor) => (
        <motion.div
          key={cursor.id}
          className="absolute pointer-events-none z-50"
          initial={{
            x: cursor.x,
            y: cursor.y,
            opacity: 0,
          }}
          animate={{
            x: cursor.targetX,
            y: cursor.targetY,
            opacity: 0.85,
          }}
          transition={{
            x: {
              duration: cursor.duration,
              ease: [0.33, 1, 0.68, 1],
            },
            y: {
              duration: cursor.duration,
              ease: [0.33, 1, 0.68, 1],
            },
            opacity: { duration: 0.5 }, // Fade in quickly
          }}
          style={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <Image
            src={
              cursor.cursorType === "cursor1"
                ? "/assets/svgs/Cursor1.svg"
                : "/assets/svgs/Cursor2.svg"
            }
            alt="Floating cursor"
            width={cursor.cursorType === "cursor1" ? 300 : 275}
            height={cursor.cursorType === "cursor1" ? 59 : 75}
            className="w-auto h-10 sm:h-12 md:h-14 lg:h-16"
            priority={false}
          />
        </motion.div>
      ))}
    </>
  );
}
