import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import SessionGuard from "../components/SessionGuard";
import PrimaryButton from "../components/ui/PrimaryButton";
import { TINT_COLORS, TINT_OPACITIES } from "../data/mockData";
import { useSession } from "../context/SessionContext";

export default function TintPreview() {
  return (
    <SessionGuard>
      <TintPreviewContent />
    </SessionGuard>
  );
}

function TintPreviewContent() {
  const navigate = useNavigate();
  const { session, setTint } = useSession();
  const [color, setColor] = useState(session?.tint?.color ?? TINT_COLORS[0].name);
  const [opacity, setOpacity] = useState(session?.tint?.opacity ?? 50);
  const [showOriginal, setShowOriginal] = useState(false);

  const activeColor = TINT_COLORS.find((c) => c.name === color) ?? TINT_COLORS[0];

  function handleApply() {
    setTint({ color, opacity });
    navigate("/review");
  }

  return (
    <AppShell
      title="Tint Preview"
      onBack={() => navigate("/thickness")}
      stickyFooter={<PrimaryButton onClick={handleApply}>APPLY TINT</PrimaryButton>}
    >
      <div className="px-5 pt-5">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#3a4166] to-[#0a1128] aspect-[4/5]">
          <div className="absolute inset-0 flex items-center justify-center">
            <FaceWithGlasses tintHex={activeColor.hex} opacity={showOriginal ? 0 : opacity / 100} />
          </div>
          <div className="absolute top-3 left-3 right-3 flex justify-center gap-2">
            <button
              onClick={() => setShowOriginal(false)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold transition ${
                !showOriginal ? "bg-white text-ink-900" : "bg-white/15 text-white"
              }`}
            >
              Tint Preview
            </button>
            <button
              onClick={() => setShowOriginal(true)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold transition ${
                showOriginal ? "bg-white text-ink-900" : "bg-white/15 text-white"
              }`}
            >
              Original
            </button>
          </div>
        </div>

        <p className="text-[13px] font-semibold text-ink-900 mt-6 mb-3">Tint Color</p>
        <div className="flex gap-3">
          {TINT_COLORS.map((c) => (
            <button
              key={c.name}
              onClick={() => setColor(c.name)}
              className="flex flex-col items-center gap-1.5"
              aria-label={c.name}
            >
              <span
                className={`w-11 h-11 rounded-full border-4 transition ${
                  color === c.name ? "border-royal-500 scale-110" : "border-transparent"
                }`}
                style={{ background: c.hex }}
              />
              <span className="text-[10px] text-ink-700/70">{c.name}</span>
            </button>
          ))}
        </div>

        <p className="text-[13px] font-semibold text-ink-900 mt-6 mb-3">Opacity — {opacity}%</p>
        <input
          type="range"
          min={10}
          max={90}
          step={1}
          value={opacity}
          onChange={(e) => setOpacity(Number(e.target.value))}
          className="w-full accent-royal-600"
        />
        <div className="flex justify-between mt-2">
          {TINT_OPACITIES.map((o) => (
            <button
              key={o}
              onClick={() => setOpacity(o)}
              className={`text-[11px] font-medium px-2.5 py-1 rounded-full transition ${
                opacity === o ? "bg-royal-600 text-white" : "bg-mist-200 text-ink-700/70"
              }`}
            >
              {o}%
            </button>
          ))}
        </div>

        <p className="text-[11px] text-ink-700/50 mt-6 pb-6 leading-relaxed">
          Prototype tint preview is simulated for demonstration.
        </p>
      </div>
    </AppShell>
  );
}

function FaceWithGlasses({ tintHex, opacity }: { tintHex: string; opacity: number }) {
  return (
    <svg width="220" height="260" viewBox="0 0 220 260" fill="none">
      <ellipse cx="110" cy="130" rx="72" ry="92" fill="#e8c9a8" opacity="0.9" />
      <path d="M60 100q50-20 100 0" stroke="#5a4632" strokeWidth="4" fill="none" strokeLinecap="round" />
      <ellipse cx="82" cy="128" rx="26" ry="20" fill={tintHex} opacity={opacity} stroke="#2a2a2a" strokeWidth="3" />
      <ellipse cx="138" cy="128" rx="26" ry="20" fill={tintHex} opacity={opacity} stroke="#2a2a2a" strokeWidth="3" />
      <path d="M108 128h4" stroke="#2a2a2a" strokeWidth="3" />
      <path d="M56 122l-14-4M164 122l14-4" stroke="#2a2a2a" strokeWidth="3" strokeLinecap="round" />
      <path d="M90 178q20 10 40 0" stroke="#7a5a45" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}
