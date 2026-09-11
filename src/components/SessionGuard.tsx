import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import PrimaryButton from "./ui/PrimaryButton";

export default function SessionGuard({ children }: { children: ReactNode }) {
  const { session, startSession } = useSession();
  const navigate = useNavigate();

  if (!session) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center px-8 text-center gap-4 bg-mist-100">
        <div className="w-16 h-16 rounded-full bg-mist-200 flex items-center justify-center text-2xl">
          🔍
        </div>
        <h2 className="text-[17px] font-semibold text-ink-900">Measurement session not found</h2>
        <p className="text-[13px] text-ink-700/70 leading-relaxed">
          This screen requires an active measurement session. Start a new measurement to continue.
        </p>
        <div className="w-full mt-2">
          <PrimaryButton
            onClick={() => {
              startSession();
              navigate("/customer");
            }}
          >
            START NEW MEASUREMENT
          </PrimaryButton>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
