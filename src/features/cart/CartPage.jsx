import { useSelector } from "react-redux";
import {
  selectDiscountedTotal,
  selectTotalQuantity,
} from "../../redux/selectors/cartSelectors";
import Button from "../../ui/Button";
import CartItems from "./CartItems";
import CheckoutSummary from "./CheckoutSummary";

function CartPage() {
  const totalQuantity = useSelector(selectTotalQuantity);
  const discountedTotal = useSelector(selectDiscountedTotal);

  if (totalQuantity <= 0)
    return (
      <div className="empty-message">
        <p>Your cart is empty.</p>
      </div>
    );

  return (
    <div className="cart-container">
      <CartItems />

      <CheckoutSummary discountedTotal={discountedTotal} />
    </div>
  );
}

export default CartPage;
