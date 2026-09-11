import { useLocation, useNavigate } from "react-router-dom";

const ITEMS = [
  {
    key: "home",
    label: "Home",
    path: "/",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 11.5L12 4l8 7.5M6 10v9a1 1 0 001 1h3v-5h4v5h3a1 1 0 001-1v-9"
          stroke={active ? "#3562e0" : "#8a90ad"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: "customers",
    label: "Customers",
    path: "/recent",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3.2" stroke={active ? "#3562e0" : "#8a90ad"} strokeWidth="2" />
        <path d="M5 19c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke={active ? "#3562e0" : "#8a90ad"} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "measurements",
    label: "Measurements",
    path: "/recent",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="3.5" width="16" height="17" rx="2" stroke={active ? "#3562e0" : "#8a90ad"} strokeWidth="2" />
        <path d="M8 8h8M8 12h8M8 16h5" stroke={active ? "#3562e0" : "#8a90ad"} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "more",
    label: "More",
    path: "/price-list",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="5" cy="12" r="1.6" fill={active ? "#3562e0" : "#8a90ad"} />
        <circle cx="12" cy="12" r="1.6" fill={active ? "#3562e0" : "#8a90ad"} />
        <circle cx="19" cy="12" r="1.6" fill={active ? "#3562e0" : "#8a90ad"} />
      </svg>
    ),
  },
];

export default function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="sticky bottom-0 z-30 flex items-stretch bg-white/95 backdrop-blur-md border-t border-mist-200 pb-[env(safe-area-inset-bottom)]">
      {ITEMS.map((item) => {
        const active = location.pathname === item.path;
        return (
          <button
            key={item.key}
            onClick={() => navigate(item.path)}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] active:opacity-60 transition"
          >
            {item.icon(active)}
            <span className={`text-[10px] font-medium ${active ? "text-royal-500" : "text-ink-700/60"}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
