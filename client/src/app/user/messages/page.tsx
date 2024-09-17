"use client";
import React, { useState } from "react";
import FriendsBar from "@/app/(components)/FriendsBar";
import { useMediaQuery } from "@/app/(components)/hooks/hooks";
import {
  FriendsProvider,
  useFriendsContext,
} from "@/app/(context)/FriendsProvider";
import ChatArea from "@/app/(components)/ChatArea";
import { useAuth, useUser } from "@clerk/nextjs";
import { LogIn, LogOut, UserRoundPlus } from "lucide-react";
import Link from "next/link";
import { useGetChatsQuery } from "@/state/api";

const Messages = () => {
  const { selectedFriend, setSelectedFriend } = useFriendsContext();
  const isBelowMdScreen = useMediaQuery("(max-width: 768px)");
  const { isSignedIn } = useAuth();

  return (
    <div>
      {!isSignedIn ? (
        <div className={"w-full flex flex-col gap-8"}>
          {/* HEADER */}
          <h1
            className={
              "text-4xl font-bold ml-16 lg:ml-24 mt-8 bg-gradient-to-b to-primary from-text z-10 leading-normal bg-clip-text text-transparent"
            }
          >
            Messages
          </h1>
          {/* ALERT */}
          <div
            className={"w-full flex flex-col items-center justify-center gap-4"}
          >
            <h1
              className={
                "text-5xl text-center font-bold top-0 bg-gradient-to-b to-secondary from-primary z-10 leading-normal bg-clip-text text-transparent mt-8"
              }
            >
              You must be signed in to use this feature.
            </h1>
            {/* BUTTONS */}
            <div className={"flex items-center justify-center gap-4 px-2"}>
              <Link href={"/auth/sign-in"}>
                <div
                  className={
                    "mx-auto text-primary border-2 bg-secondary p-2 rounded-xl cursor-pointer border-transparent hover:border-accent flex items-center justify-center gap-2"
                  }
                >
                  <LogIn />
                  <p className={"text-xl text-text"}>Sign In</p>
                </div>
              </Link>

              <div
                className={
                  "mx-auto text-primary border-2 bg-secondary p-2 rounded-xl cursor-pointer border-transparent hover:border-accent flex items-center justify-center gap-2"
                }
              >
                <UserRoundPlus />
                <p className={"text-xl text-text"}>Sign Up</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={"w-full h-full flex flex-col rounded-2xl"}>
          <h1
            className={
              "text-4xl font-bold ml-16 lg:ml-24 mt-8 bg-gradient-to-b to-primary from-text z-10 leading-normal bg-clip-text text-transparent"
            }
          >
            Messages
          </h1>
          {/*<hr className={"w-[90%] mx-auto mt-2 border-accent"} />*/}
          <div className={"flex flex-row items-center h-full min-w-full"}>
            {/* FRIENDS */}

            {/* HIDE WHEN FRIEND IS SELECTED ON SMALL SCREENS */}
            {selectedFriend && isBelowMdScreen ? <></> : <FriendsBar />}

            {/* DIVIDER */}
            <div
              className={
                "hidden min-h-[10em] w-[0.1rem] bg-primary md:inline-block"
              }
            />
            {/* CHATS */}
            {selectedFriend && (
              <div className={"w-full h-full mx-2"}>
                <ChatArea name={selectedFriend} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
