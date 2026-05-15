import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, setCartId } from "../../redux/cartSlice";
import { useNavigate } from "react-router";
import Button from "../../ui/Button";
import { selectTotalQuantity } from "../../redux/selectors/cartSelectors";
import SummaryRow from "./SummaryRow";

function formatPrice(num: number) {
  return `$ ${num.toFixed(2)}`;
}

const SHIPPING_OPTIONS = [
  { label: "Standard Delivery", price: 5 },
  { label: "Express Delivery", price: 15 },
];

type CheckoutSummaryProps = {
  discountedTotal: number;
};

function CheckoutSummary({ discountedTotal }: CheckoutSummaryProps) {
  const [shippingPrice, setShippingPrice] = useState(5);
  const [promoCode, setPromoCode] = useState("");
  const totalQuantity = useSelector(selectTotalQuantity);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalPrice = discountedTotal + shippingPrice;

  function handleCheckout() {
    if (totalQuantity === 0) {
      toast.error("Cart is empty");
      return;
    }

    toast.success("Order placed successfully!");
    dispatch(clearCart());
    navigate("/");
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:self-start lg:sticky lg:top-8">
      <h3 className="text-lg font-semibold text-slate-800">Order Summary</h3>

      <div className="border-t border-slate-100" />

      <SummaryRow
        label={`Items (${totalQuantity})`}
        value={formatPrice(discountedTotal)}
      />

      {/* Shipping */}
      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Shipping
        </p>
        <select
          value={shippingPrice}
          onChange={(e) => setShippingPrice(Number(e.target.value))}
          className="w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200"
        >
          {SHIPPING_OPTIONS.map((opt) => (
            <option key={opt.price} value={opt.price}>
              {opt.label} — $ {opt.price.toFixed(2)}
            </option>
          ))}
        </select>
      </div>

      {/* Promo code */}
      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Promo Code
        </p>
        <input
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200"
          type="text"
          placeholder="Enter promo code"
        />
      </div>

      <div className="border-t border-slate-200" />

      <SummaryRow label="Total" value={formatPrice(totalPrice)} total />

      <Button
        disabled={totalQuantity === 0}
        onClick={handleCheckout}
        className="w-full cursor-pointer rounded-xl bg-slate-700 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800 active:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Checkout
      </Button>
    </div>
  );
}

export default CheckoutSummary;
