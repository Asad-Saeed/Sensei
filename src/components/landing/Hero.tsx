"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import LaserFlow from "./LaserFlow";
import MainHeading from "@/components/ui/MainHeading";
import CustomCursor from "@/components/ui/CustomCursor";
import SenseiText from "@/components/ui/SenseiText";

export default function Hero() {
  const t = useTranslations("Hero");
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] || "en";

  return (
    <section className="relative bg-black flex flex-col overflow-visible pt-[72px] sensei-cursor-scope">
      {/* Scoped custom cursor - only active over the Hero section on desktop */}
      <CustomCursor />
      {/* Laser Flow Animation - Anchored from bottom, attached to dashboard */}
      <div className="absolute bottom-0 right-0 w-full lg:w-1/2 h-[calc(100vh+70vh+72px)] pointer-events-none z-3">
        <LaserFlow
          horizontalBeamOffset={0.1}
          verticalBeamOffset={-0.22}
          color="#432CEF"
          wispDensity={2.0}
          flowSpeed={0.35}
          verticalSizing={25.0}
          horizontalSizing={12.0}
          fogIntensity={0.8}
          wispIntensity={8.0}
          flowStrength={0.7}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center max-w-7xl mx-auto px-8 w-full">
        <div className="max-w-5xl relative w-full py-20">
          {/* Subtitle - AI-EMPOWERED WORKFLOWS */}
          <div className="mb-6">
            <span className="text-[#FFFFFF] text-sm font-medium tracking-[0.12em] uppercase font-inter leading-normal">
              {t("subtitle")}
            </span>
          </div>

          {/* Main Title - Custom AI Solutions through Collaborative Intelligence. */}
          <MainHeading className="mb-8 text-left leading-[1.1] text-2xl! sm:text-3xl! md:text-4xl! lg:text-5xl! xl:text-6xl! font-normal!">
            {t("title")}
          </MainHeading>

          {/* Description - White text, proper line height */}
          <p className="text-base md:text-lg text-[#CDD7E1] mb-10 leading-[1.75] max-w-2xl font-inter font-normal">
            <SenseiText>{t("description")}</SenseiText>
          </p>

          {/* CTA Buttons - Proper spacing and styling */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="#"
              className="px-6 py-3 lg:px-8 lg:py-4 bg-linear-to-r from-[#4C34FF] to-[#201196] hover:from-[#5D45FF] hover:to-[#3021A6] text-white font-semibold rounded-lg transition-all shadow-sm shadow-[#4C34FF]/50 hover:shadow-[#4C34FF]/70 text-center font-inter text-xs sm:text-sm md:text-sm w-full sm:w-auto"
            >
              {t("exploreFeatures")}
            </Link>
            <Link
              href="#"
              className="px-6 py-3 lg:px-8 lg:py-4 border border-[#FFFFFF] hover:border-[#FFFFFF] text-white font-semibold rounded-lg transition-all backdrop-blur-sm bg-transparent hover:bg-white/5 text-center font-inter text-xs sm:text-sm md:text-sm w-full sm:w-auto"
            >
              {t("requestDemo")}
            </Link>
          </div>
        </div>
      </div>

      {/* Dashboard SVG - Bottom section, laser drops over it */}
      <div className="relative w-full pointer-events-none z-2">
        <div className="max-w-7xl mx-auto w-full">
          <div className="relative w-full h-[20vh] sm:h-[25vh] md:h-[30vh] lg:h-[50vh] xl:h-[50vh]">
            <Image
              src="/assets/svgs/dashboard.svg"
              alt="Dashboard preview"
              fill
              className="object-contain object-bottom w-full h-full"
              priority
            />
          </div>

          {/* Gradient overlay layer - darker at bottom, lighter at top (like footer) */}
          <div className="absolute inset-x-0 bottom-0 w-full h-[20vh] sm:h-[25vh] md:h-[30vh] lg:h-[60vh] xl:h-[70vh] bg-linear-to-t from-black via-black/60 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Background gradient overlay - subtle darkening on left */}
      <div className="absolute inset-0 bg-linear-to-r from-black via-black/98 to-transparent pointer-events-none z-0" />
    </section>
  );
}
