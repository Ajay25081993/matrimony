import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../lib/axios";
import { API_URLS } from "../../constants/apiUrls";
import { customDate } from "../Matches/customDate";

const AllSentInterests = ({
  loggedInUserData,
  sentInterests,
  fetchInterests,
}) => {
  const navigateTo = useNavigate();
  //   const [allLikes, setAllLikes] = useState();
  const [allViews, setAllViews] = useState();
  const [openMenu, setOpenMenu] = useState(false);

  const sendInterest = async (id) => {
    try {
      const interestResponse = await axiosInstance.post(
        API_URLS.SEND_INTEREST,
        {
          sender_id: loggedInUserData.id,
          receiver_id: id,
        }
      );
      console.log(interestResponse);

      fetchInterests();
    } catch (error) {
      console.log(error);
    }
  };

  //   const likeThisProfile = async (userData) => {
  //     try {
  //       await axiosInstance.post(API_URLS.LIKE_USER, {
  //         liker_id: loggedInUserData.id,
  //         liked_id: userData.id,
  //       });
  //       fetchLikes(loggedInUserData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   const dislikeUser = async (userData) => {
  //     try {
  //       await axiosInstance.delete(`${API_URLS.REMOVE_LIKE}/${userData.id}`);

  //       fetchLikes(loggedInUserData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  const openProfile = (id) => {
    navigateTo(`/matches/all-matches/${id}`);
  };
  const fetchViews = async (user) => {
    try {
      const allViewResponse = await axiosInstance.get(
        `${API_URLS.ALL_VISITED_USER}/${user.id}`
      );
      setAllViews(allViewResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  //   const fetchInterests = async (user) => {
  //     try {
  //       const allInterestResponse = await axiosInstance.get(
  //         `${API_URLS.GET_INTERESTS}/${user.id}`
  //       );
  //       console.log(allInterestResponse.data);

  //       setAllInterests(allInterestResponse.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  const viewUser = async (id) => {
    try {
      let viewed = false;
      allViews.some((view) => {
        viewed = view.visited_id === id;
      });
      if (!viewed) {
        const viewResponse = await axiosInstance.post(API_URLS.VISIT_USER, {
          visiter_id: loggedInUserData.id,
          visited_id: id,
        });
        console.log(viewResponse);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   const fetchLikes = async (user) => {
  //     try {
  //       const response = await axiosInstance.get(
  //         `${API_URLS.GET_LIKED_USER}/${user.id}`
  //       );
  //       setAllLikes(response.data);
  //     } catch (err) {
  //       console.error("Failed to fetch likes:", err);
  //     }
  //   };

  useEffect(() => {
    if (sentInterests) {
      // fetchLikes(loggedInUserData);
      fetchViews(loggedInUserData);
      //   fetchInterests(loggedInUserData);
    }
  }, [loggedInUserData]);
console.log(sentInterests);

  return (
    <div className="w-2xl">
      {/* <div className="flex flex-wrap gap-2">
        <div className="p-1 border-1 text-sm  border-gray-300 rounded-4xl ">
          Profiles with photo
        </div>
        <div className="p-1 border-1 text-sm  border-gray-300 rounded-4xl ">
          Profile with horoscope
        </div>
        <div className="p-1 border-1  border-gray-300  text-sm rounded-4xl ">
          Location
        </div>
        <div className="p-1 border-1  border-gray-300  text-sm rounded-4xl ">
          Mutual matches
        </div>
      </div> */}
      <p className=" text-2xl font-semibold">
        {sentInterests?.length > 0
          ? `All interests sent (${sentInterests.length})`
          : "No interests sent"}
      </p>

      {sentInterests?.map((data, index) => {
        return (
          <div
            key={index}
            className="mt-5 border-1 border-gray-300 rounded-lg p-4 relative flex w-full space-x-4 shadow shadow-gray-400"
          >
            <div className="relative w-60 h-55 overflow-hidden rounded-xl border-1 cursor-pointer ">
              <img
                onClick={() => {
                  openProfile(data.receiver.id);
                  viewUser(data.receiver.id);
                }}
                className="object-cover w-full"
                src={data.receiver.profilePic}
                alt=""
              />
            </div>

            <div
              className={`${
                openMenu ? "max-h-31 scale-3d" : "max-h-0 scale-95"
              } overflow-hidden  transition-all duration-300  bg-gray-50 shadow-sm shadow-gray-700 absolute right-5 top-13`}
            >
              <div className="space-x-1 px-2 pt-1 hover:bg-purple-100 cursor-pointer">
                <i class="ri-delete-bin-line"></i>{" "}
                <span>Delete Conversation</span>
                <hr className=" text-gray-300 mt-2" />
              </div>
            </div>
            <div className="space-y-1">
              <div
                onClick={() => {
                  viewUser(data.receiver.id);
                  openProfile(data.receiver.id);
                }}
                className="cursor-pointer"
              >
                <p className="font-bold">
                  {data.receiver.firstName} {data.receiver.lastName}
                </p>{" "}
                <p className="text-gray-500">Last seen Few hours ago </p>
                <div className="flex space-x-2 flex-wrap">
                  <div>{data.receiver.age} yrs</div>
                  <div className="text-[#d612cf]">●</div>
                  <div> {data.receiver.Info.height}</div>
                  <div className="text-[#d612cf]">●</div>
                  {/* <div>{data.receiver.Info.subCommunity}</div>
                  <div className="text-[#d612cf]">●</div> */}
                  <div>{data.receiver.Info.qualification}</div>
                  <div className="text-[#d612cf]">●</div>
                  <div>{data.receiver.Info.workAs}</div>
                  <div className="text-[#d612cf]">●</div>
                  <div>{data.receiver.Info.city}</div>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                {data.status === "accepted" && (
                  <div className="flex flex-col mt-14 space-y-2">
                    <p className="font-semibold">
                      {data.receiver.gender === "Male" ? "He" : "She"} accepted{" "}
                      your interest on {customDate(data.updated_at)}
                    </p>

                    <div className="flex">
                      <button
                        onClick={() => {
                          //
                        }}
                        className=" px-6 rounded-full text-white hover:bg-[#81007c] bg-[#9f139a] cursor-pointer flex gap-2 items-center"
                      >
                        <i className="ri-message-2-line text-xl mt-1 text-white"></i>
                        <span>Send Message</span>
                      </button>
                    </div>
                  </div>
                )}
                {data.status === "pending" && (
                  <div className="flex flex-col mt-15 space-y-1">
                    <p className="font-semibold">
                      You sent {data.receiver.gender === "Male" ? "him" : "her"}{" "}
                      interest on {customDate(data.created_at)}
                    </p>
                    <div className="flex">
                      <button
                        onClick={() => {
                          //
                        }}
                        className=" px-6 rounded-full text-white hover:bg-[#81007c] bg-[#9f139a] cursor-pointer flex gap-2 items-center"
                      >
                        <i className="ri-message-2-line text-xl mt-1 text-white"></i>
                        <span>Send Message</span>
                      </button>
                    </div>
                  </div>
                )}
                {data.status === "declined" && (
                  <div className="mt-13 flex flex-col gap-2">
                    <p className="font-semibold">
                      {data.receiver.gender === "Male" ? "He" : "She"} declined
                      your interest on {customDate(data.updated_at)}
                    </p>
                    <div className="flex gap-2">
                      <button className="border-1 px-3 text-gray-700 border-gray-300 rounded-full cursor-pointer flex gap-2 items-center">
                        <i className="ri-close-line text-2xl mt-1 text-gray-500"></i>
                        <span>Don't Show</span>
                      </button>
                      <button
                        onClick={() => {
                          sendInterest(data.id);
                        }}
                        className=" px-6 rounded-full text-white hover:bg-[#81007c] bg-[#9f139a] cursor-pointer flex gap-2 items-center"
                      >
                        <i className="ri-heart-line text-2xl mt-1 text-white"></i>
                        <span>Send interset</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              onClick={() => setOpenMenu((prev) => !prev)}
              className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
            >
              <i class="ri-more-2-fill font-bold"></i>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllSentInterests;

//
