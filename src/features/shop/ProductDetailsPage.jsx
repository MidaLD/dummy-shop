import { useParams } from "react-router";
import { useProduct } from "./useProduct";
import { useEffect, useState } from "react";
import Spinner from "../../ui/Spinner";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { getDiscountedPrice } from "../../utils/helpers";
import RatingStars from "../../ui/RatingStars";
import ProductGalleryModal from "./ProductGalleryModal";
import Review from "./Review";
import toast from "react-hot-toast";
import Button from "../../ui/Button";

function ProductDetailsPage() {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const dispatch = useDispatch();

  const { productId } = useParams();
  const id = Number(productId);
  const { product, isLoading, error } = useProduct(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading)
    return (
      <div className="product-details-spinner">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <div className="empty-message">
        <p>{error.message}</p>
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
  } = product;

  const discountedPrice = getDiscountedPrice(price, discountPercentage);

  function handleOpenGallery() {
    setGalleryOpen(true);
  }

  function handleCloseGallery() {
    setGalleryOpen(false);
  }

  function handleIncrement() {
    if (quantity >= stock) return;
    setQuantity((prev) => prev + 1);
  }

  function handleDecrement() {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  }

  function handleChange(e) {
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
    dispatch(addToCart({ ...product, quantity }));

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
    <div className="product-details-container">
      <button onClick={handleOpenGallery} className="image-btn">
        {/* <Spinner /> */}
        {!imgLoaded && <Spinner />}
        <img
          className="product-details-img"
          src={images[0]}
          onLoad={() => setImgLoaded(true)}
        />
      </button>
      <div className="text-box">
        {brand && <p className="product-details-brand">Brand: {brand}</p>}

        <h1 className="product-details-title">{title}</h1>

        <RatingStars rating={rating} />
        <p className="product-details-price">${discountedPrice}</p>
        <p className="product-details-desc">{description}</p>
        <p className="tags-box">
          {tags.map((tag, i) => (
            <span className="tag" key={i}>
              #{tag}
            </span>
          ))}
        </p>

        <div className="product-details-btns">
          <div className="product-all-buttons">
            <div className="product-qty-inputs">
              <button className="qty-btn" onClick={handleDecrement}>
                &#8722;
              </button>
              <input
                className="qty-input"
                type="number"
                name="quantity"
                value={quantity}
                onChange={handleChange}
              />
              <button className="qty-btn" onClick={handleIncrement}>
                &#43;
              </button>
            </div>
            <Button onClick={handleAddToCart} className="button--lg">
              Add to cart
            </Button>
          </div>
        </div>
      </div>

      <div className="reviews-container">
        <h2 className="reviews-h2">Reviews</h2>

        <div className="reviews">
          {reviews.map((review, i) => (
            <Review review={review} key={i} />
          ))}
        </div>
      </div>

      {galleryOpen && (
        <ProductGalleryModal
          images={images}
          handleCloseGallery={handleCloseGallery}
        />
      )}
    </div>
  );
}

export default ProductDetailsPage;
