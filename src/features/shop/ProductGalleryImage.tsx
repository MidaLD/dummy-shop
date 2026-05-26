import { useState } from "react";
import Spinner from "../../ui/Spinner";

type ProductGalleryImageProps = {
  onClick: () => void;
  isSelected: boolean;
  src: string;
};

function ProductGalleryImage({
  onClick,
  isSelected,
  src,
}: ProductGalleryImageProps) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      className={`relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-150 ${
        isSelected ? "border-slate-700" : "border-transparent hover:border-slate-300"
      }`}
      onClick={onClick}
    >
      {!imgLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
          <Spinner size="sm" />
        </div>
      )}
      <img
        onLoad={() => setImgLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-200 ${
          imgLoaded ? "opacity-100" : "opacity-0"
        }`}
        src={src}
      />
    </div>
  );
}

export default ProductGalleryImage;
