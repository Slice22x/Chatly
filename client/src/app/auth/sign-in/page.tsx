"use client";
import React, { useCallback, useState } from "react";
import { LogIn, Mail, SquareAsterisk } from "lucide-react";
import GoogleIcon from "@/assets/icons8-google.svg";
import DiscordIcon from "@/assets/icons8-discord.svg";
import Image from "next/image";
import { useSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { signIn, setActive, isLoaded } = useSignIn();
  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        redirect("/user/profile");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, form.email, form.password]);

  return (
    <div
      className={
        "h-full flex flex-col items-center justify-center border-accent border-2 rounded-2xl"
      }
    >
      {/* HEADER */}
      <h1
        className={
          "text-5xl font-bold mt-8 bg-gradient-to-b to-primary from-text z-10 leading-normal bg-clip-text text-transparent"
        }
      >
        Sign In
      </h1>
      {/* FIELDS */}
      <div className={"flex flex-col gap-4 w-[65%] md:w-[55%] mt-4"}>
        {/* EMAIL */}
        <div className={"flex flex-col w-full"}>
          <h1
            className={
              "text-xl ml-4 font-bold top-0 bg-gradient-to-b to-secondary from-primary z-10 leading-normal bg-clip-text text-transparent"
            }
          >
            Email/Username
          </h1>
          <div
            className={
              "flex gap-2 p-2 rounded-xl border-2 border-transparent focus:border-accent bg-secondary"
            }
          >
            <Mail className={"text-primary"} />
            <input
              className={"w-full bg-transparent text-text"}
              placeholder={"Enter Email or Username"}
              type={"email"}
              value={form.email}
              onChange={(value) =>
                setForm({ ...form, email: value.target.value })
              }
            />
          </div>
        </div>
        {/* PASSWORDS */}
        <div className={"flex flex-col w-full"}>
          <h1
            className={
              "text-xl ml-4 font-bold top-0 bg-gradient-to-b to-secondary from-primary z-10 leading-normal bg-clip-text text-transparent"
            }
          >
            Password
          </h1>
          <div
            className={
              "flex gap-2 p-2 rounded-xl border-2 border-transparent focus:border-accent bg-secondary"
            }
          >
            <SquareAsterisk className={"text-primary"} />
            <input
              className={"w-full bg-transparent text-text"}
              placeholder={"Enter Password"}
              type={"password"}
              value={form.password}
              onChange={(value) =>
                setForm({ ...form, password: value.target.value })
              }
            />
          </div>
        </div>
        {/* BUTTONS */}
        <div className={"flex flex-col w-full gap-1"}>
          {/* MAIN SIGN IN BUTTON*/}
          <button
            className={
              " text-primary border-2 bg-primary p-2 rounded-xl cursor-pointer border-transparent hover:border-accent flex items-center justify-center gap-2"
            }
            onClick={onSignInPress}
          >
            <LogIn className={"text-secondary"} />
            <p className={"text-lg text-text"}>Sign In</p>
          </button>
          {/* DIVIDER */}
          <hr className={"mt-4"} />
          <p className={"text-gray-600 text-center"}> or sign in with</p>
          <hr className={"mb-4"} />
          {/*OAUTH BUTTONS*/}
          <div className={"flex gap-1 md:gap-3 items-center justify-center"}>
            <div
              className={
                "text-black border-2 w-full bg-white p-1 rounded-xl cursor-pointer border-transparent hover:border-accent flex items-center justify-center gap-2"
              }
            >
              <Image
                src={GoogleIcon}
                alt={"Google Icon"}
                className={"text-secondary"}
                width={30}
                height={30}
              />
              <p className={"text-sm text-black"}>Google</p>
            </div>
            <div
              className={
                "text-black border-2 bg-[#7289da] w-full p-1 rounded-xl cursor-pointer border-transparent hover:border-accent flex items-center justify-center gap-2"
              }
            >
              <Image
                src={DiscordIcon}
                alt={"Google Icon"}
                className={"text-secondary"}
                width={30}
                height={30}
              />
              <p className={"text-sm text-black"}>Discord</p>
            </div>
          </div>
          <hr className={"mt-4"} />
          <p className={"text-gray-600 w-full text-center"}>
            Don't have an account?{" "}
            <Link href={"/auth/sign-up"}>
              <span className={"text-primary"}>Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
