import ProductItem from "../features/shop/ProductItem";
import { useAllProducts } from "../features/shop/useAllProducts";
import { useSearchProducts } from "../features/shop/useSearchProducts";
import { useSearchParams } from "react-router";
import Pagination from "../ui/Pagination";
import { useAppSelector } from "../features/hooks/useAppSelector";

function ShopPage() {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const page = Number(searchParams.get("page")) || 1;
  const query = useAppSelector((store) => store.shop.searchQuery);

  const limit = 12;

  const { data, isLoading, isError, error } = useAllProducts({
    category,
    page,
    limit,
    enabled: !query,
  });
  const { searchedProducts, isLoadingSearch } = useSearchProducts({
    query,
    page,
    limit,
  });

  if (isLoading || isLoadingSearch) {
    return (
      <div className="px-4 py-6 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {Array.from({ length: limit }).map((_, i) => (
            <ProductItemSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    const errorMessage =
      error?.message || "An error occurred while loading products.";
    return (
      <p className="py-10 text-center text-sm text-red-500">{errorMessage}</p>
    );
  }

  const currentData = query ? searchedProducts : data;
  const products = currentData?.products || [];
  const total = currentData?.total || 0;
  const numPages = Math.ceil(total / limit);

  const placeholderCount = Math.max(0, limit - products.length);

  return (
    <div className="px-4 py-6 sm:px-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {products.length > 0 ? (
          <>
            {products.map((product) => (
              <ProductItem product={product} key={product.id} />
            ))}
            {Array.from({ length: placeholderCount }).map((_, i) => (
              <div
                key={`placeholder-${i}`}
                className="invisible **:animate-none"
              >
                <ProductItemSkeleton />
              </div>
            ))}
          </>
        ) : (
          <p className="col-span-full py-10 text-center text-sm text-slate-400">
            No products match your search.
          </p>
        )}
      </div>
      {numPages > 1 && <Pagination numPages={numPages} />}
    </div>
  );
}

export default ShopPage;

function ProductItemSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm${className ? ` ${className}` : ""}`}
    >
      <div className="aspect-square animate-pulse bg-slate-200" />

      <div className="flex flex-1 flex-col gap-2 px-4 pb-2 pt-3">
        <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
        <div className="h-10 w-full animate-pulse rounded bg-slate-200" />
        <div className="mt-auto flex items-center gap-2 pt-1">
          <div className="h-5 w-14 animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-10 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-10 animate-pulse rounded bg-slate-200" />
        </div>
        <div className="h-3 w-12 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="px-4 pb-4 pt-1">
        <div className="h-10 w-full animate-pulse rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}
