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

  const { data, isLoading } = useAllProducts({ category, page, limit });

  const { searchedProducts, isSearching } = useSearchProducts({
    query,
    page,
    limit,
  });

  if (isLoading || isSearching)
    return (
      <div className="spinner-shop-box">
        <Spinner />
      </div>
    );
  // if (true)
  //   return (
  //     <div className="spinner-shop-box">
  //       <Spinner />
  //     </div>
  //   );

  let products = data.products;
  let numPages = Math.ceil(data.total / limit);

  if (query) {
    products = searchedProducts.products;
    numPages = Math.ceil(searchedProducts.total / limit);
  }

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
