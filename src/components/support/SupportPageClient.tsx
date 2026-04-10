"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function SupportPageClient() {
  const t = useTranslations("Support");
  const commonT = useTranslations("Common");
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] || "en";

  const categories = [
    {
      id: "learning-resources",
      icon: "/assets/svgs/icon-learning-resource.svg",
      title: t("categories.learningResources.title"),
      topics: [
        {
          slug: "learning-about-account",
          label: t("categories.learningResources.topics.account"),
        },
        {
          slug: "change-notification-preferences",
          label: t("categories.learningResources.topics.notifications"),
        },
        {
          slug: "update-address",
          label: t("categories.learningResources.topics.address"),
        },
      ],
    },
    {
      id: "technical-issues",
      icon: "/assets/svgs/icon-technical-issues.svg",
      title: t("categories.technicalIssues.title"),
      topics: [
        { slug: "test", label: t("categories.technicalIssues.topics.test") },
        {
          slug: "ssd-vs-hdd",
          label: t("categories.technicalIssues.topics.ssdVsHdd"),
        },
        {
          slug: "software-updates",
          label: t("categories.technicalIssues.topics.softwareUpdates"),
        },
      ],
    },
    {
      id: "account-billing",
      icon: "/assets/svgs/icon-accounts-and-billing.svg",
      title: t("categories.accountBilling.title"),
      topics: [
        {
          slug: "remove-bank-account",
          label: t("categories.accountBilling.topics.removeBank"),
        },
        {
          slug: "change-notification-preferences",
          label: t("categories.accountBilling.topics.notifications"),
        },
        {
          slug: "update-address",
          label: t("categories.accountBilling.topics.address"),
        },
      ],
    },
  ];

  return (
    <div className="bg-[#0A0B0D] text-white pt-32 pb-20 font-inter">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-[40px] md:text-[48px] leading-tight font-inter font-medium text-white mb-6">
            {t("header.title.prefix")}{" "}
            <span className="text-[#432CEF]">
              {t("header.title.highlight")}
            </span>{" "}
            {t("header.title.suffix")}
          </h1>
          <p className="text-sm md:text-base text-[#CDD7E1] max-w-2xl leading-relaxed font-inter mb-2">
            {t("header.description1")}
          </p>
          <p className="text-sm md:text-base text-[#CDD7E1] max-w-2xl leading-relaxed font-inter">
            {t("header.description2")}
          </p>
        </div>

        {/* Separator */}
        <div className="border-t border-white/10 mb-12"></div>

        {/* Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col p-6 lg:p-8">
              {/* Category Header with Icon */}
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src={category.icon}
                  alt={category.title}
                  width={32}
                  height={32}
                  className="w-8 h-8 shrink-0"
                  priority
                />
                <h2 className="text-lg font-semibold text-white font-inter">
                  {category.title}
                </h2>
              </div>

              {/* Topics List */}
              <ul className="space-y-3 mb-6 flex-1">
                {category.topics.map((topic) => (
                  <li key={topic.slug}>
                    <Link
                      href={
                        topic.slug === "learning-about-account"
                          ? `/${currentLocale}/support/${category.id}/${topic.slug}`
                          : "#"
                      }
                      className="text-sm text-white hover:text-[#432CEF] transition-colors font-inter block"
                    >
                      {topic.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* CTA Button for Account & Billing */}
              {category.id === "account-billing" && (
                <Link
                  href="#"
                  className="mt-auto w-full lg:w-fit lg:self-start inline-flex items-center justify-center rounded-lg bg-[#432CEF] hover:bg-[#5D4FFF] px-6 py-3 text-sm font-medium text-white transition-colors font-inter"
                >
                  {t("categories.accountBilling.cta")}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
