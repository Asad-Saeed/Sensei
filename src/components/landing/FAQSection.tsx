"use client";

import { useTranslations } from "next-intl";
import MainHeading from "@/components/ui/MainHeading";
import Accordion from "@/components/ui/Accordion";
import SenseiText from "@/components/ui/SenseiText";

export default function FAQSection() {
  const t = useTranslations("FAQSection");

  const faqItems = [
    {
      question: t("items.0.question"),
      answer: t("items.0.answer"),
      defaultOpen: true,
    },
    {
      question: t("items.1.question"),
      answer: t("items.1.answer"),
    },
    {
      question: t("items.2.question"),
      answer: t("items.2.answer"),
    },
    {
      question: t("items.3.question"),
      answer: t("items.3.answer"),
    },
  ];

  return (
    <section className="relative bg-black py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 w-full">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <MainHeading
              as="h2"
              className="text-white font-dm-serif text-2xl! sm:text-3xl! md:text-4xl! font-bold! mb-4 sm:mb-5 md:mb-6"
            >
              {t("title")}
            </MainHeading>
            <p className="text-[#9FA6AD] text-sm sm:text-base md:text-lg font-inter leading-relaxed max-w-2xl mx-auto">
              <SenseiText>{t("subtitle")}</SenseiText>
            </p>
          </div>

          {/* Accordion */}
          <Accordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}
