"use client";

import { ReactNode } from "react";

interface SenseiTextProps {
  children: string;
  className?: string;
}

export default function SenseiText({
  children,
  className = "",
}: SenseiTextProps) {
  // Regular expression to match "Sensei" or "SENSEI" (case-insensitive, whole word)
  const senseiRegex = /\b(Sensei|SENSEI)\b/gi;

  // Split the text by the regex while keeping the matches
  const parts: (string | ReactNode)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = senseiRegex.exec(children)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(children.slice(lastIndex, match.index));
    }

    // Add the matched "Sensei" with Audiowide font
    parts.push(
      <span
        key={match.index}
        className="font-audiowide"
        style={{
          fontFamily: "var(--font-audiowide), Audiowide, sans-serif",
        }}
      >
        {match[0]}
      </span>,
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text after the last match
  if (lastIndex < children.length) {
    parts.push(children.slice(lastIndex));
  }

  // If no matches found, return original text
  if (parts.length === 0) {
    return <span className={className}>{children}</span>;
  }

  return <span className={className}>{parts}</span>;
}
