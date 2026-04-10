"use client";

import { useState, ReactNode } from "react";
import { HiChevronRight, HiChevronDown } from "react-icons/hi";
import SenseiText from "./SenseiText";

interface AccordionItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

interface AccordionProps {
  items: AccordionItemProps[];
  className?: string;
}

export function AccordionItem({
  question,
  answer,
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-white/10 bg-[#0E1012] rounded-lg p-4 sm:p-5 md:p-6 mb-4 last:mb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group"
      >
        <span
          className="text-white font-bold text-sm sm:text-base md:text-lg font-dm-serif pr-4"
          style={{ fontFamily: 'var(--font-dm-serif), "DM Serif Text", serif' }}
        >
          <SenseiText>{question}</SenseiText>
        </span>
        <div className="shrink-0">
          {isOpen ? (
            <HiChevronDown className="w-5 h-5 text-white transition-transform" />
          ) : (
            <HiChevronRight className="w-5 h-5 text-white transition-transform group-hover:translate-x-0.5" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="pt-4 mt-4 border-white/10">
          <p className="text-[#9FA6AD] text-sm sm:text-base leading-relaxed font-inter">
            <SenseiText>{answer}</SenseiText>
          </p>
        </div>
      )}
    </div>
  );
}

export default function Accordion({ items, className = "" }: AccordionProps) {
  return (
    <div className={`w-full ${className}`}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          defaultOpen={item.defaultOpen}
        />
      ))}
    </div>
  );
}
