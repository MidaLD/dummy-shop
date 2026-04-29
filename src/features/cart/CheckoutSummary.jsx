import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import { useNavigate } from "react-router";
import Button from "../../ui/Button";
import { selectTotalQuantity } from "../../redux/selectors/cartSelectors";
import SummaryRow from "../shop/SummaryRow";

function formatPrice(num) {
  return `$ ${num.toFixed(2)}`;
}

const SHIPPING_OPTIONS = [
  { label: "Standard Delivery", price: 5 },
  { label: "Express Delivery", price: 15 },
];

function CheckoutSummary({ discountedTotal }) {
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
    <div className="checkout-box">
      <h3 className="checkout-header">Summary</h3>

      <SummaryRow
        label={`ITEMS ${totalQuantity}`}
        value={formatPrice(discountedTotal)}
      />

      <div className="shipping-box">
        <p>SHIPPING</p>

        <select
          value={shippingPrice}
          onChange={(e) => setShippingPrice(Number(e.target.value))}
        >
          {SHIPPING_OPTIONS.map((opt) => (
            <option key={opt.price} value={opt.price}>
              {opt.label} $ {opt.price.toFixed(2)}
            </option>
          ))}
        </select>
      </div>

      <div className="shipping-box">
        <p>PROMO CODE</p>

        <input
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="promo-code-input"
          type="text"
        />
      </div>

      <SummaryRow label="TOTAL PRICE" value={formatPrice(totalPrice)} />

      <div className="checkout-btn-wrapper">
        <Button
          disabled={totalQuantity === 0}
          onClick={handleCheckout}
          className="button--sm"
        >
          CHECKOUT
        </Button>
      </div>
    </div>
  );
}

export default CheckoutSummary;
