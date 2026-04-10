"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import SenseiText from "@/components/ui/SenseiText";

type ContactFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  consent: boolean;
};

const useContactSchema = () => {
  const t = useTranslations("Contact.form.validation");

  return useMemo(
    () =>
      yup
        .object({
          firstName: yup.string().required(t("firstNameRequired")),
          lastName: yup.string().required(t("lastNameRequired")),
          email: yup
            .string()
            .email(t("emailInvalid"))
            .required(t("emailRequired")),
          message: yup
            .string()
            .min(10, t("messageMin"))
            .required(t("messageRequired")),
          consent: yup.boolean().oneOf([true], t("consentRequired")).required(),
        })
        .required(),
    [t],
  );
};

function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      <Link
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-[#4C3CFF] hover:bg-[#5D4FFF] flex items-center justify-center transition-colors"
        aria-label="Facebook"
      >
        <svg
          className="w-4 h-4 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </Link>

      <Link
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-[#4C3CFF] hover:bg-[#5D4FFF] flex items-center justify-center transition-colors"
        aria-label="Instagram"
      >
        <svg
          className="w-4 h-4 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </Link>

      <Link
        href="https://x.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-[#4C3CFF] hover:bg-[#5D4FFF] flex items-center justify-center transition-colors"
        aria-label="X (Twitter)"
      >
        <svg
          className="w-4 h-4 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </Link>
    </div>
  );
}

export default function ContactPageClient() {
  const t = useTranslations("Contact");
  const navT = useTranslations("Navigation");
  const commonT = useTranslations("Common");
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] || "en";
  const schema = useContactSchema();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      consent: false,
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    // TODO: Integrate with backend / API.
    console.log("Contact form submitted", values);
    reset();
  };

  return (
    <div className="text-white">
      {/* Grid container for large screens - full width backgrounds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-screen">
        {/* Section 1: Content Section */}
        <section className="bg-[#0E1012] pt-32 pb-20">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 lg:pr-12">
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center gap-2 text-sm text-[#9FA6AD]">
              <Link
                href={`/${currentLocale}`}
                className="flex items-center gap-2 text-[#CDD7E1] hover:text-white font-inter text-sm"
              >
                <FiArrowLeft className="h-5 w-5" aria-hidden="true" />
                <span>{navT("home")}</span>
              </Link>
            </div>

            {/* Contact main heading */}
            <h1 className="text-[40px] md:text-[48px] leading-tight font-inter font-medium text-white mb-6">
              {t("pageTitle")}
            </h1>

            {/* Email + Contact Us CTA */}
            <div className="mb-8 md:mt-16">
              <span className="flex items-center gap-3">
                <Image
                  src="/assets/svgs/email-icon.svg"
                  alt="Email"
                  width={40}
                  height={40}
                  className="h-9 w-9"
                  aria-hidden="true"
                />
                <span className="text-xs font-medium tracking-[0.18em] uppercase text-white font-inter">
                  {t("ctaLabel")}
                </span>
              </span>
            </div>

            {/* Talk to our team heading */}
            <h1 className="text-[32px] md:text-[48px] font-inter font-semibold text-white mb-6">
              {t("heroTitle")}
            </h1>

            {/* Content paragraphs */}
            <p className="text-sm md:text-base text-[#CDD7E1] max-w-xl leading-relaxed mb-3 font-inter">
              <SenseiText>{t("heroSubtitle1")}</SenseiText>
            </p>
            <p className="text-sm md:text-base text-[#CDD7E1] max-w-xl leading-relaxed mb-10 font-inter">
              <SenseiText>{t("heroSubtitle2")}</SenseiText>
            </p>

            {/* Support card */}
            <div className="mt-6 rounded-2xl md:rounded-3xl border border-[#3F37FF] bg-[#07080C] px-6 py-6 md:px-8 md:py-8 shadow-[0_0_0_1px_rgba(79,70,255,0.35)]">
              <Link
                href={`/${currentLocale}/support/learning-resources/learning-about-account`}
                className="text-sm md:text-base font-semibold text-[#4C3CFF] mb-4 hover:text-[#5D4FFF] transition-colors block cursor-pointer font-inter"
              >
                {t("support.title")}
              </Link>

              {/* Article category icons */}
              <div className="mb-5 flex items-center gap-4">
                <Link
                  href={`/${currentLocale}/support/learning-resources/learning-about-account`}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <Image
                    src="/assets/svgs/icon-learning-resource.svg"
                    alt="Learning Resource"
                    width={41}
                    height={41}
                    priority
                  />
                </Link>
                <Link
                  href="#"
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <Image
                    src="/assets/svgs/icon-technical-issues.svg"
                    alt="Technical Issues"
                    width={41}
                    height={41}
                    priority
                  />
                </Link>
                <Link
                  href="#"
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <Image
                    src="/assets/svgs/icon-accounts-and-billing.svg"
                    alt="Accounts and Billing"
                    width={41}
                    height={41}
                    priority
                  />
                </Link>
              </div>

              <p className="text-sm md:text-base text-[#FFFFFF] mb-6 leading-relaxed font-inter">
                {t("support.body")}
              </p>

              <p className="text-sm font-semibold text-[#432CEF] mb-3 font-inter">
                {t("support.highlight")}
              </p>
              <SocialLinks />
            </div>
          </div>
        </section>

        {/* Section 2: Form Section */}
        <section className="bg-[#0A0B0D] pt-20 lg:pt-48 pb-20">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 lg:pl-12">
            <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-[#FFFFFF] mb-6 font-inter">
              {t("form.title")}
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Input<ContactFormValues>
                  name="firstName"
                  label={t("form.firstName")}
                  placeholder={t("form.firstNamePlaceholder")}
                  control={control}
                />
                <Input<ContactFormValues>
                  name="lastName"
                  label={t("form.lastName")}
                  placeholder={t("form.lastNamePlaceholder")}
                  control={control}
                />
              </div>

              <Input<ContactFormValues>
                name="email"
                label={t("form.email")}
                placeholder={t("form.emailPlaceholder")}
                control={control}
                type="email"
              />

              <Input<ContactFormValues>
                name="message"
                label={t("form.message")}
                placeholder={t("form.messagePlaceholder")}
                control={control}
                multiline
              />

              {/* Consent */}
              <Controller
                name="consent"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="space-y-1">
                    <label className="flex items-center gap-3 text-sm text-[#CDD7E1] font-inter">
                      <input
                        type="checkbox"
                        className="mt-1 h-5 w-5 rounded-sm border border-[#6C737F] bg-transparent text-[#432CEF] focus:ring-1 focus:ring-[#432CEF] focus:ring-offset-0 focus:border-[#432CEF] cursor-pointer appearance-none checked:bg-[#432CEF] checked:border-[#432CEF] checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNS41TDQuNSA5TDExIDEiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=')] checked:bg-center checked:bg-no-repeat checked:bg-contain"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                      <span>
                        {t("form.consentPrefix")}{" "}
                        <Link
                          href="#"
                          className="text-[#7B5CFF] underline underline-offset-2 font-inter"
                        >
                          {commonT("termsOfService")}
                        </Link>{" "}
                        {t("form.and")}{" "}
                        <Link
                          href="#"
                          className="text-[#7B5CFF] underline underline-offset-2 font-inter"
                        >
                          {commonT("privacyPolicy")}
                        </Link>
                        .
                      </span>
                    </label>
                    {fieldState.error && (
                      <p className="text-xs text-red-400 font-inter">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-linear-to-r from-[#5D3BFF] to-[#7B5CFF] px-6 py-3 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)] hover:brightness-110 transition-transform transform hover:translate-y-px disabled:opacity-60 disabled:cursor-not-allowed font-inter"
              >
                {isSubmitting ? t("form.submitting") : t("form.submit")}
              </button>

              {isSubmitSuccessful && (
                <p className="text-xs text-[#9FA6AD] pt-2 font-inter">
                  {t("form.success")}
                </p>
              )}
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
