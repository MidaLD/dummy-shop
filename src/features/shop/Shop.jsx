import { useSelector } from "react-redux";
import Spinner from "../../ui/Spinner";
import ProductItem from "./ProductItem";
import { useAllProducts } from "./useAllProducts";
import { useSearchProducts } from "./useSearchProducts";
import { useSearchParams } from "react-router";
import Pagination from "../../ui/Pagination";
import { useIsMobile } from "../hooks/useIsMobile";

function Shop() {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const page = Number(searchParams.get("page")) || 1;
  const query = useSelector((store) => store.shop.searchQuery);

  const isMobile = useIsMobile();
  const limit = isMobile ? 9 : 8;

  const { data, isLoading, isError, error } = useAllProducts({
    category,
    page,
    limit,
  });
  const { searchedProducts, isLoadingSearch, isErrorSearch, errorSearch } =
    useSearchProducts({
      query,
      page,
      limit,
    });

  if (isLoading || isLoadingSearch) {
    return (
      <div className="spinner-shop-box">
        <Spinner />
      </div>
    );
  }

  if (isError || isErrorSearch) {
    const errorMessage =
      error?.message ||
      errorSearch?.message ||
      "An error occurred while loading products.";
    return <p className="error-message">{errorMessage}</p>;
  }

  const currentData = query ? searchedProducts : data;
  const products = currentData?.products || [];
  const total = currentData?.total || 0;
  const numPages = Math.ceil(total / limit);

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductItem product={product} id={product.id} key={product.id} />
          ))
        ) : (
          <p className="no-results">No products match your search.</p>
        )}
      </div>
      {numPages > 1 && <Pagination numPages={numPages} />}
    </div>
  );
}

export default Shop;
