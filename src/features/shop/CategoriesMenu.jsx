import Spinner from "../../ui/Spinner";
import CategoryItem from "./CategoryItem";
import { useCategoriesList } from "./useCategoriesList";
import { useDispatch } from "react-redux";
import { setSearchQuery, toggleCategoriesMenu } from "../../redux/shopSlice";
import { useNavigate, useSearchParams } from "react-router";
import { motion } from "motion/react"; // eslint-disable-line no-unused-vars
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useIsLargeDesktop } from "../hooks/useIsLargeDesktop";

function CategoriesMenu() {
  const { categories, isLoading } = useCategoriesList();
  const isLargeDesktop = useIsLargeDesktop();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const outsideRef = useOutsideClick(() => {
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
          <Spinner />
        ) : (
          <>
            <button className="category-item-button all-products-button">
              <li onClick={handleAllProductsCat}>All products</li>
            </button>
            {categories.map((category) => (
              <CategoryItem category={category} key={category.slug} />
            ))}
          </>
        )}
      </motion.ul>
      {!isLargeDesktop && (
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
