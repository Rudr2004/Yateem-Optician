import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AppShell from "../components/AppShell";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import Toast from "../components/ui/Toast";
import { useSession } from "../context/SessionContext";

export default function CustomerDetails() {
  const navigate = useNavigate();
  const { session, setCustomer, startSession } = useSession();
  const [name, setName] = useState(session?.customer?.name ?? "");
  const [reference, setReference] = useState(session?.customer?.reference ?? "");
  const [phone, setPhone] = useState(session?.customer?.phone ?? "");
  const [email, setEmail] = useState(session?.customer?.email ?? "");
  const [showDraftToast, setShowDraftToast] = useState(false);

  const canContinue = name.trim().length > 0 && phone.trim().length > 0;

  function persist() {
    if (!session) startSession();
    setCustomer({ name, reference, phone, email: email || undefined });
  }

  function handleContinue() {
    persist();
    navigate("/frame-selection");
  }

  function handleSaveDraft() {
    persist();
    setShowDraftToast(true);
    setTimeout(() => setShowDraftToast(false), 1800);
  }

  return (
    <AppShell
      title="Customer Details"
      onBack={() => navigate("/")}
      stickyFooter={
        <div className="flex flex-col gap-2.5">
          <PrimaryButton disabled={!canContinue} onClick={handleContinue}>
            Continue
          </PrimaryButton>
          <SecondaryButton onClick={handleSaveDraft}>Save Draft</SecondaryButton>
        </div>
      }
    >
      <div className="px-5 pt-5 pb-6 flex flex-col gap-5">
        <Field label="Customer Name" value={name} onChange={setName} placeholder="John Smith" />
        <Field label="Customer Reference" value={reference} onChange={setReference} placeholder="MF-2026-00124" />
        <Field label="Phone Number" value={phone} onChange={setPhone} placeholder="+974 XXXXXXXX" type="tel" />
        <Field label="Email (Optional)" value={email} onChange={setEmail} placeholder="john@example.com" type="email" />
      </div>
      <Toast message="Draft saved" show={showDraftToast} />
    </AppShell>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[13px] font-semibold text-ink-900">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[52px] px-4 rounded-2xl border border-mist-300 bg-white text-[15px] text-ink-900 placeholder:text-ink-700/35 focus:outline-none focus:ring-2 focus:ring-royal-500/40 focus:border-royal-500 transition"
      />
    </label>
  );
}
