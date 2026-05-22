import { Link } from "react-router";
import { addToCart } from "../../redux/cartSlice";
import { useQueryClient } from "@tanstack/react-query";
import { getProduct } from "../../services/apiDummyShop";
import { getDiscountedPrice, formatPrice } from "../../utils/helpers";
import { memo, useCallback, useState } from "react";

import toast from "react-hot-toast";
import Button from "../../ui/Button";
import { type Product } from "../../services/apiDummyShop";
import { useAppDispatch } from "../hooks/useAppDispatch";

type ProductItemProps = {
  product: Product;
};

const ProductItem = memo(function ({ product }: ProductItemProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { title, price, id, thumbnail, discountPercentage, rating, brand } =
    product;

  const discountedPrice = getDiscountedPrice(price, discountPercentage);

  const handleAddToCart = useCallback(() => {
    const productObj = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      discountPercentage: product.discountPercentage,
      thumbnail: product.thumbnail,
    };

    dispatch(addToCart(productObj));
    toast.success(
      <span>
        1 × <strong>{title}</strong> added to cart
      </span>,
      {
        icon: "🛒",
      },
    );
  }, [product, dispatch, title]);

  const handleMouseEnter = useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: ["item", id],
      queryFn: () => getProduct(id),
    });
  }, [id, queryClient]);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <Link
        onMouseEnter={handleMouseEnter}
        className="flex flex-col flex-1"
        to={`/product-details/${id}`}
      >
        <div className="relative aspect-square overflow-hidden bg-slate-50">
          <img
            className={`h-full w-full object-cover transition-opacity duration-500 
  group-hover:scale-105 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            src={thumbnail}
            alt={title}
            onLoad={() => setImgLoaded(true)}
          />
          {product.availabilityStatus === "Low Stock" && (
            <span className="absolute top-2 left-2 rounded-md bg-amber-500/90 px-2 py-0.5 text-xs font-medium text-white">
              Low Stock
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1 px-4 pb-2 pt-3">
          <p className="h-4 overflow-hidden text-xs font-medium uppercase tracking-wide text-slate-400">
            {brand}
          </p>
          <p className="line-clamp-2 h-10 text-sm font-medium leading-snug text-slate-800">
            {title}
          </p>
          <div className="mt-auto flex min-w-0 items-center gap-2 pt-1">
            <p className="min-w-0 flex-1 truncate text-base font-semibold text-slate-700">
              ${formatPrice(discountedPrice)}
            </p>
            <span className="shrink-0 text-xs text-slate-400 line-through">
              ${formatPrice(price)}
            </span>
            <span className="shrink-0 rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-700">
              -{Math.round(discountPercentage)}%
            </span>
          </div>
          <p className="text-xs text-slate-500">
            <span style={{ color: "#fbbf24" }}>★</span> {rating.toFixed(1)}
          </p>
        </div>
      </Link>

      <div className="px-4 pb-4 pt-1">
        <Button
          onClick={handleAddToCart}
          className="w-full cursor-pointer rounded-xl bg-slate-700 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-slate-800 active:bg-slate-900"
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
});

export default ProductItem;
