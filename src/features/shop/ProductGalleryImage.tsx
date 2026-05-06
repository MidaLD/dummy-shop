import { useState } from "react";
import Spinner from "../../ui/Spinner";

type ProductGalleryImageProps = {
  onClick: () => void;
  className: string;
  key: number;
  src: string;
};

function ProductGalleryImage({
  onClick,
  className,
  key,
  src,
}: ProductGalleryImageProps) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <>
      {!imgLoaded && (
        <div className={`${className} modal-img-box`}>
          <Spinner />
        </div>
      )}
      <img
        onLoad={() => setImgLoaded(true)}
        onClick={onClick}
        className={imgLoaded ? className : ""}
        key={key}
        src={src}
      />
    </>
  );
}

export default ProductGalleryImage;
