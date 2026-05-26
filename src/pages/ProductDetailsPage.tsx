import { useParams } from "react-router";
import { useProduct } from "../features/shop/useProduct";
import { useEffect, useState } from "react";

import { addToCart } from "../redux/cartSlice";
import { getDiscountedPrice, formatPrice } from "../utils/helpers";
import RatingStars from "../ui/RatingStars";
import ProductGalleryModal from "../features/shop/ProductGalleryModal";
import ReviewsContainer from "../features/shop/ReviewsContainer";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import { useAppDispatch } from "../features/hooks/useAppDispatch";
import SpinnerFullPage from "../ui/SpinnerFullPage";

type ProductImageProps = {
  src: string;
  alt: string;
  availabilityStatus: string;
  onOpenGallery: () => void;
};

function ProductImage({ src, alt, availabilityStatus, onOpenGallery }: ProductImageProps) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <button
      onClick={onOpenGallery}
      className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 shadow-sm transition-shadow duration-200 hover:shadow-md"
    >
      {!imgLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-7 h-7 animate-spin text-slate-300"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </div>
      )}
      <img
        className={`h-full w-full object-contain transition-transform duration-300 group-hover:scale-105 ${
          imgLoaded ? "opacity-100" : "opacity-0"
        }`}
        fetchPriority="high"
        src={src}
        alt={alt}
        onLoad={() => setImgLoaded(true)}
      />
      {availabilityStatus === "Low Stock" && (
        <span className="absolute top-3 left-3 rounded-md bg-amber-500/90 px-2 py-0.5 text-xs font-medium text-white">
          Low Stock
        </span>
      )}
      {imgLoaded && (
        <span className="absolute bottom-3 right-3 rounded-lg bg-white/80 px-2.5 py-1 text-xs font-medium text-slate-500 shadow-sm backdrop-blur-sm">
          View gallery
        </span>
      )}
    </button>
  );
}

function ProductDetailsPage() {
  const [quantity, setQuantity] = useState<number | "">(1);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const dispatch = useAppDispatch();

  const { productId } = useParams();
  const id = Number(productId);
  const { product, isLoading, error } = useProduct(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <SpinnerFullPage />;

  if (error || !product)
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-slate-500">
          {error ? error.message : "No product found"}
        </p>
      </div>
    );

  const {
    images,
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
    weight,
    dimensions,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    returnPolicy,
  } = product;

  const discountedPrice = getDiscountedPrice(price, discountPercentage);

  const availabilityColor =
    availabilityStatus === "In Stock"
      ? "text-emerald-600"
      : availabilityStatus === "Low Stock"
        ? "text-amber-600"
        : "text-red-500";

  function handleOpenGallery() {
    setGalleryOpen(true);
  }

  function handleCloseGallery() {
    setGalleryOpen(false);
  }

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
    if (!product || !quantity) return;

    const productObj = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: +quantity,
      discountPercentage: product.discountPercentage,
      thumbnail: product.thumbnail,
    };

    dispatch(addToCart(productObj));

    toast.success(
      <span>
        {quantity} × <strong>{title}</strong> added to cart
      </span>,
      {
        icon: "🛒",
      },
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductImage
          src={images[0]}
          alt={title}
          availabilityStatus={availabilityStatus}
          onOpenGallery={handleOpenGallery}
        />

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

          <p className="text-sm leading-relaxed text-slate-600">
            {description}
          </p>

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
            <span className="text-xs translate-y-[1.4px] text-slate-400">
              · {stock} units
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center overflow-hidden rounded-xl border border-slate-200">
              <button
                className="flex h-10 w-10 cursor-pointer items-center justify-center text-slate-600 transition-colors hover:bg-slate-100 active:bg-slate-200"
                onClick={handleDecrement}
              >
                &#8722;
              </button>
              <input
                className="h-10 w-14 border-x border-slate-200 bg-white text-center text-sm font-medium text-slate-800 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                type="number"
                name="quantity"
                value={quantity}
                onChange={handleChange}
              />
              <button
                className="flex h-10 w-10 cursor-pointer items-center justify-center text-slate-600 transition-colors hover:bg-slate-100 active:bg-slate-200"
                onClick={handleIncrement}
              >
                &#43;
              </button>
            </div>

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
      </div>

      <div className="mt-10 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-base font-semibold text-slate-800">
          Product Details
        </h2>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {shippingInformation && (
            <DetailRow label="Shipping" value={shippingInformation} />
          )}
          {warrantyInformation && (
            <DetailRow label="Warranty" value={warrantyInformation} />
          )}
          {returnPolicy && <DetailRow label="Returns" value={returnPolicy} />}
          {weight > 0 && <DetailRow label="Weight" value={`${weight} g`} />}
          {dimensions && (
            <DetailRow
              label="Dimensions"
              value={`${dimensions.width} × ${dimensions.height} × ${dimensions.depth} cm`}
            />
          )}
          {category && (
            <DetailRow
              label="Category"
              value={<span className="capitalize">{category}</span>}
            />
          )}
        </dl>
      </div>

      <ReviewsContainer reviews={reviews} />

      {galleryOpen && (
        <ProductGalleryModal
          images={images}
          handleCloseGallery={handleCloseGallery}
        />
      )}
    </div>
  );
}

type DetailRowProps = {
  label: string;
  value: React.ReactNode;
};

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </dt>
      <dd className="truncate text-sm text-slate-700">{value}</dd>
    </div>
  );
}

export default ProductDetailsPage;
