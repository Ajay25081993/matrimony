import React, { useRef, useState } from "react";
import girlAvatar from "../../assets/AiGirl.png";
import boyAvatar from "../../assets/Dp.png";
import camera from "../../assets/camera.png";
import { boyImages, girlImages } from "./images";
import { showErrorToast, showSuccessToast } from "../../lib/toast";
import axiosInstance from "../../lib/axios";
import { API_URLS } from "../../constants/apiUrls";
import { useNavigate } from "react-router-dom";

const PhotoUpload = ({ gender, handleSubmit }) => {
  const fileInputRef = useRef(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const navigateTo = useNavigate();

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  // Set preview image
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    const imageURL = URL.createObjectURL(file);
    setSelectedImg(imageURL);
  };

  // Upload to server
  const handleImageUpload = async () => {
    if (!imageFile) {
      showErrorToast("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", imageFile);

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const photoData = await axiosInstance.put(
        API_URLS.ADD_PROFILE_PHOTO,
        formData,

        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const targetPercent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(targetPercent);
          },
        }
      );
      console.log(photoData.data);
      
      if (photoData.data.length) {
        showSuccessToast(photoData.message, navigateTo);
        handleSubmit();
      } else {
        showErrorToast(photoData.message);
      }

      setImageFile(null);
      fileInputRef.current.value = "";
    } catch (error) {
      console.error(error);
      showErrorToast("Photo upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mt-30 mb-10 w-full flex-col gap-4 flex justify-center items-center">
      {/* Upload Progress Modal */}
      {isUploading && (
        <div className="fixed inset-0 backdrop-blur-sm bg-[#462eb365] flex items-center justify-center z-50">
          <div className="bg-white absolute flex flex-col gap-4 items-center top-18 w-100 pb-6 rounded-md shadow-md">
            <p className="w-full p-2 bg-violet-300 rounded-t-md text-white text-lg font-semibold mb-2">
              Uploading Photo...
            </p>
            <div className="w-64 h-5 bg-gray-300 rounded-sm overflow-hidden mb-2">
              <div
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-xl font-semibold text-sky-500">
              {uploadProgress} %
            </p>
          </div>
        </div>
      )}

      <div className="shadow-sm shadow-gray-600 bg-white w-3xl rounded-md flex justify-center items-center gap-10 flex-col p-5">
        <p className="text-2xl">
          Congrats Your Profile has been created. <br />
          Upload Photo and get better Matches
        </p>

        {/* Image Upload */}
        <div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageSelect}
          />

          <div
            onClick={handleDivClick}
            className="w-30 bg-gray-300 h-30 rounded-full shadow-md hover:shadow-xl shadow-gray-600 relative cursor-pointer"
          >
            <div className="w-30 h-30 rounded-full border-1 border-gray-400 overflow-hidden relative">
              <img
                className="object-cover w-full h-full"
                src={
                  selectedImg || (gender === "Female" ? girlAvatar : boyAvatar)
                }
                alt=""
              />
            </div>

            <img src={camera} className="w-8 absolute top-23 right-2" alt="" />
          </div>

          <p
            onClick={handleDivClick}
            className="border-1 border-green-200 hover:bg-green-400 hover:border-white hover:shadow-xs shadow-green-400 transition-colors mt-10 p-1 text-center font-semibold text-gray-600 cursor-pointer bg-green-200"
          >
            Choose Image
          </p>

          {/* Upload Button */}
          <button
            onClick={handleImageUpload}
            disabled={!imageFile}
            className={`mt-4 px-6 py-2 rounded bg-purple-400 text-white font-semibold ${
              !imageFile
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-purple-500"
            }`}
          >
            Upload Photo
          </button>
        </div>

        <div className="w-xl bg-gray-400 h-[2px]"></div>

        {/* Guidelines */}
        <div className="w-2xl p-2 space-y-4">
          <p>Photo guidelines</p>
          <div className="flex gap-2">
            {(gender === "Female" ? girlImages : boyImages).map(
              (image, index) => (
                <div key={index} className="space-y-1 w-30">
                  <div className="flex items-center gap-2">
                    <i
                      className={`${image.icon} ${
                        image.icon === "ri-check-line"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    ></i>
                    <p>{image.title}</p>
                  </div>
                  <img src={image.image} className="w-30" alt="" />
                </div>
              )
            )}
          </div>

          {/* Do's */}
          <div className="space-y-4">
            <p>Know more</p>
            <div className="flex gap-2 text-sm font-semibold">
              <i className={`ri-check-line text-green-500`}></i>
              <p>Do's</p>
            </div>
            <ul className="list-disc pl-8 ml-10 text-gray-400 text-sm font-semibold">
              <li>
                Your Photo should be front facing and your entire face visible.
              </li>
              <li>Ensure it's recent and not with a group.</li>
              <li>You can upload up to 20 Photos.</li>
              <li>
                Each must be less than 15MB in jpg, gif, png, bmp or tiff.
              </li>
            </ul>

            {/* Don'ts */}
            <div className="flex gap-2 text-sm font-semibold">
              <i className={`ri-close-line text-red-500`}></i>
              <p>Don'ts</p>
            </div>
            <ul className="list-disc pl-8 ml-10 text-gray-400 text-sm font-semibold tracking-tighter">
              <li>
                Watermarked, digitally enhanced, morphed, or Photos with
                personal info will be rejected.
              </li>
              <li>Irrelevant photos will lead to profile deactivation.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
