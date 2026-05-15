import {
  selectDiscountedTotal,
  selectTotalQuantity,
} from "../redux/selectors/cartSelectors";
import CartItems from "../features/cart/CartItems";
import CheckoutSummary from "../features/cart/CheckoutSummary";
import { useAppSelector } from "../features/hooks/useAppSelector";

function CartPage() {
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const discountedTotal = useAppSelector(selectDiscountedTotal);

  if (totalQuantity <= 0)
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-slate-500">Your cart is empty.</p>
      </div>
    );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <CartItems />
        <CheckoutSummary discountedTotal={discountedTotal} />
      </div>
    </div>
  );
}

export default CartPage;
