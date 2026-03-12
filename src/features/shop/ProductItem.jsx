import { motion } from "motion/react"; // eslint-disable-line no-unused-vars
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { addToCart } from "../../redux/cartSlice";
import { useQueryClient } from "@tanstack/react-query";
import { getProduct } from "../../services/apiDummyShop";
import { getDiscountedPrice } from "../../utils/helpers";
import { useState } from "react";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";

function ProductItem({ product }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { title, price, id, thumbnail, discountPercentage } = product;

  const discountedPrice = getDiscountedPrice(price, discountPercentage);

  function handleAddToCart() {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(
      <span>
        1 × <strong>{title}</strong> added to cart
      </span>,
      {
        icon: "🛒",
      },
    );
  }

  function handleMouseEnter() {
    queryClient.prefetchQuery({
      queryKey: ["item", id],
      queryFn: () => getProduct(id),
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.1, type: "tween", stiffness: 300 }}
      className="product-container"
    >
      <Link
        onMouseEnter={handleMouseEnter}
        className="product-link"
        to={`/product-details/${id}`}
      >
        <div className="product-img-box">
          {!imgLoaded && <Spinner />}

          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, type: "tween" }}
            className="product-img"
            src={thumbnail}
            alt=""
            onLoad={() => setImgLoaded(true)}
          />
        </div>

        <p className="product-title ">{title}</p>
        <p className="product-price ">${discountedPrice}</p>
      </Link>

      <motion.button
        whileHover={{ backgroundColor: "#4a58a9", color: "#ffffff" }}
        onClick={handleAddToCart}
        transition={{ duration: 0.1 }}
        className="product-button"
      >
        Add to cart
      </motion.button>
    </motion.div>
  );
}

export default ProductItem;
