import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import SessionGuard from "../components/SessionGuard";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import { useSession } from "../context/SessionContext";

export default function SuccessScreen() {
  return (
    <SessionGuard>
      <SuccessScreenContent />
    </SessionGuard>
  );
}

function SuccessScreenContent() {
  const navigate = useNavigate();
  const { session, clearSession } = useSession();

  return (
    <AppShell showHeader={false}>
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-4 min-h-[600px]">
        <div className="w-20 h-20 rounded-full bg-success-500 text-white flex items-center justify-center text-4xl animate-check-pop shadow-[0_16px_32px_-12px_rgba(31,169,113,0.5)]">
          ✓
        </div>
        <h1 className="text-[20px] font-bold text-ink-900 mt-2">Report Ready</h1>
        <p className="text-[13px] text-ink-700/60 leading-relaxed max-w-[280px]">
          The frame-fitting measurement report is ready to share with the laboratory.
        </p>

        <div className="bg-white rounded-2xl border border-mist-200 px-5 py-3 mt-2">
          <p className="text-[11px] text-ink-700/50">Measurement ID</p>
          <p className="text-[15px] font-bold text-ink-900 mt-0.5">{session?.id}</p>
        </div>

        <div className="w-full flex flex-col gap-2.5 mt-6">
          <PrimaryButton onClick={() => navigate("/share")}>Share Again</PrimaryButton>
          <SecondaryButton
            onClick={() => {
              clearSession();
              navigate("/");
            }}
          >
            Back to Home
          </SecondaryButton>
        </div>
      </div>
    </AppShell>
  );
}
