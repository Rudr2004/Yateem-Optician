import StatusBadge from "./ui/StatusBadge";
import type { MeasurementField } from "../types";

interface Props {
  field: MeasurementField;
  onEdit: (field: MeasurementField) => void;
  onInfo: (field: MeasurementField) => void;
  index: number;
}

export default function MeasurementCard({ field, onEdit, onInfo, index }: Props) {
  return (
    <div
      className="bg-white rounded-2xl border border-mist-200 p-4 animate-fade-in-up"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <p className="text-[12px] font-semibold text-ink-700 truncate" title={field.label}>
            {field.shortLabel}
          </p>
          <button
            onClick={() => onInfo(field)}
            aria-label={`Info about ${field.label}`}
            className="w-5 h-5 rounded-full bg-mist-200 text-ink-700/60 text-[10px] font-bold flex items-center justify-center shrink-0"
          >
            i
          </button>
        </div>
        <button
          onClick={() => onEdit(field)}
          aria-label={`Edit ${field.label}`}
          className="w-8 h-8 rounded-full bg-mist-100 flex items-center justify-center shrink-0 active:bg-mist-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 20h4l10-10-4-4L4 16v4z"
              stroke="#3a3f5c"
              strokeWidth="1.8"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <p className="text-[22px] font-bold text-ink-900 mt-2">
        {field.value}
        <span className="text-[13px] font-medium text-ink-700/50 ml-1">{field.unit}</span>
      </p>
      <p className="text-[10px] text-ink-700/50 mt-0.5">Tol. {field.tolerance}</p>
      <div className="mt-2">
        <StatusBadge status={field.status} />
      </div>
    </div>
  );
}
