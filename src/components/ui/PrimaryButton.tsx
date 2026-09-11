import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
}

export default function PrimaryButton({ children, fullWidth = true, className = "", ...rest }: Props) {
  return (
    <button
      {...rest}
      className={`${fullWidth ? "w-full" : ""} min-h-[52px] px-6 rounded-2xl bg-gradient-to-r from-royal-600 to-indigo-500 text-white font-semibold text-[15px] tracking-wide shadow-[0_10px_24px_-8px_rgba(53,98,224,0.6)] active:scale-[0.98] transition disabled:opacity-40 disabled:shadow-none ${className}`}
    >
      {children}
    </button>
  );
}
