import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ProductGalleryImage from "./ProductGalleryImage";
import Spinner from "../../ui/Spinner";

type ProductGalleryModalProps = {
  images: string[];
  handleCloseGallery: () => void;
};

function ProductGalleryModal({
  images,
  handleCloseGallery,
}: ProductGalleryModalProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const numImages = images.length;
  const hasMultipleImages = numImages > 1;

  function handleSelectImage(index: number) {
    setMainImageIndex(index);
  }

  function handlePrevImage() {
    if (!hasMultipleImages) return;
    if (mainImageIndex <= 0) setMainImageIndex(numImages - 1);
    else setMainImageIndex((prev) => prev - 1);
  }

  function handleNextImage() {
    if (!hasMultipleImages) return;
    if (mainImageIndex >= numImages - 1) setMainImageIndex(0);
    else setMainImageIndex((prev) => prev + 1);
  }

  useEffect(() => {
    setImgLoaded(false);
  }, [mainImageIndex]);

  return (
    <Modal onClose={handleCloseGallery}>
      <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
        {hasMultipleImages && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-slate-800 active:scale-95"
            >
              <HiChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-slate-800 active:scale-95"
            >
              <HiChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {!imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        )}
        <button
          onClick={handleNextImage}
          className={hasMultipleImages ? "cursor-pointer" : "cursor-default"}
        >
          <img
            className={`h-full w-full object-contain transition-opacity duration-200 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            src={images[mainImageIndex]}
            onLoad={() => setImgLoaded(true)}
          />
        </button>
      </div>

      {hasMultipleImages && (
        <div className="flex gap-2 overflow-x-auto border-t border-slate-100 p-3">
          {images.map((image, i) => (
            <ProductGalleryImage
              key={i}
              onClick={() => handleSelectImage(i)}
              isSelected={mainImageIndex === i}
              src={image}
            />
          ))}
        </div>
      )}
    </Modal>
  );
}

export default ProductGalleryModal;
