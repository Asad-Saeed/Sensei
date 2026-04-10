import { setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n";
import SupportDetailPageClient from "@/components/support/SupportDetailPageClient";

export function generateStaticParams() {
  const categories = [
    "learning-resources",
    "technical-issues",
    "account-billing",
  ];
  const slugs = ["learning-about-account"];

  return locales.flatMap((locale) =>
    categories.flatMap((category) =>
      slugs.map((slug) => ({ locale, category, slug })),
    ),
  );
}

export default async function SupportDetailPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering for this locale
  setRequestLocale(locale);

  return <SupportDetailPageClient />;
}
