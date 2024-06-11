import React from "react";

const UploadedImage = ({
  image,
  index,
  handleCrop,
  handleDeleteImage,
  delete_icon,
  crop_icon,
  selectedImageIndex,
  setSelectedImageIndex,
}) => {
  return (
    <div
      className={`uploaded__image ${
        selectedImageIndex === index ? "selected" : ""
      }`}
      onClick={() => setSelectedImageIndex(index)}
    >
      <img src={image.src} alt={image.name} />
      <div className="uploaded__img__info">
        <div className="uploaded__img">
          <p className="uploaded__image__name">{image.name}</p>
          <p className="uploaded__image__size">
            {(image.size / 1024).toFixed(2)} KB
          </p>
        </div>

        <div className="uploaded__delete">
          <div className="crop">
            <button
              className="delete__button"
              onClick={() => handleCrop(image.src, index)}
            >
              <img src={crop_icon} alt="crop.png" />
            </button>
            <button
              className="delete__button"
              onClick={() => handleCrop(image.src, index)}
            >
              Crop
            </button>
          </div>
          <div className="delete">
            <button
              className="delete__button"
              onClick={() => handleDeleteImage(index)}
            >
              <img src={delete_icon} alt="delete.png" />
            </button>
            <button
              className="delete__button"
              onClick={() => handleDeleteImage(index)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="selected__radial">
        <input
          type="radio"
          name="selectedImage"
          checked={selectedImageIndex === index}
          onChange={() => setSelectedImageIndex(index)}
        />
      </div>
    </div>
  );
};

export default UploadedImage;
