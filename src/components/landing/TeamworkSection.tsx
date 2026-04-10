"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MainHeading from "@/components/ui/MainHeading";
import { FiSend } from "react-icons/fi";
import FloatingCursors from "@/components/ui/FloatingCursors";
import { useState, useRef } from "react";
import { HiArrowRight } from "react-icons/hi";
import { motion } from "framer-motion";
import SenseiText from "@/components/ui/SenseiText";

export default function TeamworkSection() {
  const t = useTranslations("TeamworkSection");
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] || "en";

  const chatMessageIds = ["0", "1", "2", "3", "4"] as const;
  const [showAnalyzing, setShowAnalyzing] = useState(true);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative bg-black py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch bg-[#0E1012] rounded-lg overflow-hidden">
          {/* Chat Mock - Top on small, Left on large */}
          <div className="relative order-1 lg:order-1 w-full flex items-stretch justify-center bg-[#050608]">
            <div className="relative w-full rounded-xl overflow-hidden">
              {/* Subtle blurred white circular glow background layers - top center and bottom left, only inside chat card */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.12) 18%, rgba(255,255,255,0.04) 40%, transparent 70%), radial-gradient(circle at 0% 100%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 18%, rgba(255,255,255,0.03) 40%, transparent 70%)",
                  filter: "blur(4px)",
                }}
              />

              {/* Floating "Analyzing..." pill at the top center (desktop), visible for first 2 seconds */}
              {showAnalyzing && (
                <div className="hidden lg:flex absolute top-0 left-1/2 -translate-x-1/2 items-center justify-center gap-2 px-6 sm:px-8 py-2.5 bg-[#432CEF] rounded-b-2xl shadow-[0_16px_40px_rgba(0,0,0,0.8)] z-20">
                  {/* Processing Spinner Icon */}
                  <motion.svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="shrink-0"
                  >
                    {/* 8 radial lines creating a sun/asterisk pattern */}
                    {[...Array(8)].map((_, i) => {
                      const angle = i * 45 - 90; // Start from top, 8 lines at 45° intervals
                      const x1 = 8 + 3 * Math.cos((angle * Math.PI) / 180);
                      const y1 = 8 + 3 * Math.sin((angle * Math.PI) / 180);
                      const x2 = 8 + 6 * Math.cos((angle * Math.PI) / 180);
                      const y2 = 8 + 6 * Math.sin((angle * Math.PI) / 180);
                      return (
                        <line
                          key={i}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          opacity={0.8 + (i % 2) * 0.2} // Alternate opacity for visual effect
                        />
                      );
                    })}
                  </motion.svg>
                  <span className="text-[11px] sm:text-xs font-medium text-white font-inter">
                    {t("chat.statusPill")}
                  </span>
                </div>
              )}

              <div className="relative z-10">
                {/* Messages */}
                <div
                  ref={messagesContainerRef}
                  className="relative px-3 sm:px-4 md:px-5 pt-4 sm:pt-5 md:pt-6 lg:pt-12 pb-3 sm:pb-4 md:pb-5 space-y-4 sm:space-y-5 bg-transparent"
                >
                  {/* Floating Cursors - Figma-style collaborative cursors */}
                  <FloatingCursors containerRef={messagesContainerRef} />
                  {chatMessageIds.map((id) => {
                    const isSensei = id === "1" || id === "3";
                    const isSystemBadge =
                      id === "1" || id === "3" || id === "4";

                    const name = t(`chat.messages.${id}.name`);
                    const role = t(`chat.messages.${id}.role`);
                    const badge = isSystemBadge
                      ? t(`chat.messages.${id}.badge`)
                      : "";
                    const text = t(`chat.messages.${id}.text`);

                    // Deterministic color palette per message id for avatar and cursor badge
                    const avatarColorMap: Record<string, string> = {
                      "0": "#6366F1", // indigo
                      "1": "#F97316", // orange
                      "2": "#22C55E", // green
                      "3": "#2563EB", // blue
                      "4": "#EC4899", // pink
                    };
                    const badgeColorMap: Record<string, string> = {
                      "0": "#F97316",
                      "1": "#F97316",
                      "2": "#22C55E",
                      "3": "#2563EB",
                      "4": "#0EA5E9",
                    };
                    const avatarBg = avatarColorMap[id] || "#432CEF";
                    const badgeBg = badgeColorMap[id] || "#F97316";

                    return (
                      <div
                        key={id}
                        className={`flex gap-2 sm:gap-3 relative ${
                          isSensei ? "justify-start" : "justify-start"
                        }`}
                      >
                        {/* Avatar */}
                        <div className="shrink-0 mt-1">
                          <div
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-semibold text-white"
                            style={{
                              backgroundColor: avatarBg,
                              fontFamily: isSensei
                                ? 'var(--font-audiowide), "Audiowide", sans-serif'
                                : 'var(--font-inter), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                            }}
                          >
                            {name.charAt(0).toUpperCase()}
                          </div>
                        </div>

                        {/* Bubble */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 mb-1">
                            <span className="text-[11px] sm:text-xs font-medium text-white font-inter">
                              <SenseiText>{name}</SenseiText>
                            </span>
                            {/* Red badge for Michael's message (id "4") */}
                            {id === "4" && (
                              <span
                                className="inline-flex items-center px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-medium font-inter"
                                style={{
                                  backgroundColor: "#DC205F",
                                  color: "#FFFFFF",
                                }}
                              >
                                <SenseiText>{badge}</SenseiText>
                              </span>
                            )}
                          </div>

                          <div className="text-[11px] sm:text-xs md:text-[13px] leading-relaxed font-inter font-light text-white whitespace-pre-line">
                            <SenseiText>{text}</SenseiText>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Input bar - Figma style */}
                <div className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 flex items-center">
                  <div className="w-full rounded-full bg-[#111318] border border-[#262830] px-3.5 sm:px-4.5 py-2.5 sm:py-3 flex items-center gap-3 sm:gap-4 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                    {/* Left avatar using Audiowide font (matches Sensei branding) */}
                    <div
                      className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#432CEF] text-white text-sm"
                      style={{
                        fontFamily:
                          'var(--font-audiowide), "Audiowide", sans-serif',
                      }}
                    >
                      S
                    </div>

                    {/* Editable input */}
                    <input
                      type="text"
                      placeholder={t("chat.inputPlaceholder")}
                      className="flex-1 bg-transparent border-none outline-none text-[12px] sm:text-[13px] text-white placeholder:text-[#8C93A3] font-inter"
                    />

                    {/* Send button */}
                    <button
                      type="button"
                      className="shrink-0 inline-flex items-center justify-center rounded-full bg-[#432CEF] hover:bg-[#5A46FF] transition-colors w-8 h-8 sm:w-9 sm:h-9 shadow-[0_0_18px_rgba(67,44,239,0.65)]"
                    >
                      <FiSend className="text-white w-4 h-4 rotate-45" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Marketing Content - Bottom on small, Right on large */}
          <div className="relative order-2 lg:order-2 w-full flex items-center">
            <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10">
              {/* Small grey heading */}
              <div className="mb-3 sm:mb-4">
                <span className="text-[#CDD7E1] text-xs sm:text-sm font-medium tracking-wide uppercase font-inter">
                  {t("eyebrow")}
                </span>
              </div>

              {/* Large bold white heading */}
              <MainHeading
                as="h2"
                className="text-2xl! sm:text-3xl! md:text-4xl! lg:text-5xl! xl:text-6xl! font-normal! mb-4 sm:mb-5 md:mb-6"
              >
                {t("title")}
              </MainHeading>

              {/* Paragraph text */}
              <p className="text-[#CDD7E1] text-sm sm:text-base md:text-lg leading-[1.75] mb-6 sm:mb-7 md:mb-8 font-inter font-normal max-w-xl">
                <SenseiText>{t("description")}</SenseiText>
              </p>

              {/* Button */}
              <div className="w-fit">
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#1c1e20] border border-white/20 hover:border-white/30 hover:bg-[#2a2c2e] text-white font-medium rounded-lg transition-all text-xs sm:text-sm font-inter group"
                >
                  <span>{t("cta")}</span>
                  <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
