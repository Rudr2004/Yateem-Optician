import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/ui/PrimaryButton";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full flex flex-col items-center justify-center px-8 text-center gap-4 bg-mist-100">
      <div className="w-16 h-16 rounded-full bg-mist-200 flex items-center justify-center text-2xl">🧭</div>
      <h2 className="text-[17px] font-semibold text-ink-900">Screen not available</h2>
      <p className="text-[13px] text-ink-700/70 leading-relaxed">
        This screen doesn't exist in the Smart Fit prototype.
      </p>
      <div className="w-full mt-2">
        <PrimaryButton onClick={() => navigate("/")}>BACK TO HOME</PrimaryButton>
      </div>
    </div>
  );
}
