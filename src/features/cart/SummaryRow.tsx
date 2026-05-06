type SummaryRowProps = {
  label: string;
  value: string;
};

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="checkout-details">
      <div className="items-price">
        <p className="items-num">{label}</p>
        <p className="items-total">{value}</p>
      </div>
    </div>
  );
}

export default SummaryRow;
