export type Category = {
  slug: string | null;
  name: string;
  url?: string;
};

export async function getCategoriesList(): Promise<Category[]> {
  const res = await fetch("https://dummyjson.com/products/categories");

  if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`);

  const data: Category[] = await res.json();

  return data;
}

export type GetAllProductsParams = {
  category: string | null;
  page: number;
  limit: number;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;

  dimensions: {
    width: number;
    height: number;
    depth: number;
  };

  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;

  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];

  returnPolicy: string;
  minimumOrderQuantity: number;

  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };

  images: string[];
  thumbnail: string;
};

type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export async function getAllProducts({
  category,
  page,
  limit,
}: GetAllProductsParams): Promise<ProductsResponse> {
  let URL = `https://dummyjson.com/products`;

  const skip = page ? limit * (page - 1) : 0;

  if (category) URL = `${URL}/category/${category}`;

  URL = `${URL}?limit=${limit}`;

  if (skip) URL = `${URL}&skip=${skip}`;

  const res = await fetch(URL);

  if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`);

  const data: ProductsResponse = await res.json();

  return data;
}

export type SearchProductsParams = {
  signal?: AbortSignal;
  query: string;
  page: number;
  limit: number;
};

export async function searchProducts({
  query,
  signal,
  page,
  limit,
}: SearchProductsParams): Promise<ProductsResponse | null> {
  if (!query) return null;
  let URL = `https://dummyjson.com/products/search?q=${query}`;

  const skip = page ? limit * (page - 1) : 0;

  URL = `${URL}&limit=${limit}`;

  if (skip) URL = `${URL}&skip=${skip}`;

  const res = await fetch(URL, { signal });

  if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`);

  const data: ProductsResponse = await res.json();

  return data;
}

export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("Product not found.");
    }
    throw new Error("Failed to fetch product.");
  }

  const data: Product = await res.json();

  return data;
}

export type CartProductAPI = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountedTotal: number;
  discountPercentage: number;
  thumbnail: string;
};

export type CartProduct = Omit<CartProductAPI, "total" | "discountedTotal">;

export type CartProductPayload = CartProduct;

export type Cart = {
  id: number;
  products: CartProduct[];
  userId: number;
  totalProducts: number;
  totalQuantity: number;
};

type UserCartsResponse = {
  carts: {
    id: number;
    products: CartProductAPI[];
    userId: number;
    totalProducts: number;
    totalQuantity: number;
  }[];
};

export async function getUserCart(id: number): Promise<Cart> {
  const res = await fetch(`https://dummyjson.com/carts/user/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status}`);
  }

  const data: UserCartsResponse = await res.json();

  const rawCart = data.carts[0];

  const products: CartProduct[] = rawCart.products.map(
    ({ total: _total, discountedTotal: _discountedTotal, ...rest }) => rest,
  );

  return {
    id: rawCart.id,
    userId: rawCart.userId,
    totalProducts: rawCart.totalProducts,
    totalQuantity: rawCart.totalQuantity,
    products,
  };
}
