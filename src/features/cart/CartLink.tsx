import { HiOutlineShoppingCart } from "react-icons/hi2";
import { Link } from "react-router";
import { selectTotalQuantity } from "../../redux/selectors/cartSelectors";
import { useSelector } from "react-redux";

function CartLink() {
  const totalQuantity = useSelector(selectTotalQuantity);

  return (
    <Link to="/cart" className="cart-link">
      <HiOutlineShoppingCart className="header-icon" />
      {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
    </Link>
  );
}

export default CartLink;
