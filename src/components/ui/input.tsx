"use client";

import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

type InputProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
};

export function Input<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  multiline,
}: InputProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <label
            htmlFor={name}
            className="block text-xs font-medium tracking-[0.12em] uppercase text-[#FFFFFF] mb-2 font-inter"
          >
            {label}
          </label>
          {multiline ? (
            <textarea
              id={name}
              {...field}
              rows={5}
              className={`w-full rounded-lg border px-3 py-3 bg-transparent text-sm text-[#FFFFFF] placeholder:text-[#6C737F] outline-none transition-colors focus:ring-1 focus:ring-[#432CEF] font-inter ${
                fieldState.error
                  ? "border-red-500 focus:border-red-400"
                  : "border-[#6C737F] focus:border-[#432CEF]"
              }`}
              placeholder={placeholder}
            />
          ) : (
            <input
              id={name}
              type={type}
              {...field}
              className={`w-full rounded-lg border px-3 py-3 bg-transparent text-sm text-[#FFFFFF] placeholder:text-[#6C737F] outline-none transition-colors focus:ring-0 focus:ring-[#432CEF] font-inter ${
                fieldState.error
                  ? "border-red-500 focus:border-red-400"
                  : "border-[#6C737F] focus:border-[#432CEF]"
              }`}
              placeholder={placeholder}
            />
          )}
          {fieldState.error && (
            <p className="mt-1 text-xs text-red-400 font-inter">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
