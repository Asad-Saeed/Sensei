"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import MainHeading from "@/components/ui/MainHeading";
import SenseiText from "@/components/ui/SenseiText";

export default function DiscoverSection() {
  const t = useTranslations("DiscoverSection");
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] || "en";

  return (
    <section className="relative bg-black  py-6 sm:py-8 md:py-10 lg:py-12 overflow-visible">
      {/* Content Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 w-full">
        <div className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[500px] bg-[#0E1012] rounded-lg overflow-hidden">
          {/* Background Layer - Visible on all screens */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden rounded-lg">
            <div className="relative w-full h-full">
              <Image
                src="/assets/svgs/descover-bg-layer.svg"
                alt="Background layer"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          {/* Mobile/Tablet Layout - Card structure (hidden on desktop) */}
          <div className="relative z-10 flex flex-col lg:hidden">
            {/* Dashboard Image Card - Top */}
            <div className="relative w-full aspect-4/3 sm:aspect-3/2 md:aspect-5/3 rounded-t-lg overflow-hidden">
              <Image
                src="/assets/svgs/discover-dashbaord-image.svg"
                alt="Discover dashboard"
                fill
                className="object-cover w-full h-full"
                priority
                sizes="100vw"
              />
            </div>

            {/* Content Card - Bottom */}
            <div className="bg-[#0E1012]/98 sm:bg-[#0E1012]/95 backdrop-blur-md sm:backdrop-blur-sm rounded-b-lg p-5 sm:p-6 border-x border-b border-white/20 sm:border-white/10 shadow-xl">
              {/* Main Title */}
              <MainHeading
                as="h2"
                className="text-2xl! sm:text-3xl! md:text-4xl! font-normal! mb-4 sm:mb-5 md:mb-6 text-white"
              >
                {t("title")}
              </MainHeading>

              {/* Description */}
              <p className="text-[#CDD7E1] text-sm sm:text-base md:text-lg leading-[1.75] mb-6 sm:mb-7 md:mb-8 font-inter font-normal">
                <SenseiText>{t("description")}</SenseiText>
              </p>

              {/* CTA Button */}
              <Link
                href="#"
                className="inline-block w-full sm:w-auto px-6 py-3 lg:px-8 lg:py-4 bg-linear-to-r from-[#4C34FF] to-[#201196] hover:from-[#5D45FF] hover:to-[#3021A6] text-white font-semibold rounded-lg transition-all shadow-sm shadow-[#4C34FF]/50 hover:shadow-[#4C34FF]/70 text-center font-inter text-xs sm:text-sm md:text-sm"
              >
                {t("cta")}
              </Link>
            </div>
          </div>

          {/* Desktop Layout - Original design (hidden on mobile/tablet) */}
          <div className="hidden lg:block absolute inset-0 w-full h-full">
            {/* Dashboard Image - Absolute bottom right */}
            <div className="absolute bottom-0 right-0 w-1/2 h-[700px] z-2 pointer-events-none">
              {/* Curve Layer */}
              <div className="absolute bottom-60 -left-30 z-1 pointer-events-none">
                <Image
                  src="/assets/svgs/discover-curve-layer.svg"
                  alt="Curve layer"
                  width={284}
                  height={247}
                  className="w-auto h-auto"
                  priority
                />
              </div>
              <div className="relative w-full h-full">
                <Image
                  src="/assets/svgs/discover-dashbaord-image.svg"
                  alt="Discover dashboard"
                  fill
                  className="object-contain object-bottom-right"
                  priority
                />
              </div>
            </div>

            {/* Content - Left Side, Bottom Aligned */}
            <div className="absolute bottom-0 left-0 z-10 w-2/5 pb-20 ml-6">
              {/* Main Title */}
              <MainHeading
                as="h2"
                className="text-5xl! xl:text-6xl! font-normal! mb-6 text-white"
              >
                {t("title")}
              </MainHeading>

              {/* Description */}
              <p className="text-[#CDD7E1] text-lg leading-[1.75] mb-8 font-inter font-normal max-w-xl">
                <SenseiText>{t("description")}</SenseiText>
              </p>

              {/* CTA Button */}
              <Link
                href="#"
                className="px-8 py-4 bg-linear-to-r from-[#4C34FF] to-[#201196] hover:from-[#5D45FF] hover:to-[#3021A6] text-white font-semibold rounded-lg transition-all shadow-sm shadow-[#4C34FF]/50 hover:shadow-[#4C34FF]/70 text-center font-inter text-sm"
              >
                {t("cta")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
