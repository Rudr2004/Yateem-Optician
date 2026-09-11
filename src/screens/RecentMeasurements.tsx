import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import { RECENT_MEASUREMENTS } from "../data/mockData";

export default function RecentMeasurements() {
  const navigate = useNavigate();

  return (
    <AppShell title="Recent Measurements" onBack={() => navigate("/")} showBottomNav>
      <div className="px-5 pt-5 pb-6 flex flex-col gap-3">
        {RECENT_MEASUREMENTS.map((item) => (
          <div key={item.reference} className="bg-white rounded-2xl border border-mist-200 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[14px] font-semibold text-ink-900">{item.customer}</p>
                <p className="text-[11px] text-ink-700/60 mt-0.5">{item.reference}</p>
              </div>
              <span
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                  item.status === "Completed" ? "bg-success-500/10 text-success-500" : "bg-warn-500/10 text-warn-500"
                }`}
              >
                {item.status === "Completed" ? "✓ Completed" : "Draft"}
              </span>
            </div>
            <p className="text-[12px] text-ink-700/70 mt-2">
              {item.frame} · {item.date}
            </p>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 min-h-[38px] rounded-xl bg-mist-100 text-[12px] font-semibold text-ink-900 active:bg-mist-200 transition">
                View
              </button>
              <button className="flex-1 min-h-[38px] rounded-xl bg-royal-500/10 text-[12px] font-semibold text-royal-600 active:bg-royal-500/20 transition">
                Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
