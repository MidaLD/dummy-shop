import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../../services/apiDummyShop";

export function useSearchProducts({ query, page, limit }) {
  const { data: searchedProducts, isLoading: isSearching } = useQuery({
    queryFn: ({ signal }) => searchProducts({ query, page, limit, signal }),

    queryKey: ["search", query, page, limit],

    enabled: !!query,
  });

  return { searchedProducts, isSearching };
}
