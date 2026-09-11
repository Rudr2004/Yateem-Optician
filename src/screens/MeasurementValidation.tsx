import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import SessionGuard from "../components/SessionGuard";
import MeasurementEditSheet from "../components/MeasurementEditSheet";
import StatusBadge from "../components/ui/StatusBadge";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import { useSession } from "../context/SessionContext";
import type { MeasurementField } from "../types";

export default function MeasurementValidation() {
  return (
    <SessionGuard>
      <MeasurementValidationContent />
    </SessionGuard>
  );
}

function MeasurementValidationContent() {
  const navigate = useNavigate();
  const { session, updateMeasurement } = useSession();
  const [editField, setEditField] = useState<MeasurementField | null>(null);

  const measurements = session?.measurements ?? [];
  const reviewItems = useMemo(() => measurements.filter((m) => m.status !== "ok"), [measurements]);
  const allValid = reviewItems.length === 0;

  function acceptAll() {
    reviewItems.forEach((m) => updateMeasurement(m.key, m.value));
  }

  return (
    <AppShell
      title="Review Measurements"
      onBack={() => navigate("/measure/results")}
      stickyFooter={
        <PrimaryButton
          disabled={!allValid}
          onClick={() => navigate("/lens")}
        >
          CONTINUE TO LENS
        </PrimaryButton>
      }
    >
      <div className="px-5 pt-5 pb-2">
        <div className="flex items-center gap-3 bg-white rounded-2xl border border-mist-200 px-4 py-3.5">
          <span className="text-[14px] font-semibold text-ink-900">✓ {measurements.length} measurements captured</span>
        </div>

        {allValid ? (
          <div className="mt-4 bg-success-500/10 rounded-2xl px-4 py-3.5 text-[13px] text-success-500 font-medium">
            All measurements are ready for review.
          </div>
        ) : (
          <div className="mt-4 bg-warn-500/10 rounded-2xl px-4 py-3.5 text-[13px] text-warn-500 font-medium">
            ⚠ Review Required — {reviewItems.length} measurement(s) need attention
          </div>
        )}
      </div>

      {!allValid && (
        <div className="px-5 pt-3 pb-4 flex flex-col gap-3">
          {reviewItems.map((field) => (
            <div key={field.key} className="bg-white rounded-2xl border border-warn-500/30 p-4">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold text-ink-900">{field.label}</p>
                <StatusBadge status={field.status} />
              </div>
              <p className="text-[20px] font-bold text-ink-900 mt-2">
                {field.value} <span className="text-[12px] font-medium text-ink-700/50">{field.unit}</span>
              </p>
              <div className="flex gap-2 mt-3">
                <SecondaryButton fullWidth={false} className="flex-1 !min-h-[42px] text-[13px]" onClick={() => setEditField(field)}>
                  Edit
                </SecondaryButton>
                <SecondaryButton
                  fullWidth={false}
                  className="flex-1 !min-h-[42px] text-[13px]"
                  onClick={() => navigate("/measure/camera")}
                >
                  Retake
                </SecondaryButton>
                <button
                  onClick={() => updateMeasurement(field.key, field.value)}
                  className="flex-1 min-h-[42px] rounded-2xl bg-success-500 text-white text-[13px] font-semibold active:scale-[0.98] transition"
                >
                  Accept
                </button>
              </div>
            </div>
          ))}
          <button onClick={acceptAll} className="text-[12px] text-royal-500 font-semibold text-center py-2">
            Accept all values as-is
          </button>
        </div>
      )}

      {allValid && (
        <div className="px-5 pb-6 flex flex-col gap-2.5">
          {measurements.map((field) => (
            <div key={field.key} className="flex items-center justify-between bg-white rounded-xl border border-mist-200 px-4 py-3">
              <span className="text-[12px] text-ink-700">{field.shortLabel}</span>
              <span className="text-[13px] font-semibold text-ink-900">
                {field.value} {field.unit}
              </span>
            </div>
          ))}
        </div>
      )}

      <MeasurementEditSheet field={editField} onClose={() => setEditField(null)} onSave={updateMeasurement} />
    </AppShell>
  );
}
