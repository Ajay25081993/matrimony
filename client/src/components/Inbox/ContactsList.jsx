import React, { useEffect } from "react";
import gdp from "../../assets/AiGirl.png";
import noDp from "../../assets/NoDp.png";
const ContactsList = ({
  setOpenChat,
  openChat,
  setSelectedContact,
  selectedContact,
  allContacts,
  getAllMessages,
  messages,
  unseenMessages,
  setUnseenMessages,
  onlineUsers,
}) => {
  useEffect(() => {
    getAllMessages();
  }, []);
  return (
    <div
      className={`${
        openChat ? "w-70" : "w-1/2"
      } transition-all duration-300 rounded-l-lg  border-r-2 border-purple-700 h-190 bg-purple-400 space-y-1`}
    >
      <div className="rounded-tl-lg p-5 h-17 shadow-sm shadow-gray-800 ">
        <h2 className="text-white font-bold text-xl">
          <span className="text-purple-100 text-xl">
            <i class="ri-message-2-line "></i>
          </span>{" "}
          SoulTalk
        </h2>
      </div>
      {allContacts.map((contact, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              setSelectedContact(contact);
              setOpenChat(true);
              getAllMessages(contact.connectedUser.id);
            }}
            className="px-3 text-white py-2 flex gap-4 items-center mx-1 cursor-pointer hover:bg-purple-300 hover:rounded-md"
          >
            <div>
              <div className="w-13 h-13 rounded-full overflow-hidden relative border-2 border-purple-300">
                <img
                  src={contact.connectedUser.profilePic}
                  alt=""
                  className="w-full object-cover"
                />
              </div>
            </div>
            <div className="flex justify-between w-full h-14">
              <div>
                <p className="font-bold">
                  {contact.connectedUser.firstName}{" "}
                  {contact.connectedUser.lastName}
                </p>
                {/* <p>{messages[messages.length - 1]?.message}</p> */}
              </div>
              <p>23:51</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactsList;
