import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import { PRICE_LIST } from "../data/mockData";

const CATEGORIES = ["All", "Frames", "Single Vision", "Progressive", "Computer", "Anti-Fatigue", "Coatings", "Tint", "Lens Materials"];

export default function PriceList() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return PRICE_LIST.filter((item) => {
      const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || item.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <AppShell title="Price List" onBack={() => navigate("/")} showBottomNav>
      <div className="px-5 pt-4 pb-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search price list..."
          className="w-full min-h-[48px] px-4 rounded-2xl border border-mist-300 bg-white text-[14px] focus:outline-none focus:ring-2 focus:ring-royal-500/40"
        />
        <div className="flex gap-2 overflow-x-auto no-scrollbar mt-3 pb-1">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`shrink-0 px-3.5 py-2 rounded-full text-[12px] font-medium transition ${
                category === c ? "bg-royal-600 text-white" : "bg-white border border-mist-300 text-ink-700"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pt-2 pb-4 flex flex-col gap-2">
        {filtered.map((item) => (
          <div key={item.name} className="flex items-center justify-between bg-white rounded-xl border border-mist-200 px-4 py-3">
            <div>
              <p className="text-[13px] font-semibold text-ink-900">{item.name}</p>
              <p className="text-[10px] text-ink-700/50 mt-0.5">{item.category}</p>
            </div>
            <p className="text-[13px] font-bold text-royal-600">{item.price}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-[13px] text-ink-700/50 py-10">No items match your search.</p>
        )}
      </div>

      <div className="px-5 pb-6">
        <button className="w-full min-h-[48px] rounded-2xl bg-mist-200 text-ink-900 font-semibold text-[13px] active:bg-mist-300 transition">
          View Full Price List
        </button>
      </div>
    </AppShell>
  );
}
