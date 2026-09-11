import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import SessionGuard from "../components/SessionGuard";
import PrimaryButton from "../components/ui/PrimaryButton";
import { COATING_OPTIONS } from "../data/mockData";
import { useSession } from "../context/SessionContext";

const ICONS: Record<string, string> = {
  "Anti-Reflective": "✨",
  "Blue-Light Filtering": "🔵",
  "Night Driving": "🌙",
  Polarized: "🕶",
  "UV Protection": "☀️",
  "Scratch Resistant": "🛡",
};

export default function CoatingSelection() {
  return (
    <SessionGuard>
      <CoatingSelectionContent />
    </SessionGuard>
  );
}

function CoatingSelectionContent() {
  const navigate = useNavigate();
  const { session, toggleCoating } = useSession();
  const coatings = session?.coatings ?? [];

  return (
    <AppShell
      title="Lens Coatings"
      onBack={() => navigate("/lens")}
      stickyFooter={<PrimaryButton onClick={() => navigate("/thickness")}>CONTINUE</PrimaryButton>}
    >
      <div className="px-5 pt-5 pb-2 flex items-center justify-between">
        <p className="text-[13px] text-ink-700/60">Choose any coatings for this lens.</p>
        <span className="text-[12px] font-semibold text-royal-500 shrink-0 ml-2">{coatings.length} Selected</span>
      </div>

      <div className="px-5 pt-3 pb-6 flex flex-col gap-3">
        {COATING_OPTIONS.map((option) => {
          const isSelected = coatings.includes(option);
          return (
            <button
              key={option}
              onClick={() => toggleCoating(option)}
              className={`text-left bg-white rounded-2xl p-4 flex items-center gap-4 border-2 transition active:scale-[0.99] ${
                isSelected ? "border-royal-500 shadow-[0_8px_24px_-10px_rgba(53,98,224,0.4)]" : "border-transparent shadow-[0_6px_18px_-12px_rgba(10,17,40,0.2)]"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-royal-500/10 flex items-center justify-center text-xl shrink-0">
                {ICONS[option]}
              </div>
              <p className="flex-1 text-[14px] font-semibold text-ink-900">{option}</p>
              <span
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[11px] font-bold shrink-0 transition ${
                  isSelected ? "bg-success-500 border-success-500 text-white" : "border-mist-300 text-transparent"
                }`}
              >
                ✓
              </span>
            </button>
          );
        })}
      </div>
    </AppShell>
  );
}
