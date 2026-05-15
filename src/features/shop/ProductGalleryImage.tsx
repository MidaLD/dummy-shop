import { useState } from "react";

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
          <svg className="w-4 h-4 animate-spin text-slate-300" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
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
