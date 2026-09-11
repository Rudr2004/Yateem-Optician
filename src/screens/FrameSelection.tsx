import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import PrimaryButton from "../components/ui/PrimaryButton";
import SessionGuard from "../components/SessionGuard";
import { FRAMES } from "../data/mockData";
import { useSession } from "../context/SessionContext";
import type { Frame } from "../types";

const FILTERS = ["All", "Full Rim", "Semi Rimless", "Metal", "Acetate"];

export default function FrameSelection() {
  return (
    <SessionGuard>
      <FrameSelectionContent />
    </SessionGuard>
  );
}

function FrameSelectionContent() {
  const navigate = useNavigate();
  const { session, setFrame } = useSession();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedId, setSelectedId] = useState<string | null>(session?.frame?.id ?? null);

  const filtered = useMemo(() => {
    return FRAMES.filter((f) => {
      const matchesQuery = f.name.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter === "All" || f.rimType === filter || f.material === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  const selectedFrame = FRAMES.find((f) => f.id === selectedId) ?? null;

  function handleSelect(frame: Frame) {
    setSelectedId(frame.id);
  }

  function handleContinue() {
    if (!selectedFrame) return;
    setFrame(selectedFrame);
    navigate("/measure/intro");
  }

  return (
    <AppShell
      title="Select Frame"
      onBack={() => navigate("/customer")}
      stickyFooter={
        <div>
          {selectedFrame && (
            <div className="mb-3 flex items-center justify-between bg-white rounded-2xl border border-mist-300 px-4 py-3">
              <div>
                <p className="text-[13px] font-semibold text-ink-900">{selectedFrame.name}</p>
                <p className="text-[11px] text-ink-700/60 mt-0.5">
                  A {selectedFrame.a} · B {selectedFrame.b} · DBL {selectedFrame.dbl} mm
                </p>
              </div>
              <span className="text-success-500 text-[12px] font-semibold">✓ Selected</span>
            </div>
          )}
          <PrimaryButton disabled={!selectedFrame} onClick={handleContinue}>
            CONTINUE TO MEASUREMENT
          </PrimaryButton>
        </div>
      }
    >
      <div className="px-5 pt-4 pb-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search frames..."
          className="w-full min-h-[48px] px-4 rounded-2xl border border-mist-300 bg-white text-[14px] focus:outline-none focus:ring-2 focus:ring-royal-500/40"
        />
        <div className="flex gap-2 overflow-x-auto no-scrollbar mt-3 pb-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 px-3.5 py-2 rounded-full text-[12px] font-medium transition ${
                filter === f ? "bg-royal-600 text-white" : "bg-white border border-mist-300 text-ink-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pt-2 pb-6 flex flex-col gap-3">
        {filtered.map((frame) => {
          const isSelected = frame.id === selectedId;
          return (
            <button
              key={frame.id}
              onClick={() => handleSelect(frame)}
              className={`text-left bg-white rounded-2xl p-4 flex gap-4 items-center border-2 transition active:scale-[0.99] ${
                isSelected ? "border-royal-500 shadow-[0_8px_24px_-10px_rgba(53,98,224,0.4)]" : "border-transparent shadow-[0_6px_18px_-12px_rgba(10,17,40,0.25)]"
              }`}
            >
              <div
                className="w-16 h-16 rounded-xl shrink-0 flex items-center justify-center text-white text-[10px] font-semibold"
                style={{ background: `linear-gradient(135deg, ${frame.colorFrom}, ${frame.colorTo})` }}
              >
                <FrameGlyph />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[14px] font-semibold text-ink-900 truncate">{frame.name}</p>
                  {isSelected && <span className="text-success-500 text-[12px] font-semibold shrink-0">✓ Selected</span>}
                </div>
                <p className="text-[11px] text-ink-700/60 mt-0.5">
                  {frame.id} · {frame.rimType} · {frame.material}
                </p>
                <p className="text-[11px] text-ink-700/70 mt-1.5 font-medium">
                  A {frame.a} mm &nbsp;·&nbsp; B {frame.b} mm &nbsp;·&nbsp; DBL {frame.dbl} mm
                </p>
              </div>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-center text-[13px] text-ink-700/50 py-10">No frames match your search.</p>
        )}
      </div>
    </AppShell>
  );
}

function FrameGlyph() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <circle cx="7" cy="12" r="4" stroke="white" strokeWidth="1.6" />
      <circle cx="17" cy="12" r="4" stroke="white" strokeWidth="1.6" />
      <path d="M11 12h2" stroke="white" strokeWidth="1.6" />
    </svg>
  );
}
