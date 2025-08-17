import React from "react";
import profileimage from "../assets/pfp.jpg";

function Dashboard() {
  // Dummy contacts (you can later fetch from API or DB)
  const contacts = [
    {
      id: 1,
      name: "Alice Johnson",
      message: "Hey, how are you?",
      img: "https://i.pravatar.cc/50?img=1",
    },
    {
      id: 2,
      name: "David Smith",
      message: "Are we meeting tomorrow?",
      img: "https://i.pravatar.cc/50?img=2",
    },
    {
      id: 3,
      name: "Sophia Lee",
      message: "Got it, thanks!",
      img: "https://i.pravatar.cc/50?img=3",
    },
    {
      id: 4,
      name: "Michael Brown",
      message: "See you at 8pm.",
      img: "https://i.pravatar.cc/50?img=4",
    },
    {
      id: 5,
      name: "Emma Davis",
      message: "Typing...",
      img: "https://i.pravatar.cc/50?img=5",
    },
  ];

  return (
    <div className="w-screen flex">
      <div className="w-[20%] h-screen border-r border-gray-300 flex flex-col pt-5">
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
              Bilal Khan
            </h2>
            <p className="text-sm text-gray-500">My Account</p>
          </div>
        </div>

        <h3 className="text-lg font-bold p-3 text-gray-700">Chats</h3>

        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center p-3 hover:bg-slate-700 cursor-pointer rounded-2xl m-1"
            >
              <img
                src={contact.img}
                alt={contact.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-3">
                <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                <p className="text-sm text-gray-600 truncate w-[150px]">
                  {contact.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CENTER CHAT SECTION */}
      <div className="w-[50%] h-screen bg-slate-700"></div>

      {/* RIGHT SIDEBAR (optional for now) */}
      <div className="w-[25%] h-screen"></div>
    </div>
  );
}

export default Dashboard;
