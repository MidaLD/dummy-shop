import { useNavigate, useSearchParams } from "react-router";
import { setSearchQuery } from "../../redux/shopSlice";
import { Category } from "../../services/apiDummyShop";
import { useAppDispatch } from "../hooks/useAppDispatch";

type CategoryItemProps = {
  category: Category;
};

function CategoryItem({ category }: CategoryItemProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { name, slug } = category;
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSetCategory() {
    searchParams.set("category", slug);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
    dispatch(setSearchQuery(""));

    navigate(`/?${searchParams.toString()}`);
  }

  return (
    <li>
      <button onClick={handleSetCategory} className="category-item-button">
        {name}
      </button>
    </li>
  );
}

export default CategoryItem;
