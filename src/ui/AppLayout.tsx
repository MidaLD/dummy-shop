import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import CategoriesMenu from "../features/shop/CategoriesMenu";
import { AnimatePresence } from "motion/react";
import { useAppSelector } from "../features/hooks/useAppSelector";
import CategoryBackdrop from "../features/shop/CategoryBackdrop";

function AppLayout() {
  const { showCategories } = useAppSelector((state) => state.shop);
  const isLargeDesktop = useAppSelector((state) => state.breakpoints.xl2);
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
            <CategoryBackdrop key="backdrop" />
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
