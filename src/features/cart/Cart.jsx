import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDiscountedTotal,
  selectTotalQuantity,
} from "../../redux/selectors/cartSelectors";
import { Link } from "react-router";
import { HiArrowLongLeft } from "react-icons/hi2";
import { clearCart } from "../../redux/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.cart.products);
  const totalQuantity = useSelector(selectTotalQuantity);
  const discountedTotal = useSelector(selectDiscountedTotal);

  if (totalQuantity <= 0)
    return (
      <div className="empty-message">
        <p>Your cart is empty.</p>
      </div>
    );

  function handleClearCart() {
    dispatch(clearCart());
  }

  return (
    <div className="cart-container">
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
      <div className="checkout-box">
        <div className="checkout-header">
          <h3>Summary</h3>
        </div>

        <div className="checkout-details">
          <div className="items-price">
            <p className="items-num">ITEMS {totalQuantity}</p>
            <p className="items-total">$ {discountedTotal}</p>
          </div>
        </div>
        <div className="shipping-box">
          <p>SHIPPING</p>

          <select name="shipping" id="">
            <option value="standart">Standard-Delivery $ 5.00</option>
            <option value="express">Express-Delivery $ 15.00</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Cart;
