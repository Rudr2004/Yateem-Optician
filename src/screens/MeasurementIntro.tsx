import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import PrimaryButton from "../components/ui/PrimaryButton";
import SessionGuard from "../components/SessionGuard";
import { useSession } from "../context/SessionContext";

const CHECKLIST = [
  "Monocular PD",
  "Near PD",
  "Fitting Height",
  "Pantoscopic Tilt",
  "Wrap Angle",
  "Back Vertex Distance",
  "Lens Diameter",
  "Reading Distance",
];

export default function MeasurementIntro() {
  return (
    <SessionGuard>
      <MeasurementIntroContent />
    </SessionGuard>
  );
}

function MeasurementIntroContent() {
  const navigate = useNavigate();
  const { session } = useSession();

  return (
    <AppShell
      title="Frame Measurement"
      onBack={() => navigate("/frame-selection")}
      stickyFooter={
        <div className="flex flex-col gap-2">
          <PrimaryButton onClick={() => navigate("/measure/camera")}>START CAMERA MEASUREMENT</PrimaryButton>
          <p className="text-center text-[11px] text-ink-700/50 px-4 leading-relaxed">
            Follow the on-screen positioning guidance for the best measurement result.
          </p>
        </div>
      }
    >
      <div className="px-5 pt-5 pb-6">
        <p className="text-[13px] text-ink-700/60">Let's capture the customer's frame fit.</p>

        <div className="mt-5 rounded-3xl bg-gradient-to-br from-navy-900 to-navy-950 p-6 flex items-center justify-center">
          <FaceFrameIllustration />
        </div>

        <div className="mt-6 flex items-center gap-3 bg-success-500/10 rounded-2xl px-4 py-3">
          <span className="text-success-500 text-[15px]">✓</span>
          <div>
            <p className="text-[13px] font-semibold text-ink-900">Frame selected</p>
            <p className="text-[11px] text-ink-700/60 mt-0.5">
              {session?.frame?.name} · A {session?.frame?.a} · B {session?.frame?.b} · DBL {session?.frame?.dbl} mm
            </p>
          </div>
        </div>

        <p className="text-[13px] font-semibold text-ink-900 mt-6 mb-3">Measurements to capture</p>
        <div className="grid grid-cols-2 gap-2.5">
          {CHECKLIST.map((item) => (
            <div key={item} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 border border-mist-200">
              <span className="w-4 h-4 rounded-full border-2 border-mist-300 shrink-0" />
              <span className="text-[12px] text-ink-700">{item}</span>
            </div>
          ))}
        </div>

        <p className="text-[13px] font-semibold text-ink-900 mt-6 mb-3">Tolerance reference</p>
        <div className="bg-white rounded-2xl border border-mist-200 divide-y divide-mist-200">
          <ToleranceRow label="PD" value="±0.5 mm" />
          <ToleranceRow label="Fitting Height" value="±1.0 mm" />
          <ToleranceRow label="Angles" value="±1–2°" />
        </div>

        <p className="text-[11px] text-ink-700/50 mt-5 leading-relaxed">
          Prototype measurement values are simulated for demonstration.
        </p>
      </div>
    </AppShell>
  );
}

function ToleranceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <span className="text-[13px] text-ink-700">{label}</span>
      <span className="text-[13px] font-semibold text-ink-900">{value}</span>
    </div>
  );
}

function FaceFrameIllustration() {
  return (
    <svg width="180" height="140" viewBox="0 0 180 140" fill="none">
      <ellipse cx="90" cy="70" rx="50" ry="60" stroke="#4f5fe0" strokeWidth="1.5" opacity="0.5" />
      <circle cx="62" cy="65" r="16" stroke="#c9a15a" strokeWidth="2.5" />
      <circle cx="118" cy="65" r="16" stroke="#c9a15a" strokeWidth="2.5" />
      <path d="M78 65h24" stroke="#c9a15a" strokeWidth="2.5" />
      <path d="M46 60l-10-4M134 60l10-4" stroke="#c9a15a" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="62" cy="65" r="3" fill="white" />
      <circle cx="118" cy="65" r="3" fill="white" />
      <path d="M60 100q30 14 60 0" stroke="#4f5fe0" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}
