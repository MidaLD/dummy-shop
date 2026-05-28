import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import AppLayout from "./ui/AppLayout";
import CartPage from "./pages/CartPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ShopPage from "./pages/ShopPage";
import ProtectedRoute from "./features/user/ProtectedRoute";
import PageNotFound from "./ui/PageNotFound";
import BreakpointInitializer from "./ui/BreakpointInitializer";
import CartProvider from "./features/cart/CartProvider";
import NavigationProgress from "./ui/NavigationProgress";

const toastOptions = {
  style: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    fontWeight: "500",
    maxWidth: "420px",
    padding: "12px 20px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    background: "#ffffff",
    color: "#1e293b",
  },
  success: {
    style: {
      background: "#f0fdf4",
      color: "#166534",
      border: "none",
      borderLeft: "4px solid #16a34a",
      boxShadow: "0 4px 12px 0 rgb(0 0 0 / 0.15)",
    },
    iconTheme: {
      primary: "#16a34a",
      secondary: "#f0fdf4",
    },
  },
  error: {
    duration: 5000,
    style: {
      background: "#fef2f2",
      color: "#b91c1c",
      border: "none",
      borderLeft: "4px solid #dc2626",
      boxShadow: "0 4px 12px 0 rgb(0 0 0 / 0.15)",
    },
    iconTheme: {
      primary: "#dc2626",
      secondary: "#fef2f2",
    },
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      gcTime: 20 * 60 * 1000,
    },
  },
});

function RootLayout() {
  return (
    <>
      <NavigationProgress />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/login",
        lazy: async () => {
          const { default: Component } = await import("./pages/LoginFormPage");
          return { Component };
        },
      },
      {
        element: (
          <CartProvider>
            <AppLayout />
          </CartProvider>
        ),
        children: [
          { path: "/", element: <ShopPage /> },
          {
            path: "/product-details/:productId",
            element: <ProductDetailsPage />,
          },
          { path: "/cart", element: <CartPage /> },
          {
            element: <ProtectedRoute />,
            children: [
              {
                path: "/profile",
                lazy: async () => {
                  const { default: Component } =
                    await import("./pages/UserProfilePage");
                  return { Component };
                },
              },
            ],
          },
        ],
      },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BreakpointInitializer />
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
      <Toaster
        position="bottom-right"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={toastOptions}
      />
    </QueryClientProvider>
  );
}

export default App;
