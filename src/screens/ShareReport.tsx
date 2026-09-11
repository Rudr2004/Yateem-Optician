import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import SessionGuard from "../components/SessionGuard";
import BottomSheet from "../components/ui/BottomSheet";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useSession } from "../context/SessionContext";

const OPTIONS = [
  { key: "email", label: "Email", icon: "✉️" },
  { key: "whatsapp", label: "WhatsApp", icon: "💬" },
  { key: "print", label: "Print", icon: "🖨️" },
  { key: "pdf", label: "Save PDF", icon: "📄" },
];

export default function ShareReport() {
  return (
    <SessionGuard>
      <ShareReportContent />
    </SessionGuard>
  );
}

function ShareReportContent() {
  const navigate = useNavigate();
  const { session } = useSession();
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState(true);

  function handleDone() {
    navigate("/success");
  }

  return (
    <AppShell title="Share Report" onBack={() => navigate("/report")}>
      <div className="px-5 pt-10 pb-6 flex flex-col items-center text-center gap-3">
        <div className="w-16 h-16 rounded-2xl bg-royal-500/10 flex items-center justify-center text-2xl">📋</div>
        <p className="text-[14px] font-semibold text-ink-900">{session?.id}</p>
        <p className="text-[12px] text-ink-700/60">Choose how you'd like to share this measurement report.</p>
        <button
          onClick={() => setOpen(true)}
          className="mt-2 text-[13px] font-semibold text-royal-500"
        >
          Open Share Options
        </button>
      </div>

      <BottomSheet open={open && !selected} onClose={() => setOpen(false)} title="Share Report">
        <div className="grid grid-cols-2 gap-3">
          {OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSelected(opt.key)}
              className="flex flex-col items-center gap-2 bg-mist-100 rounded-2xl py-5 active:scale-[0.97] transition"
            >
              <span className="text-2xl">{opt.icon}</span>
              <span className="text-[12px] font-semibold text-ink-900">{opt.label}</span>
            </button>
          ))}
        </div>
      </BottomSheet>

      <BottomSheet open={!!selected} onClose={() => setSelected(null)} title="Report Ready">
        <div className="flex flex-col items-center text-center gap-3 py-2">
          <div className="w-14 h-14 rounded-full bg-success-500/10 text-success-500 flex items-center justify-center text-2xl animate-check-pop">
            ✓
          </div>
          <p className="text-[14px] font-semibold text-ink-900">Report Ready</p>
          <p className="text-[12px] text-ink-700/60">Measurement report prepared successfully.</p>
          <div className="w-full mt-3">
            <PrimaryButton onClick={handleDone}>Done</PrimaryButton>
          </div>
        </div>
      </BottomSheet>
    </AppShell>
  );
}
