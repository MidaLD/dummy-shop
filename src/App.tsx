import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import CartPage from "./pages/CartPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProductDetailsPage from "./features/shop/ProductDetailsPage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./features/user/ProtectedRoute";
import PageNotFound from "./ui/PageNotFound";
import { useIsMobile } from "./features/hooks/useIsMobile";
import UserProfilePage from "./pages/UserProfilePage";
import ShopPage from "./pages/ShopPage";
import LoginFormPage from "./pages/LoginFormPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      gcTime: 20 * 60 * 1000,
    },
  },
});

function App() {
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginFormPage />} />
          <Route element={<AppLayout />}>
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
      </BrowserRouter>

      <Toaster
        position={isMobile ? "bottom-center" : "bottom-right"}
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            style: {
              background: "#5262bc",
              color: "#fff",
            },
          },
          error: {
            duration: 5000,
            style: {
              background: "#C62828",
              color: "#fff",
            },
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
