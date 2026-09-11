interface Props {
  className?: string;
  showMarkers?: boolean;
}

export default function CapturedFaceFrame({ className = "", showMarkers = true }: Props) {
  return (
    <svg width="220" height="264" viewBox="0 0 220 264" fill="none" className={className}>
      <defs>
        <radialGradient id="skinGrad" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#3a4472" />
          <stop offset="100%" stopColor="#232c52" />
        </radialGradient>
      </defs>

      <ellipse cx="110" cy="132" rx="68" ry="90" fill="url(#skinGrad)" />
      <ellipse cx="110" cy="132" rx="68" ry="90" stroke="#4f5fe0" strokeWidth="1" opacity="0.4" />

      <path d="M64 96q46-26 92 0" stroke="#8a90ad" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />

      <ellipse cx="82" cy="122" rx="15" ry="11" fill="#151b38" stroke="#c9a15a" strokeWidth="2.5" />
      <ellipse cx="138" cy="122" rx="15" ry="11" fill="#151b38" stroke="#c9a15a" strokeWidth="2.5" />
      <path d="M97 122h26" stroke="#c9a15a" strokeWidth="2.5" />
      <path d="M67 118l-14-5M153 118l14-5" stroke="#c9a15a" strokeWidth="2.5" strokeLinecap="round" />

      <circle cx="82" cy="122" r="3.5" fill="white" />
      <circle cx="138" cy="122" r="3.5" fill="white" />
      {showMarkers && (
        <>
          <circle cx="82" cy="122" r="3.5" fill="none" stroke="#1fa971" strokeWidth="1.5" className="animate-pulse-ring" />
          <circle cx="138" cy="122" r="3.5" fill="none" stroke="#1fa971" strokeWidth="1.5" className="animate-pulse-ring" />
        </>
      )}

      <path d="M100 168q10 7 20 0" stroke="#8a90ad" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />

      {showMarkers && (
        <>
          <line x1="82" y1="122" x2="138" y2="122" stroke="#3562e0" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <line x1="110" y1="70" x2="110" y2="194" stroke="#3562e0" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
        </>
      )}
    </svg>
  );
}
