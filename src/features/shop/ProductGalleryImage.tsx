import { useState } from "react";
import Spinner from "../../ui/Spinner";

type ProductGalleryImageProps = {
  onClick: () => void;
  className: string;
  src: string;
};

function ProductGalleryImage({
  onClick,
  className,
  src,
}: ProductGalleryImageProps) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className={className} onClick={onClick}>
      {!imgLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
          <Spinner small />
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
