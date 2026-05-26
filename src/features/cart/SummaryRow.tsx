type SummaryRowProps = {
  label: string;
  value: string;
  variant?: "total";
};

function SummaryRow({ label, value, variant }: SummaryRowProps) {
  const isTotal = variant === "total";

  return (
    <div className="flex items-center justify-between">
      <p
        className={
          isTotal
            ? "text-sm font-semibold text-slate-800"
            : "text-sm text-slate-500"
        }
      >
        {label}
      </p>
      <p
        className={
          isTotal
            ? "text-base font-semibold text-slate-800"
            : "text-sm font-medium text-slate-700"
        }
      >
        {value}
      </p>
    </div>
  );
}

export default SummaryRow;
