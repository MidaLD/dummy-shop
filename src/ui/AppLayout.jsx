import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import CategoriesMenu from "../features/shop/CategoriesMenu";
import { AnimatePresence } from "motion/react";
import { useUserCart } from "../features/cart/useUserCart";
import { useCurrentUser } from "../features/authentication/useCurrentUser";
import { useEffect } from "react";
import { setCart, setCartId } from "../redux/cartSlice";
import { useIsLargeDesktop } from "../features/hooks/useIsLargeDesktop";
import { showCategoriesMenu } from "../redux/shopSlice";

function AppLayout() {
  const isLargeDesktop = useIsLargeDesktop();
  const { showCategories } = useSelector((store) => store.shop);
  const { cartId } = useSelector((store) => store.cart);

  const dispatch = useDispatch();

  const { currentUser, isLoading: isUserLoading } = useCurrentUser();

  const { userCart, isLoading, isSuccess } = useUserCart(currentUser?.id);

  useEffect(() => {
    if (isSuccess && userCart.id !== cartId) {
      dispatch(setCart({ products: userCart.products }));
      dispatch(setCartId(userCart.id));
    }
  }, [isSuccess, userCart, dispatch, cartId]);

  useEffect(() => {
    if (isLargeDesktop) dispatch(showCategoriesMenu());
  }, [dispatch, isLargeDesktop]);

  if (isUserLoading || isLoading) return null;

  return (
    <div className="app">
      <Header />

      <main className="main">
        <AnimatePresence mode="wait">
          {showCategories && <CategoriesMenu key="categories-menu" />}
        </AnimatePresence>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
