import React from "react";
import { ArrowLeftFromLine, SendHorizonal, Star, Stars } from "lucide-react";
import { useFriendsContext } from "@/app/(context)/FriendsProvider";
import ChatBubble from "@/app/(components)/ChatBubble";

type props = {
  name: string;
};

const messages = [
  { sender: "zubair.m7", message: "Yo bro" },
  { sender: "zubair.m7", message: "Have you done the fm hw?" },
  { sender: "davidu22x", message: "Yh man ofc" },
  { sender: "zubair.m7", message: "Can u send it rq man" },
  { sender: "davidu22x", message: "Nah man u gta do it urself g" },
  { sender: "davidu22x", message: "Plus last time she clocked us" },
  { sender: "zubair.m7", message: "This time I won't make it bait I promise" },
  { sender: "davidu22x", message: "😮‍💨 fine then" },
  { sender: "zubair.m7", message: "Tyty" },
  {
    sender: "zubair.m7",
    message: "Trust me this time I'll make sure we don't get clocked",
  },
  { sender: "zubair.m7", message: "Yo bro" },
  { sender: "zubair.m7", message: "Have you done the fm hw?" },
  { sender: "davidu22x", message: "Yh man ofc" },
  { sender: "zubair.m7", message: "Can u send it rq man" },
  { sender: "davidu22x", message: "Nah man u gta do it urself g" },
  { sender: "davidu22x", message: "Plus last time she clocked us" },
  { sender: "zubair.m7", message: "This time I won't make it bait I promise" },
  { sender: "davidu22x", message: "😮‍💨 fine then" },
  { sender: "zubair.m7", message: "Tyty" },
  {
    sender: "zubair.m7",
    message: "Trust me this time I'll make sure we don't get clocked",
  },
];

const ChatArea = ({ name }: props) => {
  const { selectedFriend, setSelectedFriend } = useFriendsContext();

  const handleReturn = () => {
    setSelectedFriend("");
  };

  return (
    <div
      className={"flex flex-col w-full h-full bg-black rounded-2xl pt-4 pl-4"}
    >
      {/*TOP PART*/}
      <div className={"flex flex-row gap-2 items-center"}>
        <button
          className={
            "rounded-2xl bg-secondary border-2 p-1 border-transparent hover:border-accent md:hidden"
          }
          onClick={handleReturn}
        >
          <ArrowLeftFromLine width={35} height={35} />
        </button>
        <h1
          className={
            "text-2xl font-bold top-0 bg-gradient-to-b to-secondary from-primary z-10 leading-normal bg-clip-text text-transparent"
          }
        >
          {name}
        </h1>
      </div>
      {/* WHOLE CHAT AREA */}
      <div className={"relative h-full flex flex-col"}>
        {/*CHAT AREA*/}
        <div
          className={
            "absolute h-full w-full flex-1 flex-col gap-2 mt-2 overflow-y-scroll no-scrollbar rounded-xl"
          }
        >
          {messages.map((value, index) => (
            <ChatBubble
              sender={value.sender}
              message={value.message}
              key={index}
            />
          ))}
        </div>
      </div>
      {/* MESSAGE BOX */}
      <div className={"flex pb-2.5 w-full items-center gap-2 mt-2"}>
        <div className={"bg-secondary w-full p-2 rounded-xl border-accent"}>
          <input
            className={"w-full bg-transparent text-text"}
            placeholder={"Message Goes Here..."}
          />
        </div>
        <div
          className={
            "rounded-xl p-2 bg-primary cursor-pointer border-2 border-transparent hover:border-accent"
          }
        >
          <SendHorizonal />
        </div>
        <div
          className={
            "rounded-xl p-2 bg-primary cursor-pointer border-2 border-transparent hover:border-accent"
          }
        >
          <Stars />
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
