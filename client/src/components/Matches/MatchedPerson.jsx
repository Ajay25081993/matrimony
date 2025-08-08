import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../lib/axios";
import { API_URLS } from "../../constants/apiUrls";

const MatchedPerson = ({ otherUserData, loggedInUserData }) => {
  const navigateTo = useNavigate();
  const [allLikes, setAllLikes] = useState();
  const [allViews, setAllViews] = useState();
  const [allInterests, setAllInterests] = useState();
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

      fetchInterests(loggedInUserData);
    } catch (error) {
      console.log(error);
    }
  };

  const likeThisProfile = async (userData) => {
    try {
      await axiosInstance.post(API_URLS.LIKE_USER, {
        liker_id: loggedInUserData.id,
        liked_id: userData.id,
      });
      fetchLikes(loggedInUserData);
    } catch (error) {
      console.log(error);
    }
  };
  const dislikeUser = async (userData) => {
    try {
      await axiosInstance.delete(`${API_URLS.REMOVE_LIKE}/${userData.id}`);

      fetchLikes(loggedInUserData);
    } catch (error) {
      console.log(error);
    }
  };
  const openProfile = (id) => {
    navigateTo(`/matches/all-matches/${id}`);
  };
  const fetchViews = async (user) => {
    try {
      const allViewResponse = await axiosInstance.get(
        `${API_URLS.ALL_VISITED_USER}/${user.id}`
      );
      console.log(allViewResponse.data);

      setAllViews(allViewResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchInterests = async (user) => {
    try {
      const allInterestResponse = await axiosInstance.get(
        `${API_URLS.GET_INTERESTS}/${user.id}`
      );
      console.log(allInterestResponse.data);

      setAllInterests(allInterestResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
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

  const fetchLikes = async (user) => {
    try {
      const response = await axiosInstance.get(
        `${API_URLS.GET_LIKED_USER}/${user.id}`
      );
      setAllLikes(response.data);
    } catch (err) {
      console.error("Failed to fetch likes:", err);
    }
  };

  useEffect(() => {
    if (loggedInUserData.id) {
      fetchLikes(loggedInUserData);
      fetchViews(loggedInUserData);
      fetchInterests(loggedInUserData);
    }
  }, [loggedInUserData]);
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
      <p className="mb-2 text-2xl font-semibold">
        {otherUserData.length} {otherUserData.length > 1 ? "Matches" : "Match"}{" "}
        based on your{" "}
        <Link
          to="/partner-preferences"
          className="text-orange-400 underline"
          href=""
        >
          Preferences
        </Link>{" "}
      </p>

      {otherUserData.map((data, index) => {
        return (
          <div
            key={index}
            className="mt-5 border-1 border-gray-300 rounded-lg p-4 flex w-full gap-6"
          >
            <div className="relative w-60 h-55 overflow-hidden rounded-xl border-1 cursor-pointer ">
              <img
                onClick={() => {
                  openProfile(data.id);
                  viewUser(data.id);
                }}
                className="object-cover w-full"
                src={data.profilePic}
                alt=""
              />
              <div className="absolute right-0   rounded-tr-xl rounded-l-xs top-0 bg-[#000000] text-sm font-semibold text-white">
                {allLikes?.some((like) => like.liked_id === data.id) ? (
                  <div
                    onClick={() => dislikeUser(data)}
                    className="bg-black w-full px-1 space-x-1 text-[#c419be]"
                  >
                    <i class="ri-heart-add-fill font-light"></i>{" "}
                    <span className="">Liked</span>
                  </div>
                ) : (
                  ""
                )}
                {allLikes?.length === 0 ||
                !allLikes?.some((like) => like.liked_id === data.id) ? (
                  <div
                    onClick={() => likeThisProfile(data)}
                    className="bg-black w-full px-1 space-x-1"
                  >
                    <i class="ri-heart-add-line font-light"></i>
                    <span>Like</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="space-y-1">
              <div
                onClick={() => {
                  viewUser(data.id);
                  openProfile(data.id);
                }}
                className="cursor-pointer"
              >
                <p className="font-bold">
                  {data.firstName} {data.lastName}
                </p>{" "}
                <p className="text-gray-500">Last seen Few hours ago </p>
                <div className="flex space-x-2 flex-wrap">
                  <div>{data.age} yrs</div>
                  <div className="text-[#d612cf]">●</div>
                  <div> {data.Info.height}</div>
                  <div className="text-[#d612cf]">●</div>
                  <div>{data.Info.subCommunity}</div>
                  <div className="text-[#d612cf]">●</div>
                  <div>{data.Info.qualification}</div>
                  <div className="text-[#d612cf]">●</div>
                  <div>{data.Info.workAs}</div>
                  <div className="text-[#d612cf]">●</div>
                  <div>{data.Info.city}</div>
                </div>
              </div>

              {allInterests?.some(
                (interset) => interset.receiver_id === data.id
              ) ? (
                <div className="mt-20 flex justify-center">
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
              ) : (
                <div className="mt-20 flex gap-2">
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
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MatchedPerson;
