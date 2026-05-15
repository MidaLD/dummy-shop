import CategoryItem from "./CategoryItem";
import { useCategoriesList } from "./useCategoriesList";
import { setSearchQuery, toggleCategoriesMenu } from "../../redux/shopSlice";
import { useNavigate, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { useAppDispatch } from "../hooks/useAppDispatch";

type CategoriesMenuProps = {
  showCategoriesFinal: boolean;
};

function CategoriesMenu({ showCategoriesFinal }: CategoriesMenuProps) {
  const { categories, isLoading } = useCategoriesList();
  const { "3xl": isLargeDesktop } = useBreakpoint();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const outsideRef = useOutsideClick<HTMLDivElement>(() => {
    if (!isLargeDesktop) dispatch(toggleCategoriesMenu());
  });
  const ref = isLargeDesktop ? null : outsideRef;
  const navigate = useNavigate();

  const activeCategory = searchParams.get("category");

  function handleAllProductsCat() {
    searchParams.delete("category");
    setSearchParams(searchParams);
    dispatch(setSearchQuery(""));
    navigate("/");
  }

  if (isLoading) return null;

  return (
    <>
      <motion.div
        initial={isLargeDesktop ? false : { x: "-100%" }}
        animate={{ x: 0 }}
        exit={isLargeDesktop ? {} : { x: "-100%" }}
        transition={{ duration: 0.2, type: "tween" }}
        key="categories-menu"
        ref={ref}
        className={
          isLargeDesktop
            ? "flex flex-col w-56 shrink-0 border-r border-slate-100 bg-white overflow-y-auto"
            : "absolute inset-y-0 left-0 z-20 flex flex-col w-64 bg-white shadow-2xl overflow-y-auto"
        }
      >
        <div className="px-4 py-4 border-b border-slate-100">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Categories
          </span>
        </div>

        <ul className="flex flex-col gap-0.5 p-2 overflow-y-auto">
          <li>
            <button
              onClick={handleAllProductsCat}
              className={[
                "w-full text-left text-sm px-3 py-2 rounded-md transition-colors duration-150",
                !activeCategory
                  ? "bg-slate-100 text-slate-900 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              ].join(" ")}
            >
              All products
            </button>
          </li>

          {categories?.map((category) => (
            <CategoryItem category={category} key={category.slug} />
          ))}
        </ul>
      </motion.div>

      {!isLargeDesktop && showCategoriesFinal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-10 bg-black/20"
        />
      )}
    </>
  );
}

export default CategoriesMenu;
