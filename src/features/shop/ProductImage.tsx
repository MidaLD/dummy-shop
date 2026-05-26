import { useState } from "react";
import Spinner from "../../ui/Spinner";

type ProductImageProps = {
  src: string;
  alt: string;
  availabilityStatus: string;
  onOpenGallery: () => void;
};

function ProductImage({
  src,
  alt,
  availabilityStatus,
  onOpenGallery,
}: ProductImageProps) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <button
      onClick={onOpenGallery}
      className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 shadow-sm transition-shadow duration-200 hover:shadow-md"
    >
      {!imgLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      <img
        className={`h-full w-full object-contain transition-transform duration-300 group-hover:scale-105 ${
          imgLoaded ? "opacity-100" : "opacity-0"
        }`}
        fetchPriority="high"
        src={src}
        alt={alt}
        onLoad={() => setImgLoaded(true)}
      />
      {availabilityStatus === "Low Stock" && (
        <span className="absolute top-3 left-3 rounded-md bg-amber-500/90 px-2 py-0.5 text-xs font-medium text-white">
          Low Stock
        </span>
      )}
      {imgLoaded && (
        <span className="absolute bottom-3 right-3 rounded-lg bg-white/80 px-2.5 py-1 text-xs font-medium text-slate-500 shadow-sm backdrop-blur-sm">
          View gallery
        </span>
      )}
    </button>
  );
}

export default ProductImage;
