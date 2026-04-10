"use client";

import { useTranslations } from "next-intl";
import MainHeading from "@/components/ui/MainHeading";

export default function HeadingSection() {
  const t = useTranslations("HeadingSection");

  return (
    <section className="relative bg-black py-12 md:py-16 lg:py-20">
      <div className="max-w-2xl md:max-w-3xl mx-auto px-8 w-full">
        <div className="text-center">
          <MainHeading
            as="h3"
            className="text-center text-2xl! sm:text-3xl! md:text-4xl! font-normal!"
          >
            {t("title")}
          </MainHeading>
        </div>
      </div>
    </section>
  );
}
