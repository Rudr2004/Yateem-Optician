import type { ReactNode } from "react";

export default function MobileDeviceFrame({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_20%,#1c3a7a_0%,#0a1128_55%,#05070f_100%)] p-3">
      <div className="hidden lg:flex flex-col items-center mr-14 text-mist-200/70 select-none">
        <span className="text-2xl font-semibold tracking-wide text-white">Yateem Optician</span>
        <span className="text-sm mt-1 tracking-[0.2em] uppercase text-gold-500">Smart Fit</span>
        <span className="text-xs mt-6 text-mist-300/60 max-w-[220px] text-center leading-relaxed">
          Mobile application preview.
        </span>
      </div>
      <div
        className="relative bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.06)]"
        style={{
          width: "min(90vw, 410px, 46.15vh)",
          height: "min(96vh, 864px, 215.9vw)",
          aspectRatio: "390 / 844",
          padding: "min(1.2vh, 10px)",
          borderRadius: "min(6vh, 44px)",
        }}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 bg-black rounded-b-2xl z-20"
          style={{ top: "min(1.2vh, 10px)", width: "30%", height: "min(3vh, 26px)" }}
        />
        <div className="relative w-full h-full bg-mist-100 overflow-hidden" style={{ borderRadius: "min(5vh, 36px)" }}>
          <div className="w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar">{children}</div>
        </div>
      </div>
    </div>
  );
}
