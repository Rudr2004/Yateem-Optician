import type { ValidationStatus } from "../../types";

const CONFIG: Record<ValidationStatus, { label: string; bg: string; text: string; icon: string }> = {
  ok: { label: "Within tolerance", bg: "bg-success-500/10", text: "text-success-500", icon: "✓" },
  review: { label: "Review required", bg: "bg-warn-500/10", text: "text-warn-500", icon: "⚠" },
  invalid: { label: "Invalid", bg: "bg-danger-500/10", text: "text-danger-500", icon: "✕" },
};

export default function StatusBadge({ status }: { status: ValidationStatus }) {
  const cfg = CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full ${cfg.bg} ${cfg.text}`}>
      <span>{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}
