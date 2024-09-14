"use client";
import React from "react";
import NavigationIcon from "@/app/(components)/NavigationIcon";
import {
  CircleUser,
  Home,
  ImageIcon,
  LogIn,
  LogOut,
  Send,
  Users,
} from "lucide-react";
import { useMediaQuery } from "@/app/(components)/hooks/hooks";
import Image from "next/image";
import defaultProfile from "@/assets/no-profile.svg";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

const BottomBar = () => {
  const isBelowMdScreen = useMediaQuery("(max-width: 768px)");
  const { isSignedIn } = useAuth();

  return (
    <div className={"w-full"}>
      {isBelowMdScreen ? (
        <div
          className={
            "w-full rounded-t-[3rem] bg-black shadow-xl shadow-primary py-4 z-40"
          }
        >
          <div className="flex flex-row w-11/12 items-center justify-between mx-auto md:w-5/6">
            <NavigationIcon
              image={<Home className={"text-primary"} />}
              name={"home"}
              link={"/"}
            />
            <NavigationIcon
              image={<ImageIcon className={"text-primary"} />}
              name={"posts"}
            />
            <NavigationIcon
              image={<Send className={"text-primary"} />}
              name={"messages"}
            />
            <NavigationIcon
              image={<CircleUser className={"text-primary"} />}
              name={"profile"}
            />
          </div>
        </div>
      ) : (
        <div className={"flex w-full items-center justify-center"}>
          <div
            className={
              "mx-auto text-primary border-2 bg-secondary p-2 rounded-xl cursor-pointer border-transparent hover:border-accent flex items-center justify-center gap-2"
            }
          >
            {isSignedIn ? (
              <>
                <LogOut />
                <p className={"hidden lg:inline-block text-text"}>Sign Out</p>
              </>
            ) : (
              <>
                <Link
                  href={"/auth/sign-in"}
                  className={"w-full flex items-center justify-center gap-2"}
                >
                  <LogIn />
                  <p className={"hidden lg:inline-block  text-text"}>Sign In</p>
                </Link>
              </>
            )}
          </div>
          <div
            className={
              "mx-auto w-[75%] lg:w-[70%] rounded-t-[3rem] bg-black shadow-xl shadow-primary py-4 z-40"
            }
          >
            <div className="flex flex-row w-11/12 items-center justify-between mx-auto md:w-5/6">
              <NavigationIcon
                image={<Home className={"text-primary"} />}
                name={"home"}
                link={"/"}
              />
              <NavigationIcon
                image={<ImageIcon className={"text-primary"} />}
                name={"posts"}
              />
              <NavigationIcon
                image={<Send className={"text-primary"} />}
                name={"messages"}
              />
            </div>
          </div>
          <div className={"mx-auto"}>
            <div className={"flex"}>
              <Link
                href={"/user/profile"}
                className={
                  "text-text bg-secondary border-2 rounded-xl p-1 border-transparent hover:border-accent flex gap-2"
                }
              >
                <Image
                  src={defaultProfile}
                  alt={"no-profile"}
                  width={50}
                  height={50}
                />
                <div
                  className={
                    "hidden lg:inline-block flex-col items-center justify-center"
                  }
                >
                  <p className={"mt-1.5 line-clamp-1"}>Default User</p>
                  <p className={"-mt-1 text-sm text-gray-400"}>Name</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomBar;
