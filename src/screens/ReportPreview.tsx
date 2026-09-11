import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import SessionGuard from "../components/SessionGuard";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import Modal from "../components/ui/Modal";
import { useSession } from "../context/SessionContext";

export default function ReportPreview() {
  return (
    <SessionGuard>
      <ReportPreviewContent />
    </SessionGuard>
  );
}

function ReportPreviewContent() {
  const navigate = useNavigate();
  const { session } = useSession();
  const [showSaved, setShowSaved] = useState(false);
  if (!session) return null;

  const date = new Date(session.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <AppShell
      title="Report Preview"
      onBack={() => navigate("/review")}
      stickyFooter={
        <div className="flex gap-3">
          <SecondaryButton fullWidth={false} className="flex-1" onClick={() => setShowSaved(true)}>
            SAVE PDF
          </SecondaryButton>
          <PrimaryButton fullWidth={false} className="flex-[1.4]" onClick={() => navigate("/share")}>
            SHARE REPORT
          </PrimaryButton>
        </div>
      }
    >
      <div className="px-5 pt-5 pb-6">
        <div className="bg-white rounded-2xl border border-mist-200 p-5 shadow-[0_10px_30px_-16px_rgba(10,17,40,0.3)]">
          <div className="text-center pb-4 border-b border-mist-200">
            <p className="text-[15px] font-bold text-navy-900">Yateem Optician</p>
            <p className="text-[11px] text-ink-700/60 mt-1">Frame Fitting Measurement Report</p>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-3 py-4 border-b border-mist-200">
            <MetaField label="Measurement ID" value={session.id} />
            <MetaField label="Date" value={date} />
            <MetaField label="Store" value="Yateem — City Center" />
            <MetaField label="Employee" value="Staff Fitting Console" />
          </div>

          <ReportSection title="Customer Details">
            <ReportField label="Name" value={session.customer?.name ?? "—"} />
            <ReportField label="Reference" value={session.customer?.reference ?? "—"} />
            <ReportField label="Phone" value={session.customer?.phone ?? "—"} />
          </ReportSection>

          <ReportSection title="Frame Details">
            <ReportField label="Frame" value={session.frame?.name ?? "—"} />
            <ReportField label="Frame A" value={`${session.frame?.a} mm`} />
            <ReportField label="Frame B" value={`${session.frame?.b} mm`} />
            <ReportField label="DBL" value={`${session.frame?.dbl} mm`} />
          </ReportSection>

          <ReportSection title="Measurement Details">
            {session.measurements.map((field) => (
              <ReportField key={field.key} label={field.label} value={`${field.value} ${field.unit}`} />
            ))}
          </ReportSection>

          <ReportSection title="Lens Selection">
            <ReportField label="Lens Type" value={session.lens ?? "—"} />
          </ReportSection>

          <ReportSection title="Coatings">
            <p className="text-[12px] text-ink-700">{session.coatings.join(", ") || "None selected"}</p>
          </ReportSection>

          <ReportSection title="Thickness Estimate">
            <ReportField label="Center" value={session.thicknessResult?.centerThickness ?? "—"} />
            <ReportField label="Edge" value={session.thicknessResult?.edgeThickness ?? "—"} />
          </ReportSection>

          <ReportSection title="Tint Selection">
            <ReportField label="Color / Opacity" value={session.tint ? `${session.tint.color} · ${session.tint.opacity}%` : "None"} />
          </ReportSection>

          <div className="mt-4 bg-mist-100 rounded-xl p-3">
            <p className="text-[10px] text-ink-700/60 leading-relaxed">
              Refraction / prescription data is entered separately and is not measured by this application.
            </p>
          </div>
        </div>
      </div>

      <Modal open={showSaved} onClose={() => setShowSaved(false)}>
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-success-500/10 text-success-500 flex items-center justify-center text-2xl mx-auto animate-check-pop">
            ✓
          </div>
          <p className="text-[15px] font-semibold text-ink-900 mt-4">PDF Saved</p>
          <p className="text-[12px] text-ink-700/60 mt-1">Report saved to device (simulated).</p>
          <div className="mt-5">
            <PrimaryButton onClick={() => setShowSaved(false)}>Done</PrimaryButton>
          </div>
        </div>
      </Modal>
    </AppShell>
  );
}

function ReportSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-4 border-b border-mist-200 last:border-b-0">
      <p className="text-[10px] font-semibold text-ink-700/50 uppercase tracking-wide mb-2">{title}</p>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}

function ReportField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[11px] text-ink-700/60">{label}</span>
      <span className="text-[12px] font-semibold text-ink-900 text-right">{value}</span>
    </div>
  );
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] text-ink-700/50 uppercase tracking-wide">{label}</p>
      <p className="text-[12px] font-semibold text-ink-900 mt-0.5 break-words">{value}</p>
    </div>
  );
}
