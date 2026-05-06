import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { Link } from "react-router";
import { hideCategoriesMenu, toggleCategoriesMenu } from "../redux/shopSlice";
import Search from "../features/shop/Search";
import UserMenu from "../features/user/UserMenu";
import CartLink from "../features/cart/CartLink";
import logo from "../assets/logo/dummy-shop-high-resolution-logo-transparent.png";
import { useIsLargeDesktop } from "../features/hooks/useIsLargeDesktop";
import { useEffect } from "react";
import { useAppSelector } from "../features/hooks/useAppSelector";
import { useAppDispatch } from "../features/hooks/useAppDispatch";

function Header() {
  const dispatch = useAppDispatch();
  const { showCategories } = useAppSelector((store) => store.shop);
  const isLargeDesktop = useIsLargeDesktop();

  function handleToggleCategories() {
    dispatch(toggleCategoriesMenu());
  }

  useEffect(() => {
    isLargeDesktop && dispatch(hideCategoriesMenu());
  }, [isLargeDesktop, dispatch]);

  return (
    <header className="header">
      <div className="header-container">
        <div className="menu-search-container">
          {!isLargeDesktop && (
            <button onClick={handleToggleCategories}>
              {showCategories ? (
                <HiOutlineXMark className="header-icon" />
              ) : (
                <HiOutlineBars3 className="header-icon" />
              )}
            </button>
          )}

          <Search />
        </div>
        <Link to="/" className="header-logo-box">
          <img className="header-logo" src={logo} alt="" />
        </Link>
        <div className="user-cart-container">
          <UserMenu />
          <CartLink />
        </div>
      </div>
    </header>
  );
}

export default Header;
