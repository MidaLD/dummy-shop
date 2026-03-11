import { useState } from "react";
import { createPortal } from "react-dom";
import { HiChevronLeft, HiChevronRight, HiMiniXCircle } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";
import Spinner from "../../ui/Spinner";

function ProductGalleryModal({ images, handleCloseGallery }) {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const ref = useOutsideClick(handleCloseGallery);
  const numImages = images.length;

  function handleSelectImage(index) {
    setMainImageIndex(index);
  }

  function handlePrevImage() {
    if (mainImageIndex <= 0) setMainImageIndex(numImages - 1);
    else setMainImageIndex((prev) => prev - 1);
  }

  function handleNextImage() {
    if (mainImageIndex >= numImages - 1) setMainImageIndex(0);
    else setMainImageIndex((prev) => prev + 1);
  }

  return createPortal(
    <div className="gallery-overlay">
      <div className="modal-box" ref={ref}>
        <div className="modal-image-box">
          {numImages > 1 && (
            <>
              <button onClick={handlePrevImage} className="modal-btn-left">
                <HiChevronLeft className="modal-icon" />
              </button>
              <button onClick={handleNextImage} className="modal-btn-right">
                <HiChevronRight className="modal-icon" />
              </button>
            </>
          )}

          {!imgLoaded && <Spinner />}
          <img
            className="modal-image"
            src={images[mainImageIndex]}
            onLoad={() => setImgLoaded(true)}
          />
        </div>
        {numImages > 1 && (
          <div className="modal-thumbnails-box">
            {images.map((image, i) => (
              <img
                onClick={() => handleSelectImage(i)}
                className={`modal-thumbnail ${
                  mainImageIndex === i ? "selected-image" : ""
                }`}
                key={i}
                src={image}
              />
            ))}
          </div>
        )}

        <button onClick={handleCloseGallery} className="modal-close-btn">
          <HiMiniXCircle className="modal-close-icon" />
        </button>
      </div>
    </div>,
    document.getElementById("root"),
  );
}

export default ProductGalleryModal;
