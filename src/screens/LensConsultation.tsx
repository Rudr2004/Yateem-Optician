import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import SessionGuard from "../components/SessionGuard";
import PrimaryButton from "../components/ui/PrimaryButton";
import { LENS_OPTIONS } from "../data/mockData";
import { useSession } from "../context/SessionContext";
import type { LensType } from "../types";

const ICONS: Record<string, string> = {
  "Single Vision": "◎",
  Progressive: "◐",
  "Anti-Fatigue": "◑",
  Computer: "🖥",
};

export default function LensConsultation() {
  return (
    <SessionGuard>
      <LensConsultationContent />
    </SessionGuard>
  );
}

function LensConsultationContent() {
  const navigate = useNavigate();
  const { session, setLens } = useSession();
  const [selected, setSelected] = useState<LensType | null>(session?.lens ?? null);

  return (
    <AppShell
      title="Lens Consultation"
      onBack={() => navigate("/measure/validate")}
      stickyFooter={
        <PrimaryButton
          disabled={!selected}
          onClick={() => {
            if (selected) setLens(selected);
            navigate("/coatings");
          }}
        >
          CONTINUE
        </PrimaryButton>
      }
    >
      <div className="px-5 pt-5 pb-2">
        <p className="text-[13px] text-ink-700/60">Select the lens type based on the customer's needs.</p>
      </div>

      <div className="px-5 pt-3 pb-6 flex flex-col gap-3">
        {LENS_OPTIONS.map((opt) => {
          const isSelected = selected === (opt.type as LensType);
          return (
            <button
              key={opt.type}
              onClick={() => setSelected(opt.type as LensType)}
              className={`text-left bg-white rounded-2xl p-4 flex items-center gap-4 border-2 transition active:scale-[0.99] ${
                isSelected ? "border-royal-500 shadow-[0_8px_24px_-10px_rgba(53,98,224,0.4)]" : "border-transparent shadow-[0_6px_18px_-12px_rgba(10,17,40,0.2)]"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-royal-500/10 flex items-center justify-center text-xl shrink-0">
                {ICONS[opt.type]}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-[14px] font-semibold text-ink-900">{opt.type}</p>
                  {isSelected && <span className="text-success-500 text-[12px] font-semibold">✓</span>}
                </div>
                <p className="text-[12px] text-ink-700/60 mt-1">{opt.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </AppShell>
  );
}
