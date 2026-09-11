import { useState, useEffect } from "react";
import BottomSheet from "./ui/BottomSheet";
import PrimaryButton from "./ui/PrimaryButton";
import SecondaryButton from "./ui/SecondaryButton";
import type { MeasurementField } from "../types";

interface Props {
  field: MeasurementField | null;
  onClose: () => void;
  onSave: (key: string, value: string) => void;
}

export default function MeasurementEditSheet({ field, onClose, onSave }: Props) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (field) setValue(field.value);
  }, [field]);

  return (
    <BottomSheet open={!!field} onClose={onClose} title={field ? `Edit ${field.shortLabel}` : ""}>
      {field && (
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-[12px] text-ink-700/60 mb-1">Current Value</p>
            <p className="text-[15px] font-semibold text-ink-900">
              {field.value} {field.unit}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <input
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              inputMode="decimal"
              className="flex-1 min-h-[52px] px-4 rounded-2xl border border-mist-300 text-[16px] font-medium focus:outline-none focus:ring-2 focus:ring-royal-500/40"
            />
            <span className="text-[14px] text-ink-700/60 font-medium">{field.unit}</span>
          </div>
          <p className="text-[11px] text-ink-700/50">Tolerance: {field.tolerance}</p>
          <div className="flex gap-3 mt-2">
            <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
            <PrimaryButton
              onClick={() => {
                onSave(field.key, value);
                onClose();
              }}
            >
              Save
            </PrimaryButton>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}
