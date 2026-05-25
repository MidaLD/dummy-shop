import { memo } from "react";

type CategoryItemProps = {
  category: { name: string; slug: string | null };
  isActive: boolean;
  onSelect: (slug: string | null) => void;
};

const CategoryItem = memo(function CategoryItem({
  category,
  onSelect,
  isActive,
}: CategoryItemProps) {
  const { name, slug } = category;

  return (
    <li>
      <button
        onClick={() => onSelect(slug)}
        className={`cursor-pointer w-full text-left text-sm px-3 py-2 rounded-md transition-colors duration-150 ${
          isActive
            ? "bg-slate-100 text-slate-900 font-semibold"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`}
      >
        {name}
      </button>
    </li>
  );
});

export default CategoryItem;
