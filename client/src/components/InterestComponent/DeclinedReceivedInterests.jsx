import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../lib/axios";
import { API_URLS } from "../../constants/apiUrls";
import chatConverstion from "../../assets/chat-converstion.png";
import { customDate } from "../Matches/customDate";
const DeclinedReceivedInterests = ({
  loggedInUserData,
  declinedReceivedInterests,
}) => {
  const navigateTo = useNavigate();
  //   const [allLikes, setAllLikes] = useState();
  const [allViews, setAllViews] = useState();
  const [openMenu, setOpenMenu] = useState(false);
  //   const [allInterests, setAllInterests] = useState();
  //   const sendInterest = async (id) => {
  //     try {
  //       const interestResponse = await axiosInstance.post(
  //         API_URLS.SEND_INTEREST,
  //         {
  //           sender_id: loggedInUserData.id,
  //           sender_id: id,
  //         }
  //       );
  //       console.log(interestResponse);

  //       fetchInterests(loggedInUserData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

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
      console.log(allViewResponse.data);

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
  //       const declinedReceivedInterests = allInterestResponse.data?.filter(
  //         (interest) => interest.status == "pending"
  //       );
  //       console.log(declinedReceivedInterests);

  //       setAllInterests(declinedReceivedInterests);
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
    if (declinedReceivedInterests) {
      // fetchLikes(loggedInUserData);
      fetchViews(loggedInUserData);
      //   fetchInterests(loggedInUserData);
    }
  }, [loggedInUserData]);
  console.log(loggedInUserData);

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
        {declinedReceivedInterests?.length > 0
          ? `Interests that were declined (${declinedReceivedInterests?.length})`
          : "No interests were declined"}
      </p>

      {declinedReceivedInterests?.length > 0 ? (
        <div>
          {" "}
          {declinedReceivedInterests?.map((data, index) => {
            return (
              <div
                key={index}
                className="mt-5 border-1 border-gray-300 rounded-lg p-4 relative flex w-full space-x-4 shadow shadow-gray-400"
              >
                <div className="relative w-60 h-55 overflow-hidden rounded-xl border-1 cursor-pointer ">
                  <img
                    onClick={() => {
                      openProfile(data.sender.id);
                      viewUser(data.sender.id);
                    }}
                    className="object-cover w-full"
                    src={data.sender.profilePic}
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
                      viewUser(data.sender.id);
                      openProfile(data.sender.id);
                    }}
                    className="cursor-pointer"
                  >
                    <p className="font-bold">
                      {data.sender.firstName} {data.sender.lastName}
                    </p>{" "}
                    <p className="text-gray-500">Last seen Few hours ago </p>
                    <div className="flex space-x-2 flex-wrap">
                      <div>{data.sender.age} yrs</div>
                      <div className="text-[#d612cf]">●</div>
                      <div> {data.sender.Info.height}</div>
                      <div className="text-[#d612cf]">●</div>
                      {/* <div>{data.sender.Info.subCommunity}</div>
                  <div className="text-[#d612cf]">●</div> */}
                      <div>{data.sender.Info.qualification}</div>
                      <div className="text-[#d612cf]">●</div>
                      <div>{data.sender.Info.workAs}</div>
                      <div className="text-[#d612cf]">●</div>
                      <div>{data.sender.Info.city}</div>
                    </div>
                  </div>

                  <div className="mt-15 flex flex-col gap-2">
                    <p className="font-semibold">
                      You declined{" "}
                      {data.receiver.gender === "Male" ? "him" : "her"} interest
                      on {customDate(data.updated_at)}
                    </p>
                    <button className=" px-6 w-50 rounded-full text-[#a80ca3] hover:bg-[#ffd0fd] border border-[#9f139a] cursor-pointer flex gap-2 items-center">
                      <i className="ri-thumb-up-fill text-xl  "></i>
                      <span>Accept Interset</span>
                    </button>
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
      ) : (
        <div className="pt-20 space-y-3 w-full flex items-center justify-center flex-col">
          <img src={chatConverstion} alt="" className="w-30" />
          <p className="font-bold">You have no declined interests yet</p>
          <div className="flex justify-center">
            {/* <Link to={"/matches/all-matches"}>
              {" "}
              <button className="cursor-pointer font-semibold px-5 py-1  border bg-purple-200 border-purple-500 text-purple-700 hover:bg-purple-300 rounded-full">
                View All{" "}
                <i class="text-lg font-semibold ri-arrow-right-s-line"></i>
              </button>
            </Link> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeclinedReceivedInterests;

//
