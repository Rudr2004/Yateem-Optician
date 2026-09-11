interface Props {
  message: string;
  show: boolean;
}

export default function Toast({ message, show }: Props) {
  if (!show) return null;

  return (
    <div className="absolute bottom-24 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
      <div className="bg-ink-900 text-white text-[13px] font-medium px-4 py-3 rounded-2xl shadow-xl animate-fade-in-up">
        {message}
      </div>
    </div>
  );
}
