import {
  selectDiscountedTotal,
  selectTotalQuantity,
} from "../../redux/selectors/cartSelectors";
import CartItems from "./CartItems";
import CheckoutSummary from "./CheckoutSummary";
import { useAppSelector } from "../hooks/useAppSelector";

function CartPage() {
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const discountedTotal = useAppSelector(selectDiscountedTotal);

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
