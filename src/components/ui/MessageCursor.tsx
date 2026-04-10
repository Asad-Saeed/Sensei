"use client";

import Image from "next/image";

type MessageCursorProps = {
  cursorType: "cursor1" | "cursor2";
  x: number;
  y: number;
};

export default function MessageCursor({
  cursorType,
  x,
  y,
}: MessageCursorProps) {
  return (
    <div
      className="absolute pointer-events-none z-50"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <Image
        src={
          cursorType === "cursor1"
            ? "/assets/svgs/Cursor1.svg"
            : "/assets/svgs/Cursor2.svg"
        }
        alt="Cursor"
        width={cursorType === "cursor1" ? 300 : 275}
        height={cursorType === "cursor1" ? 59 : 75}
        className="w-auto h-10 sm:h-12 md:h-14 lg:h-16"
      />
    </div>
  );
}
