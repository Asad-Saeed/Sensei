"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import SenseiText from "@/components/ui/SenseiText";

export default function SupportDetailPageClient() {
  const t = useTranslations("Support.detail");
  const navT = useTranslations("Navigation");
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] || "en";

  return (
    <div className="bg-[#0A0B0D] text-white pt-32 pb-20 font-inter">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          {/* Header Section */}
          <div className="mb-12">
            {/* Title */}
            <h1 className="text-[40px] md:text-[48px] leading-tight font-inter font-medium text-[#FFFFFF] mb-3">
              <SenseiText>{t("title")}</SenseiText>
            </h1>

            {/* Breadcrumb - Below title */}
            <div className="flex items-center gap-2 text-sm text-[#CDD7E1] mb-6 font-inter">
              <Link
                href={`/${currentLocale}/support`}
                className="hover:text-white transition-colors font-inter"
              >
                {navT("support")}
              </Link>
              <span className="text-[#9FA6AD] font-inter">•</span>
              <span className="text-[#6C737F] font-inter">
                {t("breadcrumb.post")}
              </span>
            </div>

            {/* Category Tag */}
            <div className="inline-block">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#2A2A2A] text-sm font-normal text-[#FFFFFF] font-inter">
                {t("categoryTag")}
              </span>
            </div>
          </div>
        </div>

        {/* Learning about your account Section - Full Width */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#FFFFFF] mb-6 font-inter">
            <SenseiText>{t("sections.learningAboutAccount.title")}</SenseiText>
          </h2>
          <p className="text-sm md:text-base text-[#CDD7E1] leading-relaxed mb-2 font-inter">
            <SenseiText>
              {t("sections.learningAboutAccount.paragraph1")}
            </SenseiText>
          </p>
          <p className="text-sm md:text-base text-[#CDD7E1] leading-relaxed font-inter">
            <SenseiText>
              {t("sections.learningAboutAccount.paragraph2")}
            </SenseiText>
          </p>
        </section>

        {/* Main Content */}
        <div className="max-w-3xl">
          <div className="space-y-8 px-4 md:px-8">
            {/* How do I access Section */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-[#FFFFFF] mb-6 font-inter">
                <SenseiText>{t("sections.accessAccount.title")}</SenseiText>
              </h2>
              <p className="text-sm md:text-base text-[#CDD7E1] leading-relaxed mb-4 font-inter">
                <SenseiText>
                  {t("sections.accessAccount.paragraph1")}
                </SenseiText>
              </p>
              <p className="text-sm md:text-base text-[#CDD7E1] mb-4 font-inter">
                <SenseiText>
                  {t("sections.accessAccount.stepsLabel")}
                </SenseiText>
              </p>
              <ul className="space-y-3 mb-6 ml-6 list-disc">
                <li className="text-sm md:text-base text-[#CDD7E1] leading-relaxed font-inter">
                  <SenseiText>{t("sections.accessAccount.step1")}</SenseiText>
                </li>
                <li className="text-sm md:text-base text-[#CDD7E1] leading-relaxed font-inter">
                  <SenseiText>{t("sections.accessAccount.step2")}</SenseiText>
                </li>
                <li className="text-sm md:text-base text-[#CDD7E1] leading-relaxed font-inter">
                  <SenseiText>{t("sections.accessAccount.step3")}</SenseiText>
                </li>
              </ul>
              <p className="text-sm md:text-base text-[#CDD7E1] leading-relaxed font-inter">
                <SenseiText>
                  {t("sections.accessAccount.paragraph2")}
                </SenseiText>
              </p>
            </section>

            {/* What if I can't access Section */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-[#FFFFFF] mb-6 font-inter">
                <SenseiText>{t("sections.cantAccess.title")}</SenseiText>
              </h2>
              <p className="text-sm md:text-base text-[#CDD7E1] mb-4 font-inter">
                <SenseiText>{t("sections.cantAccess.paragraph1")}</SenseiText>
              </p>
              <ul className="space-y-3 mb-8 ml-6 list-disc">
                <li className="text-sm md:text-base text-[#CDD7E1] leading-relaxed font-inter">
                  <SenseiText>
                    {t("sections.cantAccess.troubleshoot1")}
                  </SenseiText>
                </li>
                <li className="text-sm md:text-base text-[#CDD7E1] leading-relaxed font-inter">
                  <SenseiText>
                    {t("sections.cantAccess.troubleshoot2")}
                  </SenseiText>
                </li>
                <li className="text-sm md:text-base text-[#CDD7E1] leading-relaxed font-inter">
                  <SenseiText>
                    {t("sections.cantAccess.troubleshoot3")}
                  </SenseiText>
                </li>
                <li className="text-sm md:text-base text-[#CDD7E1] leading-relaxed font-inter">
                  <SenseiText>
                    {t("sections.cantAccess.troubleshoot4")}
                  </SenseiText>
                </li>
              </ul>
              <p className="text-sm md:text-base text-[#CDD7E1] mb-4 font-inter">
                <SenseiText>
                  {t("sections.cantAccess.supportInfoLabel")}
                </SenseiText>
              </p>
              <p className="text-sm md:text-base text-[#CDD7E1] mb-4 font-inter">
                <SenseiText>
                  {t("sections.cantAccess.supportInfoIntro")}
                </SenseiText>
              </p>
              <ul className="space-y-3 mb-6 ml-6 list-disc">
                <li className="text-sm md:text-base text-[#CDD7E1] leading-relaxed font-inter">
                  <SenseiText>{t("sections.cantAccess.info1")}</SenseiText>
                </li>
                <li className="text-sm md:text-base text-[#CDD7E1] leading-relaxed font-inter">
                  <SenseiText>{t("sections.cantAccess.info2")}</SenseiText>
                </li>
                <li className="text-sm md:text-base text-[#CDD7E1] leading-relaxed font-inter">
                  <SenseiText>{t("sections.cantAccess.info3")}</SenseiText>
                </li>
                <li className="text-sm md:text-base text-[#CDD7E1] leading-relaxed font-inter">
                  <SenseiText>{t("sections.cantAccess.info4")}</SenseiText>
                </li>
              </ul>
              <p className="text-sm md:text-base text-[#CDD7E1] leading-relaxed font-inter">
                <SenseiText>{t("sections.cantAccess.paragraph2")}</SenseiText>
              </p>
            </section>

            {/* In summary Section */}
            <section>
              <p className="text-sm md:text-base text-[#CDD7E1] mb-4 font-inter">
                <SenseiText>{t("sections.summary.title")}</SenseiText>
              </p>
              <p className="text-sm md:text-base text-[#CDD7E1] leading-relaxed mb-4 font-inter">
                <SenseiText>{t("sections.summary.paragraph1")}</SenseiText>
              </p>
              <p className="text-sm md:text-base text-[#CDD7E1] leading-relaxed font-inter">
                <SenseiText>{t("sections.summary.paragraph2")}</SenseiText>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
