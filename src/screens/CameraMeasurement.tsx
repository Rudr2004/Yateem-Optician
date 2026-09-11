import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import SecondaryButton from "../components/ui/SecondaryButton";
import SessionGuard from "../components/SessionGuard";
import CapturedFaceFrame from "../components/CapturedFaceFrame";

export default function CameraMeasurement() {
  return (
    <SessionGuard>
      <CameraMeasurementContent />
    </SessionGuard>
  );
}

function CameraMeasurementContent() {
  const navigate = useNavigate();

  return (
    <AppShell showHeader={false}>
      <div className="relative flex-1 bg-navy-950 flex flex-col overflow-hidden min-h-[600px]">
        <div className="flex items-center justify-between px-4 pt-5 pb-3 relative z-10">
          <button
            onClick={() => navigate("/measure/intro")}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center active:bg-white/20"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <span className="text-white text-[12px] font-semibold tracking-[0.15em]">AI FRAME ANALYSIS</span>
          <div className="w-9" />
        </div>

        <div className="flex items-center gap-1.5 justify-center relative z-10">
          <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse-ring" />
          <span className="text-success-500 text-[12px] font-medium">Frame Detected</span>
        </div>

        <div className="flex-1 relative mt-4 mx-5 rounded-3xl overflow-hidden bg-gradient-to-b from-[#1c2444] to-[#0a1128] border border-white/10">
          <div className="absolute inset-0 flex items-center justify-center">
            <CapturedFaceFrame />
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[62%] h-[68%] border-2 border-dashed border-white/25 rounded-[45%]" />

          <div className="absolute left-0 right-0 top-1/2 h-px bg-royal-500/40" />
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-royal-500/40" />

          <div className="absolute inset-x-0 top-0 bottom-0 overflow-hidden rounded-3xl pointer-events-none">
            <div className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-royal-500/25 to-transparent animate-scan-line" />
          </div>

          <div className="absolute bottom-4 inset-x-0 text-center px-6">
            <p className="text-white text-[13px] font-medium">Position the customer's face inside the guide.</p>
            <p className="text-mist-300/70 text-[11px] mt-1">Keep the head straight and look directly at the camera.</p>
          </div>
        </div>

        <div className="px-6 pt-5 pb-[calc(env(safe-area-inset-bottom)+20px)] flex items-center gap-3 relative z-10">
          <SecondaryButton
            fullWidth={false}
            className="flex-1 bg-white/10 border-white/10 text-white"
            onClick={() => navigate("/measure/intro")}
          >
            Cancel
          </SecondaryButton>
          <button
            onClick={() => navigate("/measure/scanning")}
            className="flex-[1.4] min-h-[52px] rounded-2xl bg-gradient-to-r from-royal-600 to-indigo-500 text-white font-semibold text-[14px] shadow-[0_10px_24px_-8px_rgba(53,98,224,0.7)] active:scale-[0.98] transition"
          >
            CAPTURE MEASUREMENT
          </button>
        </div>
      </div>
    </AppShell>
  );
}
