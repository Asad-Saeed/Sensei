import { getTranslations, setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n";
import MainHeading from "@/components/ui/MainHeading";
import Paragraph from "@/components/ui/Paragraph";
import Image from "next/image";
import Link from "next/link";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations("About");

  return (
    <div className="text-white pt-20 bg-[#0a0b0d]">
      {/* About Us Section - Full Width Background */}
      <section className="py-16 md:py-20 bg-[#0a0b0d]">
        <main className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <MainHeading as="h2" className="mb-6">
              {t("aboutUs")}
            </MainHeading>
            <Paragraph>{t("aboutUsDescription")}</Paragraph>
          </div>
        </main>
      </section>

      {/* Our Mission Section - Full Width Background */}
      <section className="py-16 md:py-20 bg-[#0E1012]">
        <main className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <MainHeading as="h2" className="mb-6">
              {t("ourMission")}
            </MainHeading>
            <Paragraph>{t("ourMissionDescription")}</Paragraph>
          </div>
        </main>
      </section>
    </div>
  );
}
