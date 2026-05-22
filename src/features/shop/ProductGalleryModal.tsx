import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HiChevronLeft, HiChevronRight, HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";

import ProductGalleryImage from "./ProductGalleryImage";

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
  const ref = useOutsideClick<HTMLDivElement>(handleCloseGallery);
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

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={ref}
          className="relative my-4 flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        >
          <button
            onClick={handleCloseGallery}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-sm backdrop-blur-sm transition-colors hover:bg-slate-100 hover:text-slate-800"
          >
            <HiXMark className="h-4 w-4" />
          </button>

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
                <svg
                  className="w-7 h-7 animate-spin text-slate-300"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              </div>
            )}
            <button
              onClick={handleNextImage}
              className={
                hasMultipleImages ? "cursor-pointer" : "cursor-default"
              }
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
                  className={`relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-150 ${
                    mainImageIndex === i
                      ? "border-slate-700"
                      : "border-transparent hover:border-slate-300"
                  }`}
                  src={image}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("root") ?? document.body,
  );
}

export default ProductGalleryModal;
