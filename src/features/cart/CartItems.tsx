import { clearCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import CartItem from "./CartItem";
import { Link } from "react-router";
import { HiArrowLongLeft } from "react-icons/hi2";
import { selectTotalQuantity } from "../../redux/selectors/cartSelectors";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";

function CartItems() {
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const dispatch = useAppDispatch();
  const products = useAppSelector((store) => store.cart.products);

  function handleClearCart() {
    dispatch(clearCart());
    toast.success(<span>Cart Cleared</span>);
  }

  return (
    <div className="flex flex-col rounded-2xl border border-slate-100 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-baseline justify-between border-b border-slate-100 px-6 py-5">
        <h1 className="text-xl font-semibold text-slate-800">Shopping Cart</h1>
        <span className="text-sm text-slate-400">{totalQuantity} items</span>
      </div>

      {/* Items */}
      <div className="divide-y divide-slate-100 px-4">
        {products.map((product) => (
          <CartItem product={product} key={product.id} />
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-800"
        >
          <HiArrowLongLeft className="h-4 w-4" />
          Back to shop
        </Link>
        <button
          onClick={handleClearCart}
          className="cursor-pointer text-sm text-slate-400 transition-colors hover:text-red-500"
        >
          Clear cart
        </button>
      </div>
    </div>
  );
}

export default CartItems;
