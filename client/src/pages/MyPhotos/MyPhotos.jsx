import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header3";
import axiosInstance from "../../lib/axios";
import { API_URLS } from "../../constants/apiUrls";
import { DeletePhotoModal } from "../../components/Modal/DeletePhotoModal";
import { showErrorToast, showSuccessToast } from "../../lib/toast";
import { useNavigate } from "react-router-dom";

const MyPhotos = () => {
  const deleteRefs = useRef({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [imageStates, setImageStates] = useState({});
  const [openMyPhotos, setOpenMyPhotos] = useState(true);
  const [userData, setUserData] = useState([]);
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const user_id = localStorage.getItem("userId");
  const navigateTo = useNavigate();
  const deleted = () => {
    fetchData();
  };

  const getPublicIdFromUrl = (url) => {
    const parts = url.split("/");
    const fileName = parts[parts.length - 1];
    return fileName.split(".")[0];
  };

  const fetchData = async () => {
    try {
      const dataResponse = await axiosInstance.get(
        `${API_URLS.GET_USER_BY_ID}/${user_id}`
      );
      const photoResponse = await axiosInstance.get(
        `${API_URLS.GET_PHOTO}/${user_id}`
      );

      setUserData(dataResponse.data[0]);
      const photoData = photoResponse.data[0];

      const imageArray = Object.entries(photoData)
        .filter(([key, value]) => key.startsWith("pic") && value)
        .map(([key, value]) => ({
          name: key,
          imageUrl: value,
        }));

      setImages(imageArray);
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    }
  };

  const handleDivClick = () => fileInputRef.current.click();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("selectedImg", file); // directly send file, not base64

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const photoData = await axiosInstance.post(API_URLS.ADD_PHOTO, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const targetPercent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          const incrementProgress = () => {
            setUploadProgress((prev) => {
              if (prev < targetPercent) {
                setTimeout(incrementProgress, 36); // 20ms for smooth animation
                return prev + 1;
              }
              return prev;
            });
          };

          incrementProgress();
        },
      });

      if (photoData.data.length) {
        showSuccessToast(photoData.message, navigateTo);
        fetchData();
      } else {
        showErrorToast(photoData.message);
      }

      fileInputRef.current.value = "";
    } catch (error) {
      console.error(error);
      showErrorToast("Photo upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle outside clicks to close all delete popups
  useEffect(() => {
    const handleClickOutside = (event) => {
      let clickedInsideAny = false;
      Object.values(deleteRefs.current).forEach((ref) => {
        if (ref && ref.contains(event.target)) {
          clickedInsideAny = true;
        }
      });

      if (!clickedInsideAny) {
        setImageStates((prev) => {
          const newStates = {};
          Object.keys(prev).forEach((index) => {
            newStates[index] = { ...prev[index], openDelete: false };
          });
          return newStates;
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDeletePopup = (index) => {
    setImageStates((prev) => ({
      ...prev,
      [index]: {
        ...(prev[index] || {}),
        openDelete: !prev[index]?.openDelete,
      },
    }));
  };

  const toggleModal = (index) => {
    setImageStates((prev) => ({
      ...prev,
      [index]: {
        ...(prev[index] || {}),
        openModal: true,
        isOpen: true,
      },
    }));
  };

  const closeModal = (index) => {
    setImageStates((prev) => ({
      ...prev,
      [index]: {
        ...(prev[index] || {}),
        openModal: false,
        isOpen: false,
      },
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full flex justify-center mt-30 pt-10 px-10 bg-blush-50 z-50">
      <Header
        userData={userData}
        openMyPhotos={openMyPhotos}
        setOpenMyPhotos={setOpenMyPhotos}
        profilePic={userData.profilePic}
      />

      {isUploading && (
        <div className="fixed inset-0  backdrop-blur-sm bg-[#462eb365] flex items-center justify-center z-50">
          <div className="bg-white absolute flex flex-col  gap-4 items-center top-18 w-100 pb-6 rounded-md shadow-md ">
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

      <div className="w-5xl h-screen p-4 flex flex-col items-center gap-6">
        <p className="text-center text-2xl font-bold text-charcoal-900">
          You have added {images.length + 1} photo{images.length >= 1 && "s"}.
          Add more to get better responses!
        </p>

        {images.length <= 5 && (
          <div
            onClick={handleDivClick}
            className="bg-violet-500 rounded-xl cursor-pointer px-1 py-2 w-78 text-white flex justify-center items-center gap-2 hover:bg-violet-600 shadow-violet-400 hover:shadow-md"
          >
            <i className="ri-mac-fill text-xl"></i>
            <p className="mb-1 font-semibold">Add photos from my computer</p>
            <i className="ri-arrow-drop-right-line flex items-center justify-center text-xl border border-white h-7 w-7 rounded-full"></i>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        )}

        <div className="bg-violet-100  h-80 py-18 px-10 flex gap-4 rounded-md">
          {/* Profile Picture */}
          <div className="h-45 w-40 hover:h-55 hover:w-50 transition-all duration-300 ease-in-out overflow-hidden rounded-md relative">
            <img
              src={userData.profilePic}
              className="object-cover w-full"
              alt=""
            />
            {imageStates["profilePic"]?.openDelete && (
              <div
                ref={(el) => (deleteRefs.current["profilePic"] = el)}
                className="absolute w-35  space-y-1 left-2 top-12 bg-gray-200 pt-2 text-sm"
              >
                <p className="px-2">Profile Picture</p>
                <p
                  onClick={() => toggleModal("profilePic")}
                  className="hover:bg-gray-300 cursor-pointer hover:underline hover:text-white px-2 py-1"
                >
                  Delete
                </p>
              </div>
            )}
            <span className="absolute bottom-0 bg-rose-400 text-white px-0.5 font-semibold w-full text-center">
              Profile Picture
            </span>
            <i
              onClick={() => toggleDeletePopup("profilePic")}
              className="absolute top-0 right-0 rounded-bl-md bg-white p-0.5 text-blue-600 cursor-pointer ri-pencil-fill"
            ></i>
            {imageStates["profilePic"]?.openModal && (
              <DeletePhotoModal
                publicId={getPublicIdFromUrl(userData.profilePic)}
                name="profilePic"
                isOpen={imageStates["profilePic"]?.isOpen}
                setIsOpen={() => closeModal("profilePic")}
                deleted={deleted}
              />
            )}
          </div>

          {/* Other images */}
          {images.map((image, index) => (
            <div
              key={index}
              className="h-45 w-40 hover:h-55 hover:w-50 transition-all duration-300 ease-in-out overflow-hidden relative rounded-md"
            >
              <img
                src={image.imageUrl}
                className="object-cover w-full"
                alt=""
              />
              {imageStates[index]?.openDelete && (
                <div
                  ref={(el) => (deleteRefs.current[index] = el)}
                  className="absolute space-y-1 w-35 left-2 top-12 bg-gray-200 pt-2 text-sm"
                >
                  <p className="px-2">Photo {index + 1}</p>
                  <p
                    onClick={() => toggleModal(index)}
                    className="hover:bg-gray-300 cursor-pointer hover:underline hover:text-white px-2 py-1"
                  >
                    Delete
                  </p>
                </div>
              )}
              <i
                onClick={() => toggleDeletePopup(index)}
                className="absolute top-0 right-0 rounded-bl-md bg-white p-0.5 text-blue-600 cursor-pointer ri-pencil-fill"
              ></i>
              {imageStates[index]?.openModal && (
                <DeletePhotoModal
                  publicId={getPublicIdFromUrl(image.imageUrl)}
                  name={image.name}
                  isOpen={imageStates[index]?.isOpen}
                  setIsOpen={() => closeModal(index)}
                  deleted={deleted}
                />
              )}
            </div>
          ))}

          {images.length <= 5 && (
            <div
              onClick={() => {
                handleDivClick();
              }}
              className="cursor-pointer mt-5 h-35 w-30 bg-white overflow-hidden rounded-md flex flex-col items-center justify-center hover:bg-violet-50"
            >
              <i className="ri-add-circle-fill text-6xl text-pink-300"></i>
              <p className="hover:text-violet-600">Add photo</p>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPhotos;
