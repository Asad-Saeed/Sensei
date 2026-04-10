"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import MainHeading from "@/components/ui/MainHeading";
import { HiArrowRight } from "react-icons/hi";
import { FiSend } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";
import SenseiText from "@/components/ui/SenseiText";

export default function DataSecuritySection() {
  const t = useTranslations("DataSecuritySection");
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] || "en";

  // Ref for viewport detection
  const uploadSectionRef = useRef(null);
  const isInView = useInView(uploadSectionRef, {
    once: true,
    margin: "-100px",
  });

  const frameCards = [
    {
      id: "frame1",
      imagePath: "/assets/svgs/Frame1card.svg",
    },
    {
      id: "frame2",
      imagePath: "/assets/svgs/Frame2card.svg",
    },
    {
      id: "frame3",
      imagePath: "/assets/svgs/Frame3card.svg",
    },
  ];

  return (
    <section className="relative bg-black py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch bg-[#0E1012] rounded-lg sm:rounded-lg overflow-hidden">
          {/* Interactive UI - Top on small, Left on large */}
          <div className="relative order-1 lg:order-1 w-full bg-[#050608] px-4 sm:px-5 md:px-6 lg:px-8 pt-4 sm:pt-5 md:pt-6 lg:pt-8 min-h-[700px] flex flex-col overflow-hidden">
            {/* White circular gradient at top left */}
            <div
              className="absolute top-0 left-0 w-[400px] sm:w-[500px] md:w-[600px] h-[400px] sm:h-[500px] md:h-[600px] pointer-events-none z-0"
              style={{
                background:
                  "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.03) 40%, transparent 70%)",
                filter: "blur(4px)",
              }}
            />

            {/* File Upload Section */}
            <div ref={uploadSectionRef} className="relative mb-3 sm:mb-4 z-10">
              {/* Upload Area - Full Width */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.5, delay: 0.6 }}
                className="relative w-full h-[150px] sm:h-[180px] lg:h-[200px] rounded-lg border-[3px] border-dashed border-white/20 bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center gap-2 overflow-hidden"
              >
                {/* Frame Cards Absolutely Positioned Over Drop Area */}
                {frameCards.map((card, index) => {
                  // Animation directions: Card 1 from left, Card 2 from top, Card 3 from bottom
                  const animationDirections = [
                    { x: -200, y: 0 }, // Card 1: from left
                    { x: 0, y: -150 }, // Card 2: from top
                    { x: 0, y: 200 }, // Card 3: from bottom
                  ];
                  // Positions for cards overlapping
                  const cardPositions = [
                    { top: "0%", left: "1%" },
                    { top: "20%", left: "2%" },
                    { top: "55%", left: "5%" },
                  ];
                  // Rotation angles for each card
                  const rotations = [0, -2, 0]; // Card 1: 0°, Card 2: -10°, Card 3: 0°

                  return (
                    <motion.div
                      key={card.id}
                      initial={{
                        opacity: 0,
                        x: animationDirections[index].x,
                        y: animationDirections[index].y,
                        rotate: rotations[index],
                      }}
                      animate={
                        isInView
                          ? {
                              opacity: 1,
                              x: 0,
                              y: 0,
                              rotate: rotations[index],
                            }
                          : {
                              opacity: 0,
                              x: animationDirections[index].x,
                              y: animationDirections[index].y,
                              rotate: rotations[index],
                            }
                      }
                      transition={{
                        duration: 1.2,
                        delay: index * 0.3,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="absolute"
                      style={{
                        zIndex: frameCards.length - index + 1,
                        top: cardPositions[index].top,
                        left: cardPositions[index].left,
                      }}
                    >
                      <Image
                        src={card.imagePath}
                        alt={`Frame card ${index + 1}`}
                        width={index === 0 ? 278 : index === 1 ? 282 : 279}
                        height={index === 0 ? 76 : index === 1 ? 98 : 80}
                        className="w-[140px] sm:w-[160px] md:w-[180px] lg:w-[240px] xl:w-[280px] h-auto"
                      />
                    </motion.div>
                  );
                })}

                {/* Upload Icon - Behind Cards */}
                <div className="relative z-0 flex items-center justify-center">
                  <Image
                    src="/assets/svgs/upload-ion.svg"
                    alt="Upload"
                    width={79}
                    height={82}
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
                  />
                </div>
              </motion.div>
            </div>

            {/* Success Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="mb-4 sm:mb-5 z-10 relative flex justify-center"
            >
              {/* Green gradient background glow */}
              <div
                className="absolute inset-0 rounded-full opacity-40 blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(34, 197, 94, 0.5) 0%, rgba(34, 197, 94, 0.2) 50%, transparent 100%)",
                  transform: "scale(2)",
                }}
              />
              <div className="relative inline-flex items-center gap-2.5 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-lg shadow-lg">
                {/* Circular icon container with green checkmark */}
                <div className="w-5 h-5 rounded-full border-2 border-[#22C55E] flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-[#22C55E]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <span className="text-[#22C55E] text-[10px] sm:text-[11px] font-semibold font-inter">
                  {t("successBadge")}
                </span>
              </div>
            </motion.div>

            {/* Chat Messages */}
            <div className="flex-1 space-y-3 sm:space-y-4 mb-4 sm:mb-5 z-10">
              {/* User Message */}
              <div className="flex">
                {/* Message Bubble with Avatar and Send Icon inside */}
                <div className="flex-1 min-w-0 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 shadow-sm overflow-hidden relative">
                  {/* Short left border */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 sm:h-10 bg-white"></div>
                  <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5">
                    {/* Avatar */}
                    <div className="shrink-0">
                      <Image
                        src="/assets/svgs/men-icon.svg"
                        alt="User"
                        width={38}
                        height={38}
                        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                      />
                    </div>
                    {/* Message Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[11px] sm:text-xs md:text-[13px] leading-relaxed font-inter font-light">
                        {t("chat.userMessage")}
                      </p>
                    </div>
                    {/* Send Icon */}
                    <div className="shrink-0">
                      <FiSend className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7460FF] rotate-45" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance Table - Positioned at bottom */}
            <div className="relative z-10 mt-auto">
              <div className="relative">
                {/* Glass container wrapping header and table */}
                <div className="min-w-full bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-lg overflow-hidden">
                  {/* Table Header with S Avatar and Message */}
                  <div className="px-4 pt-4 sm:pt-5 pb-3 sm:pb-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="shrink-0">
                        <Image
                          src="/assets/svgs/s-icon.svg"
                          alt="Sensei"
                          width={50}
                          height={50}
                          className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs sm:text-sm md:text-sm leading-relaxed font-inter font-light">
                          {t("chat.assistantMessage.line1")}
                          <br />
                          {t("chat.assistantMessage.line2")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                          <th className="text-left py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-[11px] text-white/70 font-normal font-inter whitespace-nowrap">
                            {t("table.headers.contractName")}
                          </th>
                          <th className="text-left py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-[11px] text-white/70 font-normal font-inter whitespace-nowrap">
                            {t("table.headers.vendor")}
                          </th>
                          <th className="text-left py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-[11px] text-white/70 font-normal font-inter whitespace-nowrap">
                            {t("table.headers.riskArea")}
                          </th>
                          <th className="text-left py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-[11px] text-white/70 font-normal font-inter whitespace-nowrap">
                            {t("table.headers.issueSummary")}
                          </th>
                          <th className="text-left py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-[11px] text-white/70 font-normal font-inter whitespace-nowrap">
                            {t("table.headers.score")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {t.raw("table.rows").map((row: any, index: number) => (
                          <tr
                            key={index}
                            className="border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors"
                          >
                            <td className="py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-[11px] text-white font-light font-inter">
                              {row.contractName}
                            </td>
                            <td className="py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-[11px] text-white font-light font-inter">
                              {row.vendor}
                            </td>
                            <td className="py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-[11px] text-white font-light font-inter">
                              {row.riskArea}
                            </td>
                            <td className="py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-[11px] text-white font-light font-inter">
                              {row.issueSummary}
                            </td>
                            <td className="py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-[11px] text-white font-light font-inter">
                              <span className="inline-flex items-center gap-1 font-light">
                                <span className="text-[#22C55E] text-[10px] sm:text-[11px] font-light">
                                  ▲
                                </span>
                                <span className="font-light">{row.score}</span>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* Bottom Shadow Overlay - Over the table at bottom */}
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20">
                  <div className="relative w-full h-[50px] sm:h-[60px] md:h-[75px]">
                    <Image
                      src="/assets/svgs/data-security-bottom-shad.svg"
                      alt=""
                      fill
                      className="object-cover object-top"
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                    />
                  </div>
                  {/* Black frame at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-[#0E1012] z-30" />
                </div>
              </div>
            </div>
          </div>

          {/* Marketing Content - Bottom on small, Right on large */}
          <div className="relative order-2 lg:order-2 w-full flex items-center">
            <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-5 sm:py-6 md:py-8 lg:py-10">
              {/* Small grey heading */}
              <div className="mb-2 sm:mb-3 md:mb-4">
                <span className="text-[#CDD7E1] text-[10px] sm:text-xs md:text-sm font-medium tracking-wide uppercase font-inter">
                  {t("eyebrow")}
                </span>
              </div>

              {/* Large bold white heading */}
              <MainHeading
                as="h2"
                className="text-2xl! sm:text-3xl! md:text-4xl! lg:text-5xl! xl:text-6xl! font-normal! mb-3 sm:mb-4 md:mb-5 lg:mb-6"
              >
                {t("title")}
              </MainHeading>

              {/* Paragraph text */}
              <p className="text-[#CDD7E1] text-xs sm:text-sm md:text-base lg:text-lg leading-[1.75] mb-5 sm:mb-6 md:mb-7 lg:mb-8 font-inter font-normal max-w-xl">
                <SenseiText>{t("description")}</SenseiText>
              </p>

              {/* Button */}
              <div className="w-fit">
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#1c1e20] border border-white/20 hover:border-white/30 hover:bg-[#2a2c2e] text-white font-medium rounded-lg transition-all text-[11px] sm:text-xs md:text-sm font-inter group"
                >
                  <span>{t("cta")}</span>
                  <HiArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
