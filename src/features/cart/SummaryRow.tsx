type SummaryRowProps = {
  label: string;
  value: string;
  total?: boolean;
};

function SummaryRow({ label, value, total = false }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between">
      <p
        className={
          total
            ? "text-sm font-semibold text-slate-800"
            : "text-sm text-slate-500"
        }
      >
        {label}
      </p>
      <p
        className={
          total
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
