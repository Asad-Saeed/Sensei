import { setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n";
import SupportPageClient from "@/components/support/SupportPageClient";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering for this locale
  setRequestLocale(locale);

  return <SupportPageClient />;
}
