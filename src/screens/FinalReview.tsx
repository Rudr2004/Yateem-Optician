import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import SessionGuard from "../components/SessionGuard";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import { useSession } from "../context/SessionContext";

export default function FinalReview() {
  return (
    <SessionGuard>
      <FinalReviewContent />
    </SessionGuard>
  );
}

function FinalReviewContent() {
  const navigate = useNavigate();
  const { session, completeSession } = useSession();
  if (!session) return null;

  const m = Object.fromEntries(session.measurements.map((f) => [f.key, f]));

  function handleGenerate() {
    completeSession();
    navigate("/report");
  }

  return (
    <AppShell
      title="Final Review"
      onBack={() => navigate("/tint")}
      stickyFooter={
        <div className="flex gap-3">
          <SecondaryButton fullWidth={false} className="flex-1" onClick={() => navigate("/customer")}>
            EDIT
          </SecondaryButton>
          <PrimaryButton fullWidth={false} className="flex-[1.6]" onClick={handleGenerate}>
            GENERATE REPORT
          </PrimaryButton>
        </div>
      }
    >
      <div className="px-5 pt-5 pb-6 flex flex-col gap-4">
        <div className="flex items-center gap-2 bg-success-500/10 rounded-2xl px-4 py-3">
          <span className="text-success-500 text-[13px] font-semibold">✓ READY FOR LABORATORY</span>
        </div>

        <Section title="Customer">
          <Row label={session.customer?.name ?? "—"} value={session.customer?.reference ?? "—"} />
        </Section>

        <Section title="Frame">
          <Row label={session.frame?.name ?? "—"} value={`${session.frame?.a}/${session.frame?.b}/${session.frame?.dbl} mm`} />
        </Section>

        <Section title="Measurements">
          <div className="grid grid-cols-2 gap-2">
            {[
              ["Right PD", m.monocularPdR],
              ["Left PD", m.monocularPdL],
              ["Near PD", m.nearPdR && m.nearPdL ? { value: `${m.nearPdR.value}/${m.nearPdL.value}`, unit: "mm" } : undefined],
              ["Fitting Height", m.fittingHeightR && m.fittingHeightL ? { value: `${m.fittingHeightR.value}/${m.fittingHeightL.value}`, unit: "mm" } : undefined],
              ["Pantoscopic Tilt", m.pantoscopicTilt],
              ["Wrap Angle", m.wrapAngle],
              ["BVD", m.bvd],
              ["Lens Diameter", m.lensDiameter],
              ["Reading Distance", m.readingDistance],
            ].map(([label, field]: any) => (
              <div key={label} className="bg-mist-100 rounded-xl px-3 py-2.5">
                <p className="text-[10px] text-ink-700/50">{label}</p>
                <p className="text-[13px] font-semibold text-ink-900 mt-0.5">
                  {field ? `${field.value} ${field.unit}` : "—"}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Lens">
          <Row label={session.lens ?? "—"} value="" />
        </Section>

        <Section title="Coatings">
          <div className="flex flex-wrap gap-2">
            {session.coatings.length > 0 ? (
              session.coatings.map((c) => (
                <span key={c} className="text-[11px] font-medium bg-royal-500/10 text-royal-600 px-2.5 py-1 rounded-full">
                  {c}
                </span>
              ))
            ) : (
              <span className="text-[12px] text-ink-700/50">None selected</span>
            )}
          </div>
        </Section>

        <Section title="Thickness">
          <Row
            label={session.thicknessResult ? `${session.thicknessResult.edgeThickness} estimated edge` : "Not estimated"}
            value=""
          />
        </Section>

        <Section title="Tint">
          <Row label={session.tint?.color ?? "None"} value={session.tint ? `${session.tint.opacity}%` : ""} />
        </Section>
      </div>
    </AppShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-mist-200 p-4">
      <p className="text-[11px] font-semibold text-ink-700/50 uppercase tracking-wide mb-2">{title}</p>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[14px] font-semibold text-ink-900">{label}</span>
      {value && <span className="text-[12px] text-ink-700/60">{value}</span>}
    </div>
  );
}
