import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi2";

type QuantitySelectorProps = {
  quantity: number | "";
  onIncrement: () => void;
  onDecrement: () => void;
  size?: "sm" | "md";
  stock?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function QuantitySelector({
  quantity,
  onIncrement,
  onDecrement,
  size = "md",
  stock,
  onChange,
}: QuantitySelectorProps) {
  const sm = size === "sm";

  const btnClass = sm
    ? "flex h-8 w-8 cursor-pointer items-center justify-center text-slate-500 transition-colors hover:bg-slate-100 active:bg-slate-200"
    : "flex h-10 w-10 cursor-pointer items-center justify-center text-slate-600 transition-colors hover:bg-slate-100 active:bg-slate-200";

  const inputClass = sm
    ? "h-8 w-9 border-x border-slate-200 bg-white text-center text-sm font-medium text-slate-800 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
    : "h-10 w-14 border-x border-slate-200 bg-white text-center text-sm font-medium text-slate-800 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

  const containerClass = sm
    ? "flex items-center overflow-hidden rounded-lg border border-slate-200"
    : "flex items-center overflow-hidden rounded-xl border border-slate-200";

  return (
    <div className={containerClass}>
      <button
        className={btnClass}
        onClick={onDecrement}
        disabled={quantity !== "" && +quantity <= 1}
      >
        <HiOutlineMinus className={sm ? "h-3 w-3" : "h-4 w-4"} />
      </button>
      <input
        className={inputClass}
        type="number"
        name="quantity"
        value={quantity}
        onChange={onChange}
        readOnly={!onChange}
        min={1}
        max={stock}
      />
      <button
        className={btnClass}
        onClick={onIncrement}
        disabled={!!stock && quantity !== "" && +quantity >= stock}
      >
        <HiOutlinePlus className={sm ? "h-3 w-3" : "h-4 w-4"} />
      </button>
    </div>
  );
}

export default QuantitySelector;
