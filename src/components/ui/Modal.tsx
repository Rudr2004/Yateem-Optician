import type { ReactNode } from "react";

interface Props {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export default function Modal({ open, onClose, children }: Props) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-ink-900/50" onClick={onClose} />
      <div className="relative bg-white rounded-3xl p-6 w-full max-w-[320px] animate-fade-in-up shadow-2xl">
        {children}
      </div>
    </div>
  );
}
