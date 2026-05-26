import { useState } from "react";
import toast from "react-hot-toast";
import { addToCart } from "../../redux/cartSlice";
import { getDiscountedPrice, formatPrice } from "../../utils/helpers";
import { type Product } from "../../services/apiDummyShop";
import { useAppDispatch } from "../hooks/useAppDispatch";
import RatingStars from "../../ui/RatingStars";
import QuantitySelector from "../../ui/QuantitySelector";
import Button from "../../ui/Button";

type ProductInfoProps = {
  product: Product;
};

function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState<number | "">(1);
  const dispatch = useAppDispatch();

  const {
    title,
    price,
    description,
    stock,
    discountPercentage,
    brand,
    rating,
    tags,
    reviews,
    category,
    sku,
    availabilityStatus,
  } = product;

  const discountedPrice = getDiscountedPrice(price, discountPercentage);

  const availabilityColor =
    availabilityStatus === "In Stock"
      ? "text-emerald-600"
      : availabilityStatus === "Low Stock"
        ? "text-amber-600"
        : "text-red-500";

  function handleIncrement() {
    if (+quantity >= stock) return;
    setQuantity((prev) => +prev + 1);
  }

  function handleDecrement() {
    if (+quantity <= 1) return;
    setQuantity((prev) => +prev - 1);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value === "") {
      setQuantity("");
      return;
    }
    const num = Number(value);
    if (!isNaN(num) && num >= 1) {
      setQuantity(num > stock ? stock : num);
    }
  }

  function handleAddToCart() {
    if (!quantity) return;

    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: +quantity,
        discountPercentage: product.discountPercentage,
        thumbnail: product.thumbnail,
      }),
    );

    toast.success(
      <span>
        {quantity} × <strong>{title}</strong> added to cart
      </span>,
      { icon: "🛒" },
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {brand && (
          <span className="text-xs font-medium uppercase tracking-widest text-slate-400">
            {brand}
          </span>
        )}
        {brand && category && (
          <span className="text-xs text-slate-300">·</span>
        )}
        {category && (
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium capitalize text-slate-500">
            {category}
          </span>
        )}
      </div>

      <h1 className="text-2xl font-semibold leading-snug text-slate-800 sm:text-3xl">
        {title}
      </h1>

      <div className="flex items-center gap-2">
        <RatingStars rating={rating} />
        {reviews.length > 0 && (
          <span className="text-xs text-slate-400">
            ({reviews.length} reviews)
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-semibold text-slate-700">
          ${formatPrice(discountedPrice)}
        </span>
        <span className="text-sm text-slate-400 line-through">
          ${formatPrice(price)}
        </span>
        <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-700">
          -{Math.round(discountPercentage)}%
        </span>
      </div>

      <p className="text-sm leading-relaxed text-slate-600">{description}</p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <span className={`text-sm font-medium ${availabilityColor}`}>
          {availabilityStatus}
        </span>
        <span className="translate-y-[1.4px] text-xs text-slate-400">
          · {stock} units
        </span>
      </div>

      <div className="flex items-center gap-3">
        <QuantitySelector
          quantity={quantity}
          stock={stock}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onChange={handleChange}
        />
        <Button
          onClick={handleAddToCart}
          className="flex-1 cursor-pointer rounded-xl bg-slate-700 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-slate-800 active:bg-slate-900"
        >
          Add to cart
        </Button>
      </div>

      {sku && (
        <div className="border-t border-slate-100 pt-3">
          <p className="text-xs text-slate-400">
            <span className="font-medium text-slate-500">SKU:</span> {sku}
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductInfo;
