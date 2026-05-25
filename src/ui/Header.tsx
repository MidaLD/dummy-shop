import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { Link } from "react-router";
import { toggleCategoriesMenu } from "../redux/shopSlice";
import Search from "../features/shop/Search";
import CartLink from "../features/cart/CartLink";
import Logo from "./Logo";
import { useAppDispatch } from "../features/hooks/useAppDispatch";
import { useAppSelector } from "../features/hooks/useAppSelector";
import UserSection from "../features/user/UserSection";

function Header() {
  return (
    <header className="bg-slate-700 text-white px-5 py-4 shadow-sm">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CategoriesToggle />

          <Search />
        </div>

        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <Logo />
        </Link>

        <div className="flex items-center gap-3">
          <UserSection />
          <CartLink />
        </div>
      </div>
    </header>
  );
}

export default Header;

function CategoriesToggle() {
  const dispatch = useAppDispatch();
  const showCategories = useAppSelector((state) => state.shop.showCategories);

  return (
    <button
      onClick={() => dispatch(toggleCategoriesMenu())}
      className="cursor-pointer xl2:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors"
    >
      {showCategories ? (
        <HiOutlineXMark className="w-5 h-5" />
      ) : (
        <HiOutlineBars3 className="w-5 h-5" />
      )}
    </button>
  );
}
