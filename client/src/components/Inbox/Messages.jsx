import React, { useEffect, useRef, useState } from "react";
import gdp from "../../assets/AiGirl.png";
import noDp from "../../assets/NoDp.png";
import { msgData } from "./msgData";
const Messages = ({
  sendMessage,
  setOpenChat,
  getAllMessages,
  openChat,
  setSelectedContact,
  selectedContact,
  allContacts,
  unseenMessages,
  setUnseenMessages,
  onlineUsers,
  messages,
  setMessages,
  userData,
}) => {
  const [openDetails, setOpenDetails] = useState(false);
  const [openOverview, setOpenOverview] = useState(true);
  const [message, setMessage] = useState("");
  const [openMedia, setOpenMedia] = useState(false);
  const scrollEnd = useRef();
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    msg: null,
  });
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // ✅ ensures 24-hour format
  });

  const handleRightClick = (e, msg) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      msg,
    });
  };
  const closeContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, msg: null });
  };
  const handleCloseChat = () => {
    setOpenChat(false);
    closeContextMenu();
  };

  const handleSelectMessage = () => {
    alert(`Selected message: "${contextMenu.msg.text}"`);
    closeContextMenu();
  };

  // Scroll to the last message
  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);
  console.log(messages);
  console.log(selectedContact);
  
  return (
    <div className="relative w-7xl bg-gray-200 rounded-r-lg h-190">
      {/* Chat Header */}
      <div
        onClick={() => {
          setOpenDetails((prev) => !prev);
          setOpenMedia(false);
          setOpenOverview(true);
        }}
        className="w-full shadow-sm shadow-gray-800 transition-all duration-500 hover:bg-[#ab6bd9] bg-purple-400 rounded-tr-lg flex items-center px-4 py-2 gap-4 cursor-pointer"
      >
        <div>
          <div className="border-2 border-purple-300 w-13 h-13 rounded-full overflow-hidden relative ">
            <img
              src={selectedContact.connectedUser?.profilePic}
              alt=""
              className="w-full object-cover"
            />
          </div>
        </div>
        <p className="font-bold text-white">
          {selectedContact.connectedUser?.firstName} {selectedContact.connectedUser?.lastName}
        </p>
      </div>
      {/* Chat Section */}
      <div
        onClick={closeContextMenu}
        onContextMenu={(e) => handleRightClick(e, "msg")}
        className="px-20 flex flex-col relative h-160 pt-4 text-white overflow-y-scroll"
      >
        {messages?.map((msg, index) => {
          return (
            <div
              key={index}
              className={` flex items-end gap-2 justify-end ${
                msg.sender_id !== userData?.id && "flex-row-reverse"
              }`}
            >
              <p
                className={`p-2 max-w-50 md:text-sm font-light
                    rounded-lg mb-8 break-all bg-violet-500/30 text-white ${
                      msg.sender_id === userData?.id ||
                      msg.sender_id === selectedContact.id
                        ? "rounded-br-none"
                        : "rounded-bl-none"
                    }`}
              >
                {msg.message}
              </p>

              <div className="text-center text-xs">
                <div
                  className={`${
                    msg.connectedUser?.profilePic ? "border-1 border-purple-300" : ""
                  } w-8 h-8 rounded-full overflow-hidden relative`}
                >
                  <img
                    src={msg.connectedUser?.profilePic ? msg.connectedUser?.profilePic : noDp}
                    alt=""
                    className="object-cover  w-full"
                  />
                </div>

                <p className="text-gray-500">{msg.time}</p>
              </div>
            </div>
          );
        })}
        {contextMenu.visible && (
          <div
            className="absolute bg-white text-gray-800 rounded shadow-lg z-50 p-2 w-40"
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <p
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleSelectMessage}
            >
              📌 Select Message
            </p>
            <p
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleCloseChat}
            >
              ❌ Close Chat
            </p>
          </div>
        )}
        <div ref={scrollEnd}></div>
      </div>
      {/*Account Pop Up */}
      {openDetails && (
        <div className="bg-purple-300 border-1 border-purple-700 w-119 h-68 absolute top-0 flex ml-1 mt-1 rounded-md">
          <i
            onClick={() => setOpenDetails(false)}
            class="bg-violet-300 rounded-tr-md rounded-bl-sm absolute ri-close-line right-0 text-xl text-indigo-600 cursor-pointer"
          ></i>
          <div className="border-r-1 rounded-l-md bg-purple-200 space-y-1 border-purple-700 pt-0.5 px-1 text-white ">
            <div
              onClick={() => {
                setOpenOverview(true);
                setOpenMedia(false);
              }}
              className={` flex gap-4 cursor-pointer ${
                openOverview && "bg-purple-500 "
              } hover:bg-purple-400  rounded-md`}
            >
              <div className="flex items-center gap-1">
                <div
                  className={`${
                    openOverview && "bg-violet-700"
                  } h-1/2 w-1 rounded-md`}
                ></div>
                <span className="text-lg">
                  <i class="ri-information-line"></i>
                </span>
              </div>

              <p className="mt-0.5 mr-2">Overview</p>
            </div>

            <div
              onClick={() => {
                setOpenMedia(true);
                setOpenOverview(false);
              }}
              className={`flex gap-4 cursor-pointer ${
                openMedia && "bg-purple-500 "
              }  hover:bg-purple-400 rounded-md`}
            >
              <div className="flex items-center gap-1">
                <div
                  className={`${
                    openMedia && "bg-violet-700"
                  } h-1/2 w-1 rounded-md`}
                ></div>

                <span className="text-lg">
                  <i class="ri-multi-image-fill"></i>
                </span>
              </div>
              <p className="mt-0.5 mr-2">Media</p>
            </div>
          </div>

          {openOverview && (
            <div className="bg-purple-300 rounded-md flex flex-col items-center w-full py-6 px-3 text-white gap-2">
              <div className="w-30 h-30 overflow-hidden relative rounded-full border border-violet-700 cursor-pointer">
                <img
                  onClick={() => window.open(selectedContact.profilePic)}
                  src={selectedContact.profilePic}
                  alt=""
                  className="w-full object-cover"
                />
              </div>
              <p className="text-xl font-semibold ">
                {selectedContact.firstName} {selectedContact.lastName}
              </p>
              <div className="border-t border-purple-700 w-full py-2 flex justify-between">
                <button className="bg-purple-500 cursor-pointer hover:bg-purple-400 px-8 py-0.5 rounded-md">
                  Block
                </button>
                <button className="bg-purple-500 cursor-pointer  hover:bg-purple-400 px-8  py-0.5 rounded-md">
                  Report
                </button>
              </div>
            </div>
          )}
          {openMedia && (
            <div className="text-white">
              <h2 className="text-xl font-semibold px-3 py-2 rounded-t-md shadow-md">
                Media
              </h2>
              <div className="flex flex-wrap gap-3 w-full h-57 overflow-y-auto scroll-smooth p-3">
                <div className="w-25 h-25 overflow-hidden relative shadow-md shadow-gray-500 rounded-xl">
                  <img
                    onClick={() => window.open(gdp)}
                    src={gdp}
                    alt=""
                    className="w-full object-cover"
                  />
                </div>
                <div className="w-25 h-25 overflow-hidden relative shadow-md shadow-gray-500 rounded-xl">
                  <img src={gdp} alt="" className="w-full object-cover" />
                </div>
                <div className="w-25 h-25 overflow-hidden relative shadow-md shadow-gray-500 rounded-xl">
                  <img src={gdp} alt="" className="w-full object-cover" />
                </div>
                <div className="w-25 h-25 overflow-hidden relative shadow-md shadow-gray-500 rounded-xl">
                  <img src={gdp} alt="" className="w-full object-cover" />
                </div>
                <div className="w-25 h-25 overflow-hidden relative shadow-md shadow-gray-500 rounded-xl">
                  <img src={gdp} alt="" className="w-full object-cover" />
                </div>
                <div className="w-25 h-25 overflow-hidden relative shadow-md shadow-gray-500 rounded-xl">
                  <img src={gdp} alt="" className="w-full object-cover" />
                </div>
                <div className="w-25 h-25 overflow-hidden relative shadow-md shadow-gray-500 rounded-xl">
                  <img src={gdp} alt="" className="w-full object-cover" />
                </div>
                <div className="w-25 h-25 overflow-hidden relative shadow-md shadow-gray-500 rounded-xl">
                  <img src={gdp} alt="" className="w-full object-cover" />
                </div>
                <div className="w-25 h-25 overflow-hidden relative shadow-md shadow-gray-500 rounded-xl">
                  <img src={gdp} alt="" className="w-full object-cover" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="absolute -bottom-0 bg-violet-300 rounded-br-md  w-full py-6  h-10 flex items-center gap-2 ">
        <input type="file" id="image" accept="image/png image/jpeg" hidden />
        <label htmlFor="image">
          <i class="ri-image-ai-fill text-xl ml-2 text-purple-700 cursor-pointer"></i>
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && message.trim()) {
              sendMessage(selectedContact.id, message, currentTime);
              setMessage
            }
          }}
          name=""
          id=""
          className="resize-none w-full h-12 p-2 outline-0 text-white placeholder:text-gray-700 "
          placeholder="Type a message"
        ></textarea>
        <i
          onClick={() => {sendMessage(selectedContact.id, message, currentTime); setMessage("")}}
          class="ri-send-plane-fill text-xl text-purple-700 mr-4 cursor-pointer rotate-40"
        ></i>
      </div>
    </div>
  );
};

export default Messages;
