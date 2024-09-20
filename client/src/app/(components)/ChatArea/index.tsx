import React, { useState } from "react";
import { ArrowLeftFromLine, SendHorizonal, Star, Stars } from "lucide-react";
import { useFriendsContext } from "@/app/(context)/FriendsProvider";
import ChatBubble from "@/app/(components)/ChatBubble";
import {
  useCreateChatMutation,
  useGetChatsQuery,
  useGetChatsSpecificQuery,
  useUpdateChatMutation,
} from "@/state/api";
import { useUser } from "@clerk/nextjs";
import Loader from "@/app/(components)/Loader";

type props = {
  name: string;
};

const ChatArea = ({ name }: props) => {
  const { user } = useUser();
  const [message, setMessage] = useState<string>("");
  const {
    selectedFriend,
    setSelectedFriend,
    selectedClerkId,
    setSelectedClerkId,
  } = useFriendsContext();

  const [updateMessage] = useUpdateChatMutation();

  const { data: messages, isLoading } = useGetChatsSpecificQuery({
    currentUser: user!.id,
    otherUser: selectedFriend,
  });

  const [createChat] = useCreateChatMutation();

  const handleReturn = () => {
    setSelectedFriend("");
    setSelectedClerkId("");
  };

  const handleSendMessage = () => {
    if (messages!.length === 0) {
      createChat({
        currentUserId: user!.id,
        otherUser: selectedFriend,
      }).then(({ data }) => {
        updateMessage({
          chatId: data!.id,
          currentUser: user!.id,
          message: {
            senderId: user!.id,
            recipientId: selectedClerkId,
            message: message,
          },
        });
      });
      setMessage("");
      return;
    }

    updateMessage({
      chatId: messages![0].id,
      currentUser: user!.id,
      message: {
        senderId: user!.id,
        recipientId: selectedClerkId,
        message: message,
      },
    });
    setMessage("");
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
          className={`absolute h-full w-full flex-1 flex-col gap-2 mt-2 overflow-y-scroll no-scrollbar rounded-xl ${isLoading && "flex items-center justify-center"}`}
        >
          {isLoading ? (
            <Loader scale={75} />
          ) : messages!.length === 0 ? (
            <div className={"w-full h-full flex items-center justify-center"}>
              <h1
                className={
                  "text-2xl font-bold top-0 bg-gradient-to-b to-secondary from-primary z-10 leading-normal bg-clip-text text-transparent"
                }
              >
                No messages between you? Start typing to get things rolling
              </h1>
            </div>
          ) : (
            messages![0].messages.map((message, index) => (
              <ChatBubble
                sender={message.senderId}
                message={message.message}
                key={index}
              />
            ))
          )}
        </div>
      </div>
      {/* MESSAGE BOX */}
      <div className={"flex pb-2.5 w-full items-center gap-2 mt-2"}>
        <div className={"bg-secondary w-full p-2 rounded-xl border-accent"}>
          <input
            className={"w-full bg-transparent text-text"}
            placeholder={"Message Goes Here..."}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </div>
        <button
          className={
            "rounded-xl p-2 bg-primary cursor-pointer border-2 border-transparent hover:border-accent"
          }
          onClick={handleSendMessage}
        >
          <SendHorizonal />
        </button>
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
