"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales } from "@/i18n";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
  const t = useTranslations("Navigation");
  const commonT = useTranslations("Common");
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] || "en";
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isMenuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [isMenuOpen]);

  const navigation = [
    { name: "home", href: `/${currentLocale}` },
    { name: "about", href: `/${currentLocale}/about` },
    { name: "contact", href: `/${currentLocale}/contact` },
    { name: "support", href: `/${currentLocale}/support` },
  ];

  const isContactPage = pathname?.includes("/contact");
  const isSupportPage = pathname?.includes("/support");
  const showSolidHeader =
    isScrolled || isMenuOpen || isContactPage || isSupportPage;

  // Determine background color based on page
  const getHeaderBg = () => {
    if (isContactPage || isSupportPage) return "bg-[#0A0B0D]";
    if (showSolidHeader) return "bg-black";
    return "bg-transparent";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getHeaderBg()} ${
        showSolidHeader ? "bg-opacity-95" : ""
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-8">
        <div
          className="flex items-center justify-between h-[72px]"
          style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.18)" }}
        >
          {/* Logo */}
          <div className="shrink-0">
            <Link
              href={`/${currentLocale}`}
              className="text-white font-audiowide font-normal text-[28px] leading-[2.5em] tracking-[0.9375%]"
              style={{
                fontFamily: "var(--font-audiowide), Audiowide, sans-serif",
              }}
            >
              SENSEI
            </Link>
          </div>

          {/* Navigation - Aligned after logo on lg, centered on xl+ */}
          <nav className="hidden lg:flex items-center lg:ml-8 xl:absolute xl:left-1/2 xl:transform xl:-translate-x-1/2 xl:ml-0 gap-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-colors font-inter font-medium text-sm leading-[2em] ${
                    isActive ? "text-[#432CEF]" : "text-[#CDD7E1]"
                  }`}
                >
                  {t(item.name)}
                </Link>
              );
            })}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            {/* Mobile hamburger */}
            <button
              type="button"
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-white/20 text-white"
              onClick={() => {
                setIsMenuOpen((prev) => !prev);
                setIsMobileLangOpen(false);
              }}
              aria-label={commonT("toggleNavigation")}
            >
              {isMenuOpen ? (
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 7h16M4 12h16M4 17h16"
                  />
                </svg>
              )}
            </button>

            {/* Desktop controls */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Language Selector (desktop) */}
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center rounded-lg transition-colors border py-[5px] px-2 gap-1.5 bg-[#191A1C] min-w-[120px]"
                  style={{
                    borderColor: "#474849",
                    borderWidth: "1px",
                  }}
                >
                  {/* Globe Icon */}
                  <Image
                    src="/assets/svgs/glob.svg"
                    alt="Globe"
                    width={24}
                    height={24}
                    className="w-6 h-6 shrink-0"
                  />
                  {/* Language Text */}
                  <span className="font-inter font-normal text-sm leading-[2em] text-white flex-1 text-left">
                    {currentLocale === "en" ? "English" : "日本語"}
                  </span>
                  {/* Dropdown Arrow */}
                  <svg
                    className={`w-3 h-3 text-white transition-transform shrink-0 ${
                      isLangOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 4.5l3 3 3-3"
                    />
                  </svg>
                </button>

                {isLangOpen && (
                  <div
                    className="absolute right-0 mt-2 w-40 rounded-lg shadow-xl overflow-hidden bg-[#191A1C]"
                    style={{ border: "1px solid #474849" }}
                  >
                    {locales.map((locale) => {
                      const isSelected = locale === currentLocale;
                      const languageName =
                        locale === "en" ? "English" : "日本語";
                      return (
                        <Link
                          key={locale}
                          href={
                            pathname?.replace(
                              `/${currentLocale}`,
                              `/${locale}`,
                            ) || `/${locale}`
                          }
                          className="flex items-center justify-between px-4 py-2.5 transition-colors hover:bg-[#474849]/30 font-inter font-medium text-sm leading-[2em]"
                          onClick={() => setIsLangOpen(false)}
                        >
                          <span
                            className={
                              isSelected ? "text-[#432CEF]" : "text-white"
                            }
                          >
                            {languageName}
                          </span>
                          {isSelected && (
                            <svg
                              className="w-4 h-4 text-[#432CEF]"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Log In Button */}
              <Link
                href="#"
                className="flex items-center justify-center rounded-lg transition-colors border w-[97px] h-10 font-inter font-medium text-sm leading-[2em] text-[#432CEF] bg-transparent"
                style={{
                  borderColor: "#432CEF",
                  borderWidth: "1px",
                }}
              >
                {commonT("login")}
              </Link>

              {/* Try it Free Button */}
              <Link
                href="#"
                className="flex items-center justify-center rounded-lg transition-all w-[126px] h-10 font-inter font-normal text-sm leading-[2em] text-white bg-[#432CEF]"
              >
                {commonT("tryItFree")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer - solid black background on small/medium screens */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[72px] bottom-0 z-40 bg-black border-t border-white/10">
          <div className="max-w-[1440px] mx-auto px-6 py-6 flex flex-col gap-6">
            {/* Mobile nav links */}
            <nav className="flex flex-col gap-3">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-inter text-base font-medium py-1 ${
                      isActive ? "text-[#432CEF]" : "text-white"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(item.name)}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile language selector */}
            <div className="border-t border-white/10 pt-4">
              <p className="text-xs uppercase tracking-wide text-[#9FA6AD] font-inter mb-2">
                {commonT("language")}
              </p>
              {/* Mobile language dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsMobileLangOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between rounded-lg border border-[#474849] bg-[#191A1C] px-3 py-2.5 font-inter text-sm text-white"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src="/assets/svgs/glob.svg"
                      alt="Globe"
                      width={20}
                      height={20}
                      className="w-5 h-5 shrink-0"
                    />
                    <span>{currentLocale === "en" ? "English" : "日本語"}</span>
                  </div>
                  <svg
                    className={`w-3 h-3 text-white transition-transform ${
                      isMobileLangOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 4.5l3 3 3-3"
                    />
                  </svg>
                </button>

                {isMobileLangOpen && (
                  <div className="absolute inset-x-0 mt-2 rounded-lg border border-[#474849] bg-[#191A1C] shadow-xl overflow-hidden">
                    {locales.map((locale) => {
                      const isSelected = locale === currentLocale;
                      const languageName =
                        locale === "en" ? "English" : "日本語";
                      return (
                        <Link
                          key={locale}
                          href={
                            pathname?.replace(
                              `/${currentLocale}`,
                              `/${locale}`,
                            ) || `/${locale}`
                          }
                          className="flex items-center justify-between px-4 py-2.5 font-inter text-sm hover:bg-[#474849]/30 transition-colors"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsMobileLangOpen(false);
                          }}
                        >
                          <span
                            className={
                              isSelected ? "text-[#432CEF]" : "text-white"
                            }
                          >
                            {languageName}
                          </span>
                          {isSelected && (
                            <svg
                              className="w-4 h-4 text-[#432CEF]"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile auth buttons */}
            <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
              <Link
                href="#"
                className="flex items-center justify-center rounded-lg border border-[#432CEF] text-[#432CEF] h-10 font-inter text-sm font-medium"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsMobileLangOpen(false);
                }}
              >
                {commonT("login")}
              </Link>
              <Link
                href="#"
                className="flex items-center justify-center rounded-lg bg-[#432CEF] text-white h-10 font-inter text-sm font-medium"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsMobileLangOpen(false);
                }}
              >
                {commonT("tryItFree")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
