import { decItemQty, incItemQty, removeCartItem } from "../../redux/cartSlice";
import { HiMiniXMark, HiOutlineMinus, HiOutlinePlus } from "react-icons/hi2";
import { Link } from "react-router";
import toast, { Renderable } from "react-hot-toast";
import { useState } from "react";
import Spinner from "../../ui/Spinner";
import { CartProduct } from "../../services/apiDummyShop";
import { useAppDispatch } from "../hooks/useAppDispatch";

type CartItemProps = {
  product: CartProduct;
};

function CartItem({ product }: CartItemProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const dispatch = useAppDispatch();
  const { thumbnail, title, discountPercentage, quantity, id, price } = product;

  console.log(product);

  const discountedTotal = Number(
    (price * quantity * (1 - discountPercentage / 100)).toFixed(2),
  );

  if (!quantity) return null;

  function showToast(message: Renderable, icon: string) {
    toast.success(message, { icon });
  }

  function handleRemoveCartItem() {
    dispatch(removeCartItem(id));
    showToast(
      <span>
        {quantity} x <strong>{title}</strong> removed from cart
      </span>,
      "🗑️",
    );
  }

  function handleIncQty() {
    dispatch(incItemQty(id));
    showToast(
      <span>
        1 x <strong>{title}</strong> added to cart
      </span>,
      "🛒",
    );
  }

  function handleDecQty() {
    dispatch(decItemQty(id));
    showToast(
      <span>
        1 x <strong>{title}</strong> removed from cart
      </span>,
      "🗑️",
    );
  }

  return (
    <div className="flex items-center gap-3 py-4 sm:gap-4">
      {/* Thumbnail */}
      <Link
        to={`/product-details/${id}`}
        className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 sm:h-16 sm:w-16"
      >
        {!imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner small />
          </div>
        )}
        <img
          onLoad={() => setImgLoaded(true)}
          src={thumbnail}
          alt=""
          className={`h-full w-full object-contain transition-opacity duration-200 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </Link>

      {/* Title */}
      <Link
        to={`/product-details/${id}`}
        className="min-w-0 flex-1 text-sm font-medium leading-snug text-slate-800 transition-colors hover:text-slate-500 line-clamp-2"
      >
        {title}
      </Link>

      {/* Controls: qty + price + remove */}
      <div className="flex shrink-0 items-center gap-3">
        {/* Qty stepper */}
        <div className="flex items-center overflow-hidden rounded-lg border border-slate-200">
          <button
            onClick={handleDecQty}
            className="flex h-8 w-8 cursor-pointer items-center justify-center text-slate-500 transition-colors hover:bg-slate-100 active:bg-slate-200"
          >
            <HiOutlineMinus className="h-3 w-3" />
          </button>
          <input
            className="h-8 w-9 border-x border-slate-200 bg-white text-center text-sm font-medium text-slate-800 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            type="number"
            name="quantity"
            value={quantity}
            readOnly
          />
          <button
            onClick={handleIncQty}
            className="flex h-8 w-8 cursor-pointer items-center justify-center text-slate-500 transition-colors hover:bg-slate-100 active:bg-slate-200"
          >
            <HiOutlinePlus className="h-3 w-3" />
          </button>
        </div>

        {/* Price */}
        <p className="w-16 text-left text-sm font-semibold text-slate-700 sm:w-20">
          ${discountedTotal}
        </p>

        {/* Remove */}
        <button
          onClick={handleRemoveCartItem}
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-slate-300 transition-colors hover:bg-red-50 hover:text-red-400 sm:ml-4"
        >
          <HiMiniXMark className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
