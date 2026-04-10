import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n";

// Map category slugs to their first article slug
const categoryToFirstArticle: Record<string, string> = {
  "learning-resource": "learning-about-account",
  "learning-resources": "learning-about-account",
  "technical-issues": "test",
  "accounts-and-billing": "remove-bank-account",
  "account-billing": "remove-bank-account",
};

export function generateStaticParams() {
  const categories = Object.keys(categoryToFirstArticle);
  return locales.flatMap((locale) =>
    categories.map((category) => ({ locale, category })),
  );
}

export default async function SupportCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;

  // Enable static rendering for this locale
  setRequestLocale(locale);

  // Normalize category name (handle both singular and plural)
  const normalizedCategory =
    category === "learning-resource"
      ? "learning-resources"
      : category === "accounts-and-billing"
        ? "account-billing"
        : category;

  const firstArticle =
    categoryToFirstArticle[category] ||
    categoryToFirstArticle[normalizedCategory];

  if (firstArticle) {
    redirect(`/${locale}/support/${normalizedCategory}/${firstArticle}`);
  }

  // Fallback: redirect to support main page
  redirect(`/${locale}/support`);
}
