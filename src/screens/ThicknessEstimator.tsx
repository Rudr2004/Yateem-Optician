import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import SessionGuard from "../components/SessionGuard";
import PrimaryButton from "../components/ui/PrimaryButton";
import { LENS_INDEX_OPTIONS } from "../data/mockData";
import { useSession } from "../context/SessionContext";

export default function ThicknessEstimator() {
  return (
    <SessionGuard>
      <ThicknessEstimatorContent />
    </SessionGuard>
  );
}

function ThicknessEstimatorContent() {
  const navigate = useNavigate();
  const { session, setThicknessInput, setThicknessResult } = useSession();
  const [input, setInput] = useState(
    session?.thicknessInput ?? {
      sphere: "-2.00",
      cylinder: "-0.50",
      axis: "90",
      frameWidth: "52",
      frameHeight: "40",
      dbl: "18",
      index: "1.60",
    }
  );
  const [showResult, setShowResult] = useState(!!session?.thicknessResult);

  function handleEstimate() {
    setThicknessInput(input);
    const result = { centerThickness: "2.4 mm", edgeThickness: "5.8 mm", recommendedIndex: "1.60 Index" };
    setThicknessResult(result);
    setShowResult(true);
  }

  function update(key: keyof typeof input, value: string) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <AppShell
      title="Lens Thickness"
      onBack={() => navigate("/coatings")}
      stickyFooter={
        showResult ? (
          <PrimaryButton onClick={() => navigate("/tint")}>CONTINUE</PrimaryButton>
        ) : (
          <PrimaryButton onClick={handleEstimate}>ESTIMATE THICKNESS</PrimaryButton>
        )
      }
    >
      <div className="px-5 pt-5 pb-2">
        <p className="text-[13px] text-ink-700/60">Estimate lens thickness before final laboratory calculation.</p>
      </div>

      <div className="px-5 pt-4 flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-2.5">
          <MiniField label="Sphere" value={input.sphere} onChange={(v) => update("sphere", v)} />
          <MiniField label="Cylinder" value={input.cylinder} onChange={(v) => update("cylinder", v)} />
          <MiniField label="Axis" value={input.axis} onChange={(v) => update("axis", v)} />
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          <MiniField label="Frame W" value={input.frameWidth} onChange={(v) => update("frameWidth", v)} />
          <MiniField label="Frame H" value={input.frameHeight} onChange={(v) => update("frameHeight", v)} />
          <MiniField label="DBL" value={input.dbl} onChange={(v) => update("dbl", v)} />
        </div>

        <div>
          <p className="text-[13px] font-semibold text-ink-900 mb-2">Lens Index</p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {LENS_INDEX_OPTIONS.map((idx) => (
              <button
                key={idx}
                onClick={() => update("index", idx)}
                className={`shrink-0 px-4 py-2.5 rounded-full text-[13px] font-semibold transition ${
                  input.index === idx ? "bg-royal-600 text-white" : "bg-white border border-mist-300 text-ink-700"
                }`}
              >
                {idx}
              </button>
            ))}
          </div>
        </div>

        {showResult && session?.thicknessResult && (
          <div className="mt-2 bg-gradient-to-br from-navy-900 to-navy-950 rounded-3xl p-5 text-white">
            <div className="flex justify-center py-4">
              <LensCrossSection />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="bg-white/8 rounded-2xl p-3.5">
                <p className="text-[11px] text-mist-300/70">Center Thickness</p>
                <p className="text-[18px] font-bold mt-1">{session.thicknessResult.centerThickness}</p>
              </div>
              <div className="bg-white/8 rounded-2xl p-3.5">
                <p className="text-[11px] text-mist-300/70">Edge Thickness</p>
                <p className="text-[18px] font-bold mt-1">{session.thicknessResult.edgeThickness}</p>
              </div>
            </div>
            <div className="mt-3 bg-gold-500/15 rounded-2xl p-3.5 flex items-center justify-between">
              <span className="text-[12px] text-gold-500 font-medium">Recommended</span>
              <span className="text-[13px] font-bold text-gold-500">{session.thicknessResult.recommendedIndex}</span>
            </div>
          </div>
        )}

        <p className="text-[11px] text-ink-700/50 leading-relaxed pb-6">
          This is an estimate for customer consultation. Final lens thickness is determined by laboratory calculations.
        </p>
      </div>
    </AppShell>
  );
}

function MiniField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-medium text-ink-700/60">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        inputMode="decimal"
        className="min-h-[46px] px-3 rounded-xl border border-mist-300 bg-white text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-royal-500/40"
      />
    </label>
  );
}

function LensCrossSection() {
  return (
    <svg width="160" height="80" viewBox="0 0 160 80" fill="none">
      <path
        d="M10 40 Q40 6 80 6 Q120 6 150 40 Q120 74 80 74 Q40 74 10 40 Z"
        fill="url(#lensGrad)"
        stroke="#4f5fe0"
        strokeWidth="1.5"
      />
      <path d="M25 40 Q50 20 80 20 Q110 20 135 40 Q110 60 80 60 Q50 60 25 40 Z" fill="#0a1128" opacity="0.3" />
      <defs>
        <linearGradient id="lensGrad" x1="0" y1="0" x2="160" y2="80">
          <stop offset="0%" stopColor="#3562e0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4f5fe0" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  );
}
