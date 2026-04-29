import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import CartItem from "./CartItem";
import { Link } from "react-router";
import { HiArrowLongLeft } from "react-icons/hi2";
import { selectTotalQuantity } from "../../redux/selectors/cartSelectors";

function CartItems() {
  const totalQuantity = useSelector(selectTotalQuantity);

  const dispatch = useDispatch();
  const products = useSelector((store) => store.cart.products);

  function handleClearCart() {
    dispatch(clearCart());

    toast.success(<span>Cart Cleared</span>);
  }

  return (
    <div className="cart-box">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <p>{totalQuantity} Items</p>
      </div>

      <div className="cart-items-box">
        {products.map((product) => (
          <CartItem product={product} key={product.id} />
        ))}
      </div>
      <div className="cart-btns">
        <Link to="/">
          <div className="back-link">
            <HiArrowLongLeft className="back-icon" />
            <span>Back to shop</span>
          </div>
        </Link>
        <button onClick={handleClearCart}>Clear Cart</button>
      </div>
    </div>
  );
}

export default CartItems;
