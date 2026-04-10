"use client";

import { ReactNode } from "react";
import SenseiText from "./SenseiText";

interface MainHeadingProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export default function MainHeading({
  children,
  className = "",
  as: Component = "h1",
}: MainHeadingProps) {
  const baseClasses =
    "text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px] font-normal leading-[1.1] font-dm-serif text-[#FFFFFF]";

  // If children is a string, wrap it with SenseiText
  const content =
    typeof children === "string" ? (
      <SenseiText>{children}</SenseiText>
    ) : (
      children
    );

  return (
    <Component
      className={`${baseClasses} ${className}`}
      style={{ fontFamily: 'var(--font-dm-serif), "DM Serif Text", serif' }}
    >
      {content}
    </Component>
  );
}
