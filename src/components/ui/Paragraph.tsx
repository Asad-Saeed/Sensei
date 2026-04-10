"use client";

import { ReactNode } from "react";
import SenseiText from "./SenseiText";

interface ParagraphProps {
  children: ReactNode;
  className?: string;
  as?: "p" | "div" | "span";
}

export default function Paragraph({
  children,
  className = "",
  as: Component = "p",
}: ParagraphProps) {
  const baseClasses =
    "text-base md:text-lg font-normal leading-relaxed font-inter text-[#CDD7E1]";

  // If children is a string, wrap it with SenseiText
  const content =
    typeof children === "string" ? (
      <SenseiText>{children}</SenseiText>
    ) : (
      children
    );

  return (
    <Component className={`${baseClasses} ${className}`}>{content}</Component>
  );
}
