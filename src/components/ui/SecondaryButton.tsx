import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
}

export default function SecondaryButton({ children, fullWidth = true, className = "", ...rest }: Props) {
  return (
    <button
      {...rest}
      className={`${fullWidth ? "w-full" : ""} min-h-[52px] px-6 rounded-2xl bg-white border border-mist-300 text-ink-900 font-semibold text-[15px] active:scale-[0.98] transition disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  );
}
