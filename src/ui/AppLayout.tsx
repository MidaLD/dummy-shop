import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import CategoriesMenu from "../features/shop/CategoriesMenu";
import { AnimatePresence } from "motion/react";
import { useUserCart } from "../features/cart/useUserCart";
import { useCurrentUser } from "../features/authentication/useCurrentUser";
import { useEffect } from "react";
import { setCart, setCartId } from "../redux/cartSlice";
import { useAppSelector } from "../features/hooks/useAppSelector";
import { useAppDispatch } from "../features/hooks/useAppDispatch";
import { motion } from "motion/react";

function AppLayout() {
  const { showCategories } = useAppSelector((state) => state.shop);
  const { cartId } = useAppSelector((state) => state.cart);
  const isLargeDesktop = useAppSelector((state) => state.breakpoints.xl2);

  const dispatch = useAppDispatch();

  const { currentUser, isLoading: isUserLoading } = useCurrentUser();

  const { userCart, isLoading, isSuccess } = useUserCart(currentUser?.id);

  useEffect(() => {
    if (!isSuccess || !userCart) return;

    if (isSuccess && userCart?.id !== cartId) {
      dispatch(setCart(userCart.products));
      dispatch(setCartId(userCart.id));
    }
  }, [isSuccess, userCart, dispatch, cartId]);

  const showCategoriesFinal = isLargeDesktop || showCategories;

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <Header />

      <main className="relative flex">
        <AnimatePresence mode="wait">
          {showCategoriesFinal && <CategoriesMenu key="categories-menu" />}
        </AnimatePresence>

        <AnimatePresence>
          {showCategories && !isLargeDesktop && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-10 bg-black/20"
            />
          )}
        </AnimatePresence>

        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AppLayout;
