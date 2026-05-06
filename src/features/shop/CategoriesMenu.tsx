import Spinner from "../../ui/Spinner";
import CategoryItem from "./CategoryItem";
import { useCategoriesList } from "./useCategoriesList";
import { setSearchQuery, toggleCategoriesMenu } from "../../redux/shopSlice";
import { useNavigate, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useIsLargeDesktop } from "../hooks/useIsLargeDesktop";
import { useAppDispatch } from "../hooks/useAppDispatch";

type CategoriesMenuProps = {
  showCategoriesFinal: boolean;
};

function CategoriesMenu({ showCategoriesFinal }: CategoriesMenuProps) {
  const { categories, isLoading } = useCategoriesList();
  const isLargeDesktop = useIsLargeDesktop();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const outsideRef = useOutsideClick<HTMLUListElement>(() => {
    if (!isLargeDesktop) dispatch(toggleCategoriesMenu());
  });

  const ref = isLargeDesktop ? null : outsideRef;
  const navigate = useNavigate();

  function handleAllProductsCat() {
    searchParams.delete("category");
    setSearchParams(searchParams);
    dispatch(setSearchQuery(""));

    navigate("/");
  }

  if (isLoading) return null;

  return (
    <>
      <motion.ul
        initial={{ opacity: 0, x: "-100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.2, type: "tween" }}
        className="categories-menu"
        key="categories-menu"
        ref={ref}
      >
        {isLoading ? (
          <div className="categories-menu-spinner">
            <Spinner />
          </div>
        ) : (
          <>
            <button className="category-item-button all-products-button">
              <li onClick={handleAllProductsCat}>All products</li>
            </button>
            {categories &&
              categories.map((category) => (
                <CategoryItem category={category} key={category.slug} />
              ))}
          </>
        )}
      </motion.ul>
      {showCategoriesFinal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="categories-menu-overlay"
        ></motion.div>
      )}
    </>
  );
}

export default CategoriesMenu;
