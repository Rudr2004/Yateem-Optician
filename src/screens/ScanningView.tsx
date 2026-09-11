import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import SessionGuard from "../components/SessionGuard";
import CapturedFaceFrame from "../components/CapturedFaceFrame";
import { generateMeasurements } from "../data/mockData";
import { useSession } from "../context/SessionContext";

const STEPS = [
  "Detecting Face",
  "Detecting Frame",
  "Locating Pupils",
  "Analyzing Frame Geometry",
  "Calculating Measurements",
];

export default function ScanningView() {
  return (
    <SessionGuard>
      <ScanningViewContent />
    </SessionGuard>
  );
}

function ScanningViewContent() {
  const navigate = useNavigate();
  const { session, setMeasurements } = useSession();
  const [completedSteps, setCompletedSteps] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCompletedSteps((prev) => (prev < STEPS.length ? prev + 1 : prev));
    }, 460);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 4, 100));
    }, 100);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100 && session?.frame) {
      const timeout = setTimeout(() => {
        setMeasurements(generateMeasurements(session.frame!));
        navigate("/measure/results");
      }, 350);
      return () => clearTimeout(timeout);
    }
  }, [progress, session, setMeasurements, navigate]);

  return (
    <AppShell showHeader={false}>
      <div className="flex-1 bg-navy-950 flex flex-col overflow-hidden min-h-[600px]">
        <div className="flex items-center justify-center pt-5 pb-3">
          <span className="text-white text-[12px] font-semibold tracking-[0.15em]">AI FRAME ANALYSIS</span>
        </div>

        <div className="relative mx-5 rounded-3xl overflow-hidden bg-gradient-to-b from-[#1c2444] to-[#0a1128] border border-white/10 aspect-[4/5] shrink-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <CapturedFaceFrame />
          </div>

          <div className="absolute inset-x-6 top-6 bottom-6 border border-royal-500/30 rounded-[32px]" />

          <div className="absolute top-3 left-3 bg-black/40 rounded-full px-2.5 py-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-danger-500 animate-pulse-ring" />
            <span className="text-white text-[9px] font-semibold tracking-wide">CAPTURED</span>
          </div>

          <div className="absolute inset-x-0 top-0 bottom-0 overflow-hidden pointer-events-none">
            <div className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-royal-500/30 to-transparent animate-scan-line" />
          </div>

          {completedSteps >= 2 && (
            <>
              <Callout x="24%" y="46%" label="L" delay={0} />
              <Callout x="63%" y="46%" label="R" delay={150} />
            </>
          )}
          {completedSteps >= 4 && <Callout x="50%" y="72%" label="DBL" delay={0} />}
        </div>

        <div className="px-6 pt-5 flex flex-col items-center">
          <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
            <svg className="absolute inset-0 -rotate-90" width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" stroke="#1c3a7a" strokeWidth="5" fill="none" />
              <circle
                cx="40"
                cy="40"
                r="34"
                stroke="#3562e0"
                strokeWidth="5"
                fill="none"
                strokeDasharray={2 * Math.PI * 34}
                strokeDashoffset={2 * Math.PI * 34 * (1 - progress / 100)}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.1s linear" }}
              />
            </svg>
            <span className="text-white text-[15px] font-bold">{progress}%</span>
          </div>

          <h2 className="text-white text-[15px] font-semibold mt-3">Analyzing Frame...</h2>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-6 pt-4 pb-6">
          <div className="flex flex-col gap-2.5">
            {STEPS.map((step, idx) => {
              const isDone = idx < completedSteps;
              const isActive = idx === completedSteps;
              return (
                <div key={step} className="flex items-center gap-3">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                      isDone
                        ? "bg-success-500 text-white animate-check-pop"
                        : isActive
                        ? "bg-royal-500/30 text-royal-500 animate-pulse-ring"
                        : "bg-white/10 text-white/30"
                    }`}
                  >
                    {isDone ? "✓" : ""}
                  </span>
                  <span className={`text-[12px] ${isDone ? "text-white" : isActive ? "text-mist-300" : "text-white/30"}`}>
                    {step}
                    {isDone && <span className="text-success-500 ml-2 text-[10px]">Complete</span>}
                    {isActive && <span className="ml-2 text-[10px] text-royal-400">...</span>}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Callout({ x, y, label, delay }: { x: string; y: string; label: string; delay: number }) {
  return (
    <div
      className="absolute animate-fade-in-up"
      style={{ left: x, top: y, animationDelay: `${delay}ms` }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
        <span className="bg-black/60 text-gold-500 text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-gold-500/40">
          {label}
        </span>
      </div>
    </div>
  );
}
