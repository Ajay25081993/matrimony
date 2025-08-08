import React from "react";
import Header from "../../components/Header/Header4";
import Interests from "../../components/InterestComponent/Interests";
import AllReceivedInterests from "../../components/InterestComponent/AllReceivedInterests";
import Sidebar from "../../components/InterestComponent/Sidebar";
import { useState } from "react";
import axiosInstance from "../../lib/axios";
import { API_URLS } from "../../constants/apiUrls";
import { useEffect } from "react";
import AcceptedReceivedInterests from "../../components/InterestComponent/AcceptedReceivedInterests";
import PendingReceivedInterests from "../../components/InterestComponent/PendingReceivedInterests";
import DeclinedReceivedInterests from "../../components/InterestComponent/DeclinedReceivedInterests";
import AllSentInterests from "../../components/InterestComponent/AllSentInterests";
import PendingSentInterests from "../../components/InterestComponent/PendingSentInterests";
import DeclinedSentInterests from "../../components/InterestComponent/DeclinedSentInterests";
import AcceptedSentInterests from "../../components/InterestComponent/AcceptedSentInterests";

const Interest = ({ steps }) => {
  const user_id = localStorage.getItem("userId");
  const [userData, setUserData] = useState({});
  const [allInterests, setAllInterests] = useState();
  const allStep = [
    { component: AllReceivedInterests, path: "/received/all-interests" },
    {
      component: PendingReceivedInterests,
      path: "/received/pending-interests",
    },
    {
      component: AcceptedReceivedInterests,
      path: "/received/accepted-interests",
    },
    {
      component: DeclinedReceivedInterests,
      path: "/received/declined-interests",
    },
    { component: AllSentInterests, path: "/sent/all-interests" },
    {
      component: PendingSentInterests,
      path: "/sent/pending-interests",
    },
    { component: AcceptedSentInterests, path: "/sent/accepted-interests" },
    {
      component: DeclinedSentInterests,
      path: "/sent/declined-interests",
    },
  ];
  const fetchData = async (user_id) => {
    try {
      const dataResponse = await axiosInstance.get(
        `${API_URLS.GET_USER_BY_ID}/${user_id}`
      );
      setUserData(dataResponse.data[0]);
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    }
  };
  const fetchInterests = async () => {
    try {
      const allInterestResponse = await axiosInstance.get(
        `${API_URLS.GET_ALL_INTERESTS}`
      );
      console.log(allInterestResponse.data);

      setAllInterests(allInterestResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  const senderId = user_id;

  const sentInterests = allInterests?.filter(
    (interest) => interest.sender_id == senderId
  );
  const receivedInterests = allInterests?.filter(
    (interest) => interest.receiver_id == senderId
  );

  const pendingReceivedInterests = receivedInterests?.filter(
    (interest) => interest.status == "pending"
  );
  const pendingSentInterests = sentInterests?.filter(
    (interest) => interest.status == "pending"
  );
  const acceptedReceivedInterests = receivedInterests?.filter(
    (interest) => interest.status == "accepted"
  ); 
  const acceptedSentInterests = sentInterests?.filter(
    (interest) => interest.status == "accepted"
  ); 
  const declinedSentInterests = sentInterests?.filter(
    (interest) => interest.status == "declined"
  );

  const declinedReceivedInterests = receivedInterests?.filter(
    (interest) => interest.status == "declined"
  );

  useEffect(() => {
    fetchData(user_id);
    fetchInterests();
  }, []);

  const CurrentComponent = allStep.find(
    (stepObj) => stepObj.path === steps
  )?.component;
  console.log(CurrentComponent);

  return (
    <div>
      <Header />
      <div className="flex justify-center gap-5 py-30">
        <Sidebar
          receivedCounts={{
            "/interests/received/all-interests": receivedInterests?.length,
            "/interests/received/pending-interests":
              pendingReceivedInterests?.length,
            "/interests/received/accepted-interests":
              acceptedReceivedInterests?.length,
            "/interests/received/declined-interests":
              declinedReceivedInterests?.length,
          }}
          sentCounts={{
            "/interests/sent/all-interests": sentInterests?.length,
            "/interests/sent/pending-interests": pendingSentInterests?.length,
            "/interests/sent/accepted-interests": acceptedSentInterests?.length,
            "/interests/sent/declined-interests": declinedSentInterests?.length,
          }}
        />
        {CurrentComponent && (
          <CurrentComponent
            fetchInterests={fetchInterests}
            loggedInUserData={userData}
            sentInterests={sentInterests}
            receivedInterests={receivedInterests}
            pendingSentInterests={pendingSentInterests}
            pendingReceivedInterests={pendingReceivedInterests}
            acceptedReceivedInterests={acceptedReceivedInterests}
            acceptedSentInterests={acceptedSentInterests}
            declinedReceivedInterests={declinedReceivedInterests}
            declinedSentInterests={declinedSentInterests}
          />
        )}
      </div>
    </div>
  );
};

export default Interest;
