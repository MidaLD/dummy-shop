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

  const isActive = searchParams.get("category") === slug;

  function handleSetCategory() {
    if (!slug) {
      searchParams.delete("category");
      setSearchParams(searchParams);
      dispatch(setSearchQuery(""));
      navigate("/");
      return;
    }

    searchParams.set("category", slug);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
    dispatch(setSearchQuery(""));

    navigate(`/?${searchParams.toString()}`);
  }

  return (
    <li>
      <button
        onClick={handleSetCategory}
        className={[
          "cursor-pointer w-full text-left text-sm px-3 py-2 rounded-md transition-colors duration-150",
          isActive
            ? "bg-slate-100 text-slate-900 font-semibold"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
        ].join(" ")}
      >
        {name}
      </button>
    </li>
  );
}

export default CategoryItem;
