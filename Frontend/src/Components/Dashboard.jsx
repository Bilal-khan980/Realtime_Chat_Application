import React from "react";
import { Phone, Video } from "lucide-react"; // Call + Video icons
import profileimage from "../assets/pfp.jpg";

function Dashboard() {
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

  const randomUser = contacts[Math.floor(Math.random() * contacts.length)];

  return (
    <div className="w-screen flex">
      {/* LEFT SIDEBAR */}
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
      <div className="w-[50%] h-screen flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-slate-800 shadow text-black">
          <div className="flex items-center gap-3 text-black">
            <img
              src={randomUser.img}
              alt={randomUser.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <h2 className="text-lg font-semibold text-black-800">
              {randomUser.name}
            </h2>
          </div>
          <div className="flex gap-3">
            <button className="p-2 rounded-full hover:bg-gray-200">
              <Phone className="w-6 h-6 text-gray-700" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-200">
              <Video className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto bg-slate-600 p-4">
          <div className="text-gray-500 mt-10">
            <div className="max-w-[40%] bg-slate-400 p-3 m-2 rounded-xl">
              Halojfnenfaevnlvnvds afjneafenfnsdfvndsnvlk
            </div>
            <div className="max-w-[40%] bg-slate-800 p-3 ml-auto m-2 rounded-xl">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Perferendis provident molestiae qui facilis, commodi nesciunt
              expedita ab aspernatur tenetur necessitatibus vitae, fuga dolor
              sapiente dicta eos saepe aperiam perspiciatis. Sed.
            </div>

            <div className="max-w-[40%] bg-slate-400 p-3 m-2 rounded-xl">
              Halojfnenfaevnlvnvds afjneafenfnsdfvndsnvlk
            </div>
            <div className="max-w-[40%] bg-slate-800 p-3 ml-auto m-2 rounded-xl">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Perferendis provident molestiae qui facilis, commodi nesciunt
              expedita ab aspernatur tenetur necessitatibus vitae, fuga dolor
              sapiente dicta eos saepe aperiam perspiciatis. Sed.
            </div>

            <div className="max-w-[40%] bg-slate-400 p-3 m-2 rounded-xl">
              Halojfnenfaevnlvnvds afjneafenfnsdfvndsnvlk
            </div>
            <div className="max-w-[40%] bg-slate-800 p-3 ml-auto m-2 rounded-xl">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Perferendis provident molestiae qui facilis, commodi nesciunt
              expedita ab aspernatur tenetur necessitatibus vitae, fuga dolor
              sapiente dicta eos saepe aperiam perspiciatis. Sed.
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-3 border-t border-gray-300 bg-white flex items-center bg-slate-600">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 outline-none focus:ring focus:ring-blue-300 bg-slate-400 text-black"
          />
          <button className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
            Send
          </button>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-[25%] h-screen"></div>
    </div>
  );
}

export default Dashboard;
