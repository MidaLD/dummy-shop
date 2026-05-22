import CategoryItem from "./CategoryItem";
import { useCategoriesList } from "./useCategoriesList";
import { setSearchQuery, toggleCategoriesMenu } from "../../redux/shopSlice";
import { useNavigate, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { useCallback } from "react";

const ALL_PRODUCTS_CATEGORY = { name: "All products", slug: null } as const;

function CategoriesMenu() {
  const { categories, isLoading } = useCategoriesList();
  const isLargeDesktop = useAppSelector((state) => state.breakpoints.xl2);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const handleOutsideClick = useCallback(() => {
    if (!isLargeDesktop) dispatch(toggleCategoriesMenu());
  }, [isLargeDesktop, dispatch]);
  const navigate = useNavigate();

  const outsideRef = useOutsideClick<HTMLDivElement>(handleOutsideClick);
  const ref = isLargeDesktop ? null : outsideRef;

  const activeCategory = searchParams.get("category");

  const handleSelect = useCallback(
    (slug: string | null) => {
      dispatch(setSearchQuery(""));
      const params = new URLSearchParams();
      if (slug) {
        params.set("category", slug);
        params.set("page", "1");
      }
      navigate({ pathname: "/", search: params.toString() });
    },
    [dispatch, navigate],
  );

  return (
    <motion.div
      initial={isLargeDesktop ? false : { x: "-100%" }}
      animate={{ x: 0 }}
      exit={isLargeDesktop ? {} : { x: "-100%" }}
      transition={{ duration: 0.2, type: "tween" }}
      key="categories-menu"
      ref={ref}
      className="flex overflow-y-auto bg-white flex-col xl2:shrink-0 xl2:border-r xl2:border-slate-100 absolute xl2:relative inset-y-0 left-0 shadow-2xl z-20 w-64 "
    >
      {isLoading ? (
        <CategoriesMenuSkeleton />
      ) : (
        <>
          <div className="px-4 py-4 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Categories
            </span>
          </div>

          <ul className="flex flex-col gap-0.5 p-2 overflow-y-auto">
            <CategoryItem
              category={ALL_PRODUCTS_CATEGORY}
              isActive={activeCategory === null}
              onSelect={handleSelect}
            />

            {categories?.map((category) => (
              <CategoryItem
                category={category}
                isActive={category.slug === activeCategory}
                onSelect={handleSelect}
                key={category.slug}
              />
            ))}
          </ul>
        </>
      )}
    </motion.div>
  );
}

const ITEM_WIDTHS = [
  "w-3/4",
  "w-full",
  "w-2/3",
  "w-5/6",
  "w-1/2",
  "w-4/5",
  "w-3/4",
  "w-2/3",
  "w-5/6",
  "w-1/2",
  "w-4/5",
  "w-3/4",
  "w-2/3",
  "w-5/6",
  "w-1/2",
  "w-4/5",
];

function CategoriesMenuSkeleton() {
  return (
    <>
      <div className="px-5 py-5 border-b border-slate-100">
        <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
      </div>

      <ul className="flex flex-col gap-0.5 p-2">
        {ITEM_WIDTHS.map((w, i) => (
          <li key={i} className="px-3 py-2">
            <div className={`h-5 ${w} animate-pulse rounded bg-slate-200`} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default CategoriesMenu;
