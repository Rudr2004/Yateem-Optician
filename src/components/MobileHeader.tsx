import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
  right?: React.ReactNode;
  transparent?: boolean;
}

export default function MobileHeader({ title, onBack, showBack = true, right, transparent = false }: Props) {
  const navigate = useNavigate();

  return (
    <header
      className={`sticky top-0 z-30 flex items-center justify-between px-4 h-14 shrink-0 ${
        transparent ? "bg-transparent" : "bg-mist-100/90 backdrop-blur-md border-b border-mist-200"
      }`}
    >
      <div className="w-10">
        {showBack && (
          <button
            aria-label="Back"
            onClick={onBack ?? (() => navigate(-1))}
            className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full active:bg-mist-200 transition"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
      <h1 className="text-[15px] font-semibold text-ink-900 truncate px-2">{title}</h1>
      <div className="w-10 flex justify-end">{right}</div>
    </header>
  );
}
