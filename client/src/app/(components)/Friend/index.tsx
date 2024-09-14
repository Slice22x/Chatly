import React from "react";
import Image from "next/image";
import defaultProfile from "@/assets/no-profile.svg";
import { useFriendsContext } from "@/app/(context)/FriendsProvider";
import { MessageCircle, MessageSquare } from "lucide-react";

type props = {
  username: string;
  picture?: React.ReactNode;
  name: string;
};

const Friend = ({ username, picture, name }: props) => {
  const { selectedFriend, setSelectedFriend } = useFriendsContext();

  const handleFriendPress = () => {
    setSelectedFriend(username);
    console.log(selectedFriend);
    console.log(selectedFriend === username && "border-accent");
  };

  return (
    <div className={"flex justify-center items-center w-full md:w-auto"}>
      <div
        className={`text-text cursor-pointer border-2 rounded-xl py-1 w-full hover:border-accent flex gap-2 pr-10 items-center justify-between pl-2 ${selectedFriend === username ? "border-accent" : "border-transparent"}`}
        onClick={handleFriendPress}
      >
        <div className={"flex gap-2 justify-start items-center"}>
          <Image
            src={defaultProfile}
            alt={"no-profile"}
            width={35}
            height={35}
          />
          <div
            className={
              "flex lg:inline-block flex-col items-center justify-center"
            }
          >
            <p className={"mt-1.5 line-clamp-1 text-start w-full"}>{name}</p>
            <p className={"-mt-1 text-sm text-gray-400 text-start w-full"}>
              {username}
            </p>
          </div>
        </div>
        <MessageSquare
          width={35}
          height={35}
          className={"md:hidden text-primary"}
        />
      </div>
    </div>
  );
};

export default Friend;
