import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/landing/Hero";
import HeadingSection from "@/components/landing/HeadingSection";
import TeamworkSection from "@/components/landing/TeamworkSection";
import CustomAIModelsSection from "@/components/landing/CustomAIModelsSection";
import DataSecuritySection from "@/components/landing/DataSecuritySection";
import ExpertsNetworkSection from "@/components/landing/ExpertsNetworkSection";
import DiscoverSection from "@/components/landing/DiscoverSection";
import FAQSection from "@/components/landing/FAQSection";
import { locales } from "@/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div className="bg-black">
      <Hero />
      <HeadingSection />
      <TeamworkSection />
      <CustomAIModelsSection />
      <DataSecuritySection />
      <ExpertsNetworkSection />
      <FAQSection />
      <DiscoverSection />
    </div>
  );
}
