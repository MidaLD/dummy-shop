import { useQuery } from "@tanstack/react-query";
import { getCategoriesList } from "../../services/apiDummyShop";

export function useCategoriesList() {
  const { data: categories, isLoading } = useQuery({
    queryFn: getCategoriesList,
    queryKey: ["categories"],
  });

  return { categories, isLoading };
}
