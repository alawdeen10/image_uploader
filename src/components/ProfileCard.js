import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./css/ProfileCard.css";
import PP__1 from "../img/PP__1.png";
import Vector from "../img/Vector.png";
import upload_icon from "../img/upload_icon.png";
import delete_icon from "../img/delete-icon.png";
import crop_icon from "../img/crop_icon.png";
import getCroppedImg from "./utils/cropImage";
import ProfileImage from "./ProfileImage";
import UploadWindow from "./UploadWindow";
import CropWindow from "./CropWindow";
import Notification from "./Notification";

const MAX_UPLOADS = 5;

const ProfileCard = () => {
  const [isUploadWindowOpen, setUploadWindowOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(PP__1);
  const [uploadingImage, setUploadingImage] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [isCropWindowOpen, setCropWindowOpen] = useState(false);
  const [selectedImageForCrop, setSelectedImageForCrop] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        selectedImageForCrop,
        croppedArea
      );

      const updatedImages = uploadedImages.map((img, index) => {
        if (index === selectedImageIndex) {
          return { ...img, src: croppedImage };
        }
        return img;
      });

      setUploadedImages(updatedImages);
      setCropWindowOpen(false);
    } catch (e) {
      console.error(e);
    }
  }, [croppedArea, selectedImageForCrop, selectedImageIndex, uploadedImages]);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    await new Promise((resolve) => {
      reader.onload = (e) => {
        const newImage = {
          name: file.name,
          size: file.size,
          src: e.target.result,
        };
        setUploadedImages([...uploadedImages, newImage]);
        setUploadingImage(null);
        resolve();
      };

      reader.readAsDataURL(file);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handleDeleteImage = (index) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const handleCrop = (image, index) => {
    setSelectedImageForCrop(image);
    setSelectedImageIndex(index);
    setCropWindowOpen(true);
  };

  const handleSelectImage = () => {
    if (selectedImageIndex !== null) {
      setProfileImage(uploadedImages[selectedImageIndex].src);
      setUploadWindowOpen(false);
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 2000);
    }
  };

  return (
    <div className="profile">
      {showSuccessNotification && <Notification />}
      <div className="card">
        <div className="header">
          <ProfileImage
            profileImage={profileImage}
            setUploadWindowOpen={setUploadWindowOpen}
          />
        </div>
        <div className="content">
          <div className="content__name">
            <h2 className="name">Jack Smith</h2>
          </div>
          <div className="content__info">
            <p className="username">@kingjack</p>
            <p className="dot">•</p>
            <p className="job-title">Senior Product Designer at</p>
            <div className="work">
              <p className="work__place">
                <a
                  href="https://webflow.com"
                  target="blank"
                  className="company"
                >
                  <img src={Vector} alt="Webflow" />
                  Webflow
                </a>
              </p>
              <p>
                <span className="special__dot">•</span>
              </p>
              <p className="job-title">He/Him</p>
            </div>
          </div>
        </div>
        {isUploadWindowOpen && (
          <UploadWindow
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
            handleDeleteImage={handleDeleteImage}
            handleCrop={handleCrop}
            setUploadWindowOpen={setUploadWindowOpen}
            uploadingImage={uploadingImage}
            MAX_UPLOADS={MAX_UPLOADS}
            upload_icon={upload_icon}
            delete_icon={delete_icon}
            crop_icon={crop_icon}
            selectedImageIndex={selectedImageIndex}
            setSelectedImageIndex={setSelectedImageIndex}
            handleSelectImage={handleSelectImage}
          />
        )}
        {isCropWindowOpen && (
          <CropWindow
            crop={crop}
            zoom={zoom}
            setCrop={setCrop}
            setZoom={setZoom}
            onCropComplete={onCropComplete}
            selectedImageForCrop={selectedImageForCrop}
            setCropWindowOpen={setCropWindowOpen}
            showCroppedImage={showCroppedImage}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
