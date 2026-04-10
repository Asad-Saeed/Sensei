"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MainHeading from "@/components/ui/MainHeading";
import { HiArrowRight } from "react-icons/hi";
import AIModelsDiagram from "./AIModelsDiagram";
import SenseiText from "@/components/ui/SenseiText";

export default function CustomAIModelsSection() {
  const t = useTranslations("CustomAIModelsSection");
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] || "en";

  return (
    <section className="relative bg-black py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch bg-[#0E1012] rounded-lg overflow-hidden">
          {/* Animated Diagram - Top on small, Right on large */}
          <div className="relative order-1 lg:order-2 w-full bg-[#050608] rounded-xl overflow-hidden">
            <AIModelsDiagram />
          </div>

          {/* Marketing Content - Bottom on small, Left on large */}
          <div className="relative order-2 lg:order-1 w-full flex items-center">
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
