"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import SenseiText from "@/components/ui/SenseiText";

export default function Footer() {
  const t = useTranslations("Footer");
  const navT = useTranslations("Navigation");
  const commonT = useTranslations("Common");
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] || "en";

  return (
    <footer className="relative bg-black overflow-hidden border-t border-white/18">
      {/* Background SVG Layer - gradient from bottom to top as in Figma */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src="/assets/svgs/footer-layer.svg"
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: "bottom" }}
          priority
        />
      </div>

      {/* Static SENSEI keyword with stronger bottom shade (Figma-style layer) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 md:bottom-8 lg:bottom-16 flex justify-center z-10">
        <div className="relative w-full max-w-[1341px]">
          <Image
            src="/assets/svgs/SENSEI.svg"
            alt="SENSEI watermark"
            width={1341}
            height={238}
            className="w-full opacity-20"
            priority
          />
          {/* Overlay gradient from footer-layer, darker at the bottom */}
          <Image
            src="/assets/svgs/footer-layer.svg"
            alt=""
            fill
            className="pointer-events-none object-cover opacity-100 mix-blend-multiply"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-6 lg:px-12 py-12 md:pb-8 md:pt-16 lg:pt-24">
        <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 min-h-[320px] md:min-h-[360px] overflow-hidden">
          {/* Brand Section - Left Side (Logo + Description) */}
          <div className="relative z-10 flex flex-col md:col-span-2 lg:col-span-2">
            <h2
              className="text-2xl font-bold mb-4 uppercase tracking-tight font-audiowide text-white"
              style={{
                fontFamily: "var(--font-audiowide), Audiowide, sans-serif",
              }}
            >
              SENSEI
            </h2>
            <p className="text-[#9FA6AD] text-sm leading-relaxed max-w-md font-inter">
              <SenseiText>{t("description")}</SenseiText>
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8 lg:col-span-3">
            {/* Quick Links Column */}
            <div>
              <h3 className="text-xs font-medium uppercase mb-4 tracking-wider text-[#9FA6AD] font-inter">
                {t("quickLinks")}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href={`/${currentLocale}`}
                    className="text-white hover:text-white/80 transition-colors text-sm font-inter font-medium"
                  >
                    {navT("home")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${currentLocale}/support`}
                    className="text-white hover:text-white/80 transition-colors text-sm font-inter font-medium"
                  >
                    {navT("support")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-xs font-medium uppercase mb-4 tracking-wider text-[#9FA6AD] font-inter">
                {t("company")}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href={`/${currentLocale}/about`}
                    className="text-white hover:text-white/80 transition-colors text-sm font-inter font-medium"
                  >
                    {navT("about")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${currentLocale}/contact`}
                    className="text-white hover:text-white/80 transition-colors text-sm font-inter font-medium"
                  >
                    {navT("contact")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Follow Us Column */}
            <div>
              <h3 className="text-xs font-medium uppercase mb-4 tracking-wider text-[#9FA6AD] font-inter">
                {t("followUs")}
              </h3>
              <div className="flex items-center gap-3">
                {/* Facebook */}
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full hover:bg-[#474849]/30 flex items-center justify-center transition-colors overflow-hidden"
                  aria-label={commonT("facebook")}
                >
                  <Image
                    src="/assets/svgs/icon-bonustrade-ai-facebook.svg"
                    alt="Facebook"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </Link>

                {/* Instagram */}
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full hover:bg-[#474849]/30 flex items-center justify-center transition-colors overflow-hidden"
                  aria-label={commonT("instagram")}
                >
                  <Image
                    src="/assets/svgs/icon-bonustrade-ai-instagram.svg"
                    alt="Instagram"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </Link>

                {/* X (Twitter) */}
                <Link
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full hover:bg-[#474849]/30 flex items-center justify-center transition-colors overflow-hidden"
                  aria-label={commonT("twitter")}
                >
                  <Image
                    src="/assets/svgs/X.svg"
                    alt="X (Twitter)"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - watermark + copyright live in same shaded section */}
        <div className="relative z-10 mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-[#6C737F] text-xs font-inter">
            <SenseiText>{t("copyright")}</SenseiText>
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-[#CDD7E1] hover:text-white/80 text-xs transition-colors font-inter"
            >
              {t("privacyPolicy")}
            </Link>
            <Link
              href="#"
              className="text-[#CDD7E1] hover:text-white/80 text-xs transition-colors font-inter"
            >
              {t("termsOfService")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
