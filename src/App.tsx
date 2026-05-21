import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import CartPage from "./pages/CartPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./features/user/ProtectedRoute";
import PageNotFound from "./ui/PageNotFound";
import UserProfilePage from "./pages/UserProfilePage";
import ShopPage from "./pages/ShopPage";
import LoginFormPage from "./pages/LoginFormPage";
import BreakpointInitializer from "./ui/BreakpointInitializer";

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
        position="bottom-right"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          style: {
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            fontWeight: "500",
            maxWidth: "420px",
            padding: "12px 20px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            boxShadow:
              "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            background: "#ffffff",
            color: "#1e293b",
          },
          success: {
            style: {
              background: "#334155",
              color: "#ffffff",
              border: "1px solid #334155",
            },
            iconTheme: {
              primary: "#ffffff",
              secondary: "#334155",
            },
          },
          error: {
            duration: 5000,
            style: {
              background: "#fef2f2",
              color: "#b91c1c",
              border: "1px solid #fecaca",
            },
            iconTheme: {
              primary: "#b91c1c",
              secondary: "#fef2f2",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
