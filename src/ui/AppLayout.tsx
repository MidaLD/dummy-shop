import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import CategoriesMenu from "../features/shop/CategoriesMenu";
import { AnimatePresence } from "motion/react";
import { useUserCart } from "../features/cart/useUserCart";
import { useCurrentUser } from "../features/authentication/useCurrentUser";
import { useEffect } from "react";
import { setCart, setCartId } from "../redux/cartSlice";
import { useIsLargeDesktop } from "../features/hooks/useIsLargeDesktop";
import { useAppSelector } from "../features/hooks/useAppSelector";
import { useAppDispatch } from "../features/hooks/useAppDispatch";

function AppLayout() {
  const isLargeDesktop = useIsLargeDesktop();

  const { showCategories } = useAppSelector((store) => store.shop);
  const { cartId } = useAppSelector((store) => store.cart);

  const dispatch = useAppDispatch();

  const { currentUser, isLoading: isUserLoading } = useCurrentUser();

  const { userCart, isLoading, isSuccess } = useUserCart(currentUser?.id);

  useEffect(() => {
    if (!isSuccess || !userCart) return;

    console.log(userCart, cartId);

    if (isSuccess && userCart?.id !== cartId) {
      dispatch(setCart(userCart.products));
      dispatch(setCartId(userCart.id));
    }
  }, [isSuccess, userCart, dispatch, cartId]);

  if (isUserLoading || isLoading) return null;

  const showCategoriesFinal = isLargeDesktop || showCategories;

  return (
    <div className="app">
      <Header />

      <main className="main">
        <AnimatePresence mode="wait">
          {showCategoriesFinal && (
            <CategoriesMenu
              showCategoriesFinal={showCategoriesFinal}
              key="categories-menu"
            />
          )}
        </AnimatePresence>

        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default AppLayout;
