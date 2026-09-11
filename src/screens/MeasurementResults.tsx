import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import SessionGuard from "../components/SessionGuard";
import MeasurementCard from "../components/MeasurementCard";
import MeasurementEditSheet from "../components/MeasurementEditSheet";
import BottomSheet from "../components/ui/BottomSheet";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useSession } from "../context/SessionContext";
import type { MeasurementField } from "../types";

export default function MeasurementResults() {
  return (
    <SessionGuard>
      <MeasurementResultsContent />
    </SessionGuard>
  );
}

function MeasurementResultsContent() {
  const navigate = useNavigate();
  const { session, updateMeasurement } = useSession();
  const [editField, setEditField] = useState<MeasurementField | null>(null);
  const [infoField, setInfoField] = useState<MeasurementField | null>(null);

  const measurements = session?.measurements ?? [];

  return (
    <AppShell
      title="Measurement Complete"
      onBack={() => navigate("/measure/camera")}
      stickyFooter={<PrimaryButton onClick={() => navigate("/measure/validate")}>Continue</PrimaryButton>}
    >
      <div className="px-5 pt-5 pb-2">
        <div className="flex items-center gap-3 bg-success-500/10 rounded-2xl px-4 py-3.5">
          <span className="w-8 h-8 rounded-full bg-success-500 text-white flex items-center justify-center text-[14px] animate-check-pop">
            ✓
          </span>
          <p className="text-[13px] font-semibold text-ink-900">Frame Measurement Captured</p>
        </div>
        <p className="text-[11px] text-ink-700/50 mt-3 leading-relaxed">
          Prototype measurement values are simulated for demonstration.
        </p>
      </div>

      <div className="px-5 pt-3 pb-6 grid grid-cols-2 gap-3">
        {measurements.map((field, idx) => (
          <MeasurementCard key={field.key} field={field} index={idx} onEdit={setEditField} onInfo={setInfoField} />
        ))}
      </div>

      <MeasurementEditSheet field={editField} onClose={() => setEditField(null)} onSave={updateMeasurement} />

      <BottomSheet open={!!infoField} onClose={() => setInfoField(null)} title={infoField?.label ?? ""}>
        <p className="text-[14px] text-ink-700 leading-relaxed">{infoField?.definition}</p>
        <p className="text-[11px] text-ink-700/50 mt-4">Tolerance: {infoField?.tolerance}</p>
      </BottomSheet>
    </AppShell>
  );
}
