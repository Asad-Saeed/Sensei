"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import MainHeading from "@/components/ui/MainHeading";
import { HiArrowRight } from "react-icons/hi";
import SenseiText from "@/components/ui/SenseiText";

export default function ExpertsNetworkSection() {
  const t = useTranslations("ExpertsNetworkSection");
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] || "en";

  // Expert roles/tags data with translations
  const expertTags = [
    t("tags.legalAIConsultant"),
    t("tags.dataCurator"),
    t("tags.regulatoryOpsExpert"),
    t("tags.documentArchitect"),
    t("tags.contextEngineeringAdvisor"),
    t("tags.riskAuditor"),
    t("tags.legalOpsConsultant"),
    t("tags.tuningExpert"),
    t("tags.workflowStrategist"),
    t("tags.llmAdvisor"),
    t("tags.governanceSpecialist"),
    t("tags.promptArchitect"),
  ];

  // Split tags into two groups for dual carousel
  const tagsGroup1 = expertTags.slice(0, Math.ceil(expertTags.length / 2));
  const tagsGroup2 = expertTags.slice(Math.ceil(expertTags.length / 2));

  return (
    <section className="relative bg-black py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch rounded-lg overflow-hidden">
          {/* Image with Horizontal Tag Carousels - Top on small, Right on large */}
          <div className="relative order-1 lg:order-2 w-full aspect-4/3 sm:aspect-3/2 md:aspect-5/3 lg:aspect-auto lg:min-h-[700px]">
            {/* Background Image */}
            <Image
              src="/assets/svgs/experts-network-image.svg"
              alt="Experts Network"
              fill
              className="object-contain z-0"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Horizontal Tag Carousels - Overlay on image */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {/* Top Section - Two carousels */}
              <div className="absolute top-[16%] sm:top-[16%] md:top-[19%] lg:top-[22%] left-[25%] sm:left-[28%] md:left-[19%] lg:left-[20%] right-0 flex flex-col gap-1 md:gap-4 lg:gap-5">
                {/* Top Carousel 1 - Moves Left */}
                <div className="overflow-hidden px-2 sm:px-3 md:px-4">
                  <motion.div
                    className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-5"
                    animate={{
                      x: ["0%", "-50%"],
                    }}
                    transition={{
                      duration: 25,
                      repeat: Infinity,
                      repeatType: "loop",
                      repeatDelay: 0,
                      delay: 0,
                      ease: "linear",
                    }}
                  >
                    {[...tagsGroup1, ...tagsGroup1].map((tag, index) => (
                      <div
                        key={`top1-${index}`}
                        className="shrink-0 bg-white/10 backdrop-blur-md rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 shadow-lg"
                      >
                        <span className="text-white text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-inter font-light whitespace-nowrap">
                          {tag}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Top Carousel 2 - Moves Right */}
                <div className="overflow-hidden px-2 sm:px-3 md:px-4">
                  <motion.div
                    className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-5"
                    animate={{
                      x: ["-50%", "0%"],
                    }}
                    transition={{
                      duration: 22,
                      repeat: Infinity,
                      repeatType: "loop",
                      repeatDelay: 0,
                      delay: 0,
                      ease: "linear",
                    }}
                  >
                    {[...tagsGroup2, ...tagsGroup2].map((tag, index) => (
                      <div
                        key={`top2-${index}`}
                        className="shrink-0 bg-white/10 backdrop-blur-md rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 shadow-lg"
                      >
                        <span className="text-white text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-inter font-light whitespace-nowrap">
                          {tag}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Bottom Section - Two carousels */}
              <div className="absolute bottom-[16%] sm:bottom-[16%] md:bottom-[19%] lg:bottom-[22%] left-0 right-[25%] sm:right-[28%] md:right-[19%] lg:right-[20%] flex flex-col gap-1 md:gap-4 lg:gap-5">
                {/* Bottom Carousel 1 - Moves Left */}
                <div className="overflow-hidden px-2 sm:px-3 md:px-4">
                  <motion.div
                    className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-5"
                    animate={{
                      x: ["0%", "-50%"],
                    }}
                    transition={{
                      duration: 28,
                      repeat: Infinity,
                      repeatType: "loop",
                      repeatDelay: 0,
                      delay: 0,
                      ease: "linear",
                    }}
                  >
                    {[...tagsGroup1, ...tagsGroup1].map((tag, index) => (
                      <div
                        key={`bottom1-${index}`}
                        className="shrink-0 bg-white/10 backdrop-blur-md rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 shadow-lg"
                      >
                        <span className="text-white text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-inter font-light whitespace-nowrap">
                          {tag}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Bottom Carousel 2 - Moves Right */}
                <div className="overflow-hidden px-2 sm:px-3 md:px-4">
                  <motion.div
                    className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-5"
                    animate={{
                      x: ["-50%", "0%"],
                    }}
                    transition={{
                      duration: 24,
                      repeat: Infinity,
                      repeatType: "loop",
                      repeatDelay: 0,
                      delay: 0,
                      ease: "linear",
                    }}
                  >
                    {[...tagsGroup2, ...tagsGroup2].map((tag, index) => (
                      <div
                        key={`bottom2-${index}`}
                        className="shrink-0 bg-white/10 backdrop-blur-md rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 shadow-lg"
                      >
                        <span className="text-white text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-inter font-light whitespace-nowrap">
                          {tag}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Marketing Content - Bottom on small, Left on large */}
          <div className="relative order-2 lg:order-1 w-full flex items-center bg-[#0E1012]">
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
