type QuantitySelectorProps = {
  quantity: number | "";
  stock: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function QuantitySelector({
  quantity,
  stock,
  onIncrement,
  onDecrement,
  onChange,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center overflow-hidden rounded-xl border border-slate-200">
      <button
        className="flex h-10 w-10 cursor-pointer items-center justify-center text-slate-600 transition-colors hover:bg-slate-100 active:bg-slate-200"
        onClick={onDecrement}
        disabled={quantity !== "" && +quantity <= 1}
      >
        &#8722;
      </button>
      <input
        className="h-10 w-14 border-x border-slate-200 bg-white text-center text-sm font-medium text-slate-800 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        type="number"
        name="quantity"
        value={quantity}
        onChange={onChange}
        min={1}
        max={stock}
      />
      <button
        className="flex h-10 w-10 cursor-pointer items-center justify-center text-slate-600 transition-colors hover:bg-slate-100 active:bg-slate-200"
        onClick={onIncrement}
        disabled={quantity !== "" && +quantity >= stock}
      >
        &#43;
      </button>
    </div>
  );
}

export default QuantitySelector;
