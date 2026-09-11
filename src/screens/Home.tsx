import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useSession } from "../context/SessionContext";

export default function Home() {
  const navigate = useNavigate();
  const { startSession } = useSession();

  return (
    <AppShell showHeader={false} showBottomNav>
      <div className="px-5 pt-8 pb-6 bg-gradient-to-b from-navy-900 to-navy-950 text-white rounded-b-[32px]">
        <p className="text-[13px] tracking-[0.25em] text-gold-500 font-medium uppercase">Yateem Optician</p>
        <h1 className="text-[26px] font-bold mt-1">Smart Fit</h1>
        <p className="text-[13px] text-mist-300/80 mt-1">Professional Frame Fitting</p>

        <div className="mt-7 bg-white/8 border border-white/10 rounded-3xl p-5 backdrop-blur-sm">
          <h2 className="text-[17px] font-semibold leading-snug">Ready for your next fitting?</h2>
          <p className="text-[13px] text-mist-300/80 mt-2 leading-relaxed">
            Capture frame-fitting measurements and prepare a complete lens specification.
          </p>
          <div className="mt-5">
            <PrimaryButton
              onClick={() => {
                startSession();
                navigate("/customer");
              }}
            >
              START NEW MEASUREMENT
            </PrimaryButton>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate("/recent")}
          className="bg-white rounded-2xl p-4 text-left shadow-[0_8px_24px_-12px_rgba(10,17,40,0.25)] active:scale-[0.98] transition"
        >
          <div className="w-10 h-10 rounded-xl bg-royal-500/10 flex items-center justify-center text-lg">🗂️</div>
          <p className="text-[13px] font-semibold text-ink-900 mt-3">Recent Measurements</p>
          <p className="text-[11px] text-ink-700/60 mt-0.5">View past fittings</p>
        </button>
        <button
          onClick={() => navigate("/price-list")}
          className="bg-white rounded-2xl p-4 text-left shadow-[0_8px_24px_-12px_rgba(10,17,40,0.25)] active:scale-[0.98] transition"
        >
          <div className="w-10 h-10 rounded-xl bg-gold-500/15 flex items-center justify-center text-lg">💳</div>
          <p className="text-[13px] font-semibold text-ink-900 mt-3">Price List</p>
          <p className="text-[11px] text-ink-700/60 mt-0.5">Frames, lenses & coatings</p>
        </button>
      </div>

      <div className="px-5 mt-6">
        <p className="text-[13px] font-semibold text-ink-900 mb-3">Today's Measurements</p>
        <div className="bg-white rounded-2xl p-5 shadow-[0_8px_24px_-12px_rgba(10,17,40,0.2)] grid grid-cols-3 divide-x divide-mist-200">
          <div className="text-center">
            <p className="text-[22px] font-bold text-ink-900">12</p>
            <p className="text-[11px] text-ink-700/60 mt-0.5">Total</p>
          </div>
          <div className="text-center">
            <p className="text-[22px] font-bold text-success-500">9</p>
            <p className="text-[11px] text-ink-700/60 mt-0.5">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-[22px] font-bold text-warn-500">3</p>
            <p className="text-[11px] text-ink-700/60 mt-0.5">Drafts</p>
          </div>
        </div>
      </div>

      <div className="h-8" />
    </AppShell>
  );
}
