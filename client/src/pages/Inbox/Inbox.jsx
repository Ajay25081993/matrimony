import React, { useEffect, useState } from "react";
import ContactsList from "../../components/Inbox/ContactsList";
import Messages from "../../components/Inbox/Messages";
import Header from "../../components/Header/Header4";
import Welcome from "../../components/Inbox/Welcome";
import axiosInstance from "../../lib/axios";
import { API_URLS } from "../../constants/apiUrls";
import { io } from "socket.io-client";
const Inbox = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const user_id = localStorage.getItem("userId");
  const [userData, setUserData] = useState({});
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [openChat, setOpenChat] = useState(false);
  const fetchData = async (user_id) => {
    try {
      const dataResponse = await axiosInstance.get(
        `${API_URLS.GET_USER_BY_ID}/${user_id}`
      );
      setUserData(dataResponse.data[0]);
      connectSocket(dataResponse.data[0]);
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    }
  };

  const getAllContacts = async () => {
    try {
      const contactResponse = await axiosInstance.get(
        `${API_URLS.GET_ALL_CONTACTS}`
      );
      console.log(contactResponse.data.users[0]);
      
      // setAllContacts(contactResponse.data.users);
      setAllContacts(contactResponse.data.users);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllMessages = async (selectedUserId) => {
    try {
      const contactResponse = await axiosInstance.get(
        `${API_URLS.GET_ALL_MESSAGES}/${selectedUserId}`
      );
      console.log(contactResponse.data);

      setMessages(contactResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (receiver_id, message, time) => {
    try {
      const newMsg = await axiosInstance.post(
        `${API_URLS.SEND_MESSAGE}/${receiver_id}`,
        {
          message: message,
          time: time,
        }
      );
      setMessages((prev) => [...prev, newMsg.data]);
    } catch (error) {
      console.log(error);
    }
  };
  const connectSocket = (loggedInUserData) => {
    if (!loggedInUserData || socket?.connected) {
      return;
    }
    const newSocket = io(backendUrl, {
      query: {
        userId: loggedInUserData.id,
      },
    });
    newSocket.connect();
    setSocket(newSocket);
    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });
  };

  const subscribeToMessage = async () => {
    if (!socket) return;
    socket.on("newMessage", (newMessage) => {
      if (selectedContact && selectedContact.id === newMessage.sender_id) {
        newMessage.seen = true;
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // Mark it seen
        axiosInstance.put(
          `${API_URLS.UPDATE_MESSAGE}/${newMessage.id}`,
          newMessage
        );
      } else {
        setUnseenMessages((prevUnseenMessages) => ({
          ...prevUnseenMessages,
          [newMessage.senderId]: prevUnseenMessages[newMessage.sender_id]
            ? prevUnseenMessages[newMessage.sender_id] + 1
            : 1,
        }));
      }
    });
  };

  const unsubscribeFromMessage = () => {
    if (socket) socket.off("newMessage");
  };

  useEffect(() => {
    fetchData(user_id);
    getAllContacts();
  }, []);
  useEffect(() => {
    subscribeToMessage();
    return () => {
      unsubscribeFromMessage();
    };
  }, [socket, selectedContact]);

  return (
    <div>
      <Header />
      <div className="flex w-full px-10 mt-25">
        <div className="flex w-full border-2 shadow-md shadow-gray-800 border-purple-700 rounded-xl">
          <ContactsList
            setOpenChat={setOpenChat}
            openChat={openChat}
            allContacts={allContacts}
            setAllContacts={setAllContacts}
            selectedContact={selectedContact}
            setSelectedContact={setSelectedContact}
            messages={messages}
            getAllMessages={getAllMessages}
            setMessages={setMessages}
            unseenMessages={unseenMessages}
            setUnseenMessages={setUnseenMessages}
            onlineUsers={onlineUsers}
          />
          {openChat ? (
            <Messages
              getAllMessages={getAllMessages}
              setOpenChat={setOpenChat}
              openChat={openChat}
              allContacts={allContacts}
              setAllContacts={setAllContacts}
              selectedContact={selectedContact}
              setSelectedContact={setSelectedContact}
              messages={messages}
              setMessages={setMessages}
              unseenMessages={unseenMessages}
              setUnseenMessages={setUnseenMessages}
              onlineUsers={onlineUsers}
              sendMessage={sendMessage}
              userData={userData}
            />
          ) : (
            <Welcome />
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
