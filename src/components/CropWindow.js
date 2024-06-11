import React from "react";
import Cropper from "react-easy-crop";

const CropWindow = ({
  crop,
  zoom,
  setCrop,
  setZoom,
  onCropComplete,
  selectedImageForCrop,
  setCropWindowOpen,
  showCroppedImage,
}) => {
  return (
    <div className="crop__window">
      <div className="crop__top">
        <div className="crop__head">
          <p>Crop your picture</p>
        </div>
        <button
          className="close__button"
          onClick={() => setCropWindowOpen(false)}
        >
          x
        </button>
      </div>
      <div className="crop__container">
        <Cropper
          image={selectedImageForCrop}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className="select__buttons">
        <button
          className="cancel__button"
          onClick={() => setCropWindowOpen(false)}
        >
          cancel
        </button>
        <button className="crop__button" onClick={showCroppedImage}>
          confirm
        </button>
      </div>
    </div>
  );
};

export default CropWindow;
