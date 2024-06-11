import React from "react";
import UploadedImage from "./UploadedImage";

const UploadWindow = ({
  getRootProps,
  getInputProps,
  uploadedImages,
  setUploadedImages,
  handleDeleteImage,
  handleCrop,
  setUploadWindowOpen,
  uploadingImage,
  MAX_UPLOADS,
  upload_icon,
  delete_icon,
  crop_icon,
  selectedImageIndex,
  setSelectedImageIndex,
  handleSelectImage,
  error,
}) => {
  const handleClose = (event) => {
    event.stopPropagation();
    setUploadWindowOpen(false);
  };

  return (
    <div className="upload__window">
      <div className="upload__content__wrapper">
        <div className="upload__top">
          <div className="upload__head">
            <p>Upload image(s)</p>
          </div>
          <button className="close__button" onClick={handleClose}>
            x
          </button>
        </div>
        <p className="upload__upto">You may upload up to 5 images</p>
        {uploadedImages.length < MAX_UPLOADS ? (
          <div className="upload__content" {...getRootProps()}>
            <input {...getInputProps()} />
            <div className="upload__icon">
              <img src={upload_icon} alt="upload_icon.png" />
            </div>
            <div className="upload__body">
              <p className="upload__body__top">
                Click or drag and drop to upload
              </p>
              <p className="upload__body__bottom">PNG, or JPG (Max 5MB)</p>
            </div>
            {uploadingImage && (
              <div className="progress__container">
                <div
                  className="progress__bar"
                  style={{ width: `${uploadingImage.progress}%` }}
                ></div>
              </div>
            )}
          </div>
        ) : (
          <div className="limit__message">
            <p className="limit__top">You've reached the image limit</p>
            <p className="limit__bottom">
              Remove one or more to upload more images.
            </p>
          </div>
        )}
        {uploadedImages.length > 0 && (
          <div className="uploaded__images">
            {uploadedImages.map((image, index) => (
              <UploadedImage
                key={index}
                image={image}
                index={index}
                handleCrop={handleCrop}
                handleDeleteImage={handleDeleteImage}
                delete_icon={delete_icon}
                crop_icon={crop_icon}
                selectedImageIndex={selectedImageIndex}
                setSelectedImageIndex={setSelectedImageIndex}
              />
            ))}
            <div className="select__buttons">
              <button
                className="cancel__button__upload"
                onClick={() => setUploadWindowOpen(false)}
              >
                Cancel
              </button>
              <button
                className="confirm__button__upload"
                onClick={handleSelectImage}
              >
                Select Image
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadWindow;
