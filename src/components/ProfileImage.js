import React from "react";

const ProfileImage = ({ profileImage, setUploadWindowOpen }) => {
  return (
    <>
      <img className="profile__image" src={profileImage} alt="Profile" />
      <button
        className="update__button"
        onClick={(event) => {
          event.preventDefault();
          setUploadWindowOpen(true);
        }}
      >
        Update picture
      </button>
    </>
  );
};

export default ProfileImage;
