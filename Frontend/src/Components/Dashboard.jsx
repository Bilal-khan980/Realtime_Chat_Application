import React, { useState, useEffect } from "react";
import { Phone, Video } from "lucide-react"; // Call + Video icons
import profileimage from "../assets/pfp.jpg";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  // Fetch user + chats
  useEffect(() => {
    const fetchUserAndChats = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        // 1) Get logged-in user
        const resUser = await fetch("http://localhost:8000/userinfo", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (resUser.status === 200) {
          const data = await resUser.json();
          setUser(data.user);
          const userId = data.user._id;

          // 2) Get chats
          const resChats = await fetch(`http://localhost:8000/chats/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (resChats.status === 200) {
            const chatsData = await resChats.json();
            setChats(chatsData);
          }
        }
      } catch (error) {
        console.error("⚠️ Error fetching data:", error);
      }

      try {
        const fetchallusers = await fetch(`http://localhost:8000/allusers/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (fetchallusers.status === 200) {
          const usersData = await fetchallusers.json();
          setAllUsers(usersData);
        }
      } catch (error) {
        console.error("⚠️ Error fetching all users:", error);
      }
    };

    fetchUserAndChats();
  }, []);

  // Fetch messages when chat is selected
  useEffect(() => {
    if (!selectedChat) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/getmessages/${selectedChat.chatId}`, 
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }

        );

        if (res.status === 200) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("⚠️ Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedChat]);

  // Send message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    try {
      const res = await fetch("http://localhost:8000/sendmessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          chatId: selectedChat.chatId,
          senderId: user._id,
          message: newMessage,
        }),
      });

      if (res.status === 201) {
        const msg = await res.json();
        setMessages((prev) => [
          ...prev,
          { user: { _id: user._id, fullname: user.fullname }, message: msg.message },
        ]);
        setNewMessage("");
      }
    } catch (error) {
      console.error("⚠️ Error sending message:", error);
    }
  };

  return (
    <div className="w-screen flex">
      {/* LEFT SIDEBAR */}
      <div className="w-[30%] h-screen border-r border-gray-300 flex flex-col pt-5">
        <div className="flex items-center p-3 border-b border-gray-400">
          <div className="border border-slate-900 rounded-full">
            <img
              src={profileimage}
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
          </div>
          <div className="ml-4">
            <h2 className="text-neutral-950 text-xl font-semibold">
              {user?.fullname || "Loading..."}
            </h2>
            <p className="text-sm text-gray-500">
              {user?.email || "My Account"}
            </p>
          </div>
        </div>

        <h3 className="text-lg font-bold p-3 text-gray-700">Chats</h3>

        <div className="">
          {chats.map((chat) => (
            <div
              key={chat.chatId}
              className={`flex items-center p-3 cursor-pointer rounded-2xl m-1 ${
                selectedChat?.chatId === chat.chatId
                  ? "bg-slate-400"
                  : "hover:bg-slate-200"
              }`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="ml-3">
                <h4 className="font-semibold text-gray-900">
                  {chat.user?.fullname}
                </h4>
                <p className="text-sm text-gray-600 w-[150px]">
                  {chat.user?.email}
                </p>
              </div>
            </div>
          ))}
        
        
        </div>

        <div className="pt-3 m-3">People
          {
            allUsers.length === 0 ? (
              <p className="text-gray-500">No users available</p>
            ) : (
              allUsers.map((user) => (
                <div key={user._id} className="flex items-center p-2 border-b border-gray-300">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{user.fullname}</h4>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-full">
                    Message
                  </button>
                </div>
              ))
            )}

        </div>

      </div>

      {/* CENTER CHAT SECTION */}
      <div className="w-[70%] h-screen flex flex-col bg-slate-800">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-slate-800 shadow">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-white">
                  {selectedChat.user?.fullname}
                </h2>
              </div>
              <div className="flex gap-3">
                <button className="p-2 rounded-full hover:bg-gray-200">
                  <Phone className="w-6 h-6 text-white" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-200">
                  <Video className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto bg-slate-600 p-4">
              {messages.length === 0 && (
                <p className="text-black-900 flex flex-col items-center justify-center">No messages yet</p>
              )}
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-[40%] p-3 m-2 rounded-xl ${
                    msg.user._id === user?._id
                      ? "bg-slate-800 ml-auto text-white"
                      : "bg-slate-400 text-black"
                  }`}
                >
                  <p>{msg.message}</p>
                  <small className="text-xs opacity-70">{msg.user.fullname}</small>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-gray-300 bg-slate-600 flex items-center">
              <input
                type="text"
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 outline-none focus:ring focus:ring-blue-300 bg-slate-400 text-black"
              />
              <button
                onClick={handleSendMessage}
                className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>

    </div>
  );
}

export default Dashboard;
