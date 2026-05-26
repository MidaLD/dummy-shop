import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useProduct } from "../features/shop/useProduct";
import ProductImage from "../features/shop/ProductImage";
import ProductInfo from "../features/shop/ProductInfo";
import ProductSpecs from "../features/shop/ProductSpecs";
import ProductGalleryModal from "../features/shop/ProductGalleryModal";
import ReviewsContainer from "../features/shop/ReviewsContainer";
import SpinnerFullPage from "../ui/SpinnerFullPage";

function ProductDetailsPage() {
  const [galleryOpen, setGalleryOpen] = useState(false);

  const { productId } = useParams();
  const id = Number(productId);
  const { product, isLoading, error } = useProduct(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <SpinnerFullPage />;

  if (error || !product)
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-slate-500">
          {error ? error.message : "No product found"}
        </p>
      </div>
    );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductImage
          src={product.images[0]}
          alt={product.title}
          availabilityStatus={product.availabilityStatus}
          onOpenGallery={() => setGalleryOpen(true)}
        />
        <ProductInfo product={product} />
      </div>

      <ProductSpecs product={product} />
      <ReviewsContainer reviews={product.reviews} />

      {galleryOpen && (
        <ProductGalleryModal
          images={product.images}
          handleCloseGallery={() => setGalleryOpen(false)}
        />
      )}
    </div>
  );
}

export default ProductDetailsPage;
