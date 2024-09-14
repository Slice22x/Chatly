import React from "react";
import { useFriendsContext } from "@/app/(context)/FriendsProvider";

type props = {
  sender: string;
  message: string;
};

const ChatBubble = ({ sender, message }: props) => {
  const { selectedFriend, setSelectedFriend } = useFriendsContext();

  return (
    <div
      className={`flex ${sender === selectedFriend ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`${sender === selectedFriend ? "bg-gray-700" : "bg-primary"} flex p-2 rounded-xl`}
      >
        <p className={"text-text text-lg"}>{message}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
