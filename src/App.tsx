import { BrowserRouter, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import AppLayout from "./ui/AppLayout";
import CartPage from "./pages/CartPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./features/user/ProtectedRoute";
import PageNotFound from "./ui/PageNotFound";
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));
const LoginFormPage = lazy(() => import("./pages/LoginFormPage"));
import ShopPage from "./pages/ShopPage";
import BreakpointInitializer from "./ui/BreakpointInitializer";
import SpinnerFullPage from "./ui/SpinnerFullPage";
import CartProvider from "./features/cart/CartProvider";

const toatsOptions = {
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BreakpointInitializer />
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route path="/login" element={<LoginFormPage />} />
            <Route
              element={
                <CartProvider>
                  <AppLayout />
                </CartProvider>
              }
            >
              <Route path="/" element={<ShopPage />} />
              <Route
                path="/product-details/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="/cart" element={<CartPage />} />

              <Route
                path="/user"
                element={
                  <ProtectedRoute>
                    <UserProfilePage />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      <Toaster
        position="bottom-right"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={toatsOptions}
      />
    </QueryClientProvider>
  );
}

export default App;
