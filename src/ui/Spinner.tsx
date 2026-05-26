type SpinnerProps = {
  size?: "sm" | "lg";
  className?: string;
};

const sizeMap = {
  sm: "w-4 h-4",
  lg: "w-7 h-7",
};

function Spinner({ size = "lg", className = "text-slate-300" }: SpinnerProps) {
  return (
    <svg
      className={`${sizeMap[size]} animate-spin ${className}`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

export default Spinner;
