"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  BadgeCheck,
  CircleX,
  LogIn,
  Mail,
  SquareAsterisk,
  Tag,
  UserRound,
  UserRoundPlus,
} from "lucide-react";
import GoogleIcon from "@/assets/icons8-google.svg";
import DiscordIcon from "@/assets/icons8-discord.svg";
import Image from "next/image";
import { useSignUp } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useCreateUsersMutation } from "@/state/api";
import Loader from "@/app/(components)/Loader";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const searchParams = useSearchParams();
  const modalRef = useRef<null | HTMLDialogElement>(null);
  const showDialog = searchParams.get("showDialog");
  const [code, setCode] = useState("");
  const [createUser] = useCreateUsersMutation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showDialog === "true") {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [showDialog]);

  const onPressVerify = async () => {
    if (!isLoaded) return;

    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      console.log(completeSignUp.status);

      if (completeSignUp.status === "complete") {
        // LINKING TO THE DATABASE

        await setActive({ session: completeSignUp.createdSessionId });
        createUser({
          name: form.name,
          email: form.email,
          username: form.username,
          bio: "",
          clerkId: completeSignUp.createdUserId!,
          friends: [],
          friendRequests: [],
        });
        setVerification({ ...verification, state: "success" });
        modalRef.current?.close();
        router.push("/user/profile");
        setLoading(false);
      } else {
        setVerification({
          ...verification,
          error: "Verification failed",
          state: "failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err,
        state: "failed",
      });
    }
    setLoading(false);
  };

  const closeModal = () => {
    setVerification({ ...verification, state: "default" });
    modalRef.current?.close();
  };

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded || verification.state === "pending") {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        username: form.username,
        password: form.password,
        firstName: form.name,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({ ...verification, state: "pending" });

      router.push("/auth/sign-up?showDialog=true");
    } catch (err: any) {
      console.log("Error: " + err);
    }
  };

  return (
    <div
      className={
        "h-full flex flex-col items-center justify-center border-accent border-2 rounded-2xl"
      }
    >
      {showDialog === "true" ? (
        <dialog
          ref={modalRef}
          className={
            "fixed z-50 w-[75%] h-[75%] bg-black backdrop:bg-background backdrop:bg-opacity-70 backdrop:blur-xl rounded-2xl border-2 border-accent shadow-secondary shadow-xl"
          }
        >
          {loading ? (
            <div
              className={
                "flex flex-col w-full h-full justify-center items-center"
              }
            >
              <Loader scale={50} />
            </div>
          ) : (
            <div
              className={
                "flex flex-col w-full h-full justify-center items-center"
              }
            >
              {/* HEADER */}
              <h1
                className={
                  "text-5xl font-bold mt-8 bg-gradient-to-b to-primary from-text z-10 leading-normal bg-clip-text text-transparent"
                }
              >
                Verify your Account
              </h1>

              <p className={"text-text mb-4"}>
                We've sent an email to{" "}
                <span className={"text-primary"}>{form.email}</span> enter the
                code given below
              </p>

              <InputOTP
                maxLength={6}
                value={code}
                onChange={(value) => {
                  setCode(value);
                  setVerification({
                    ...verification,
                    code: value,
                  });
                }}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              >
                <InputOTPGroup>
                  <InputOTPSlot className={"text-text"} index={0} />
                  <InputOTPSlot className={"text-text"} index={1} />
                  <InputOTPSlot className={"text-text"} index={2} />
                  <InputOTPSlot className={"text-text"} index={3} />
                  <InputOTPSlot className={"text-text"} index={4} />
                  <InputOTPSlot className={"text-text"} index={5} />
                </InputOTPGroup>
              </InputOTP>
              {/* BUTTONS */}
              <div className={"flex gap-2 items-center justify-center mt-4"}>
                <button
                  className={
                    "text-primary border-2 bg-gray-700 p-2 rounded-xl cursor-pointer border-transparent hover:border-accent flex items-center justify-center gap-2"
                  }
                  onClick={closeModal}
                >
                  <CircleX className={"text-secondary"} />
                  <p className={"text-lg text-text"}>Cancel</p>
                </button>
                <button
                  className={
                    " text-primary border-2 bg-primary p-2 rounded-xl cursor-pointer border-transparent hover:border-secondary flex items-center justify-center gap-2"
                  }
                  onClick={onPressVerify}
                >
                  <BadgeCheck className={"text-secondary"} />
                  <p className={"text-lg text-text"}>Verify</p>
                </button>
              </div>
            </div>
          )}
        </dialog>
      ) : null}

      {/* HEADER */}
      <h1
        className={
          "text-5xl font-bold mt-8 bg-gradient-to-b to-primary from-text z-10 leading-normal bg-clip-text text-transparent"
        }
      >
        Sign Up
      </h1>
      {/* FIELDS */}
      <div className={"flex flex-col gap-4 w-[65%] md:w-[55%] mt-4"}>
        {/* NAME */}
        <div className={"flex flex-col w-full"}>
          <h1
            className={
              "text-xl ml-4 font-bold top-0 bg-gradient-to-b to-secondary from-primary z-10 leading-normal bg-clip-text text-transparent"
            }
          >
            Name
          </h1>
          <div
            className={
              "flex gap-2 p-2 rounded-xl border-2 border-transparent focus:border-accent bg-secondary"
            }
          >
            <UserRound className={"text-primary"} />
            <input
              className={"w-full bg-transparent text-text"}
              placeholder={"Enter Name"}
              type={"name"}
              value={form.name}
              onChange={(value) =>
                setForm({ ...form, name: value.target.value })
              }
            />
          </div>
        </div>
        {/* USERNAME */}
        <div className={"flex flex-col w-full"}>
          <h1
            className={
              "text-xl ml-4 font-bold top-0 bg-gradient-to-b to-secondary from-primary z-10 leading-normal bg-clip-text text-transparent"
            }
          >
            Username
          </h1>
          <div
            className={
              "flex gap-2 p-2 rounded-xl border-2 border-transparent focus:border-accent bg-secondary"
            }
          >
            <Tag className={"text-primary"} />
            <input
              className={"w-full bg-transparent text-text"}
              placeholder={"Enter Username"}
              type={"text"}
              value={form.username}
              onChange={(value) =>
                setForm({ ...form, username: value.target.value })
              }
            />
          </div>
        </div>
        {/* EMAIL */}
        <div className={"flex flex-col w-full"}>
          <h1
            className={
              "text-xl ml-4 font-bold top-0 bg-gradient-to-b to-secondary from-primary z-10 leading-normal bg-clip-text text-transparent"
            }
          >
            Email
          </h1>
          <div
            className={
              "flex gap-2 p-2 rounded-xl border-2 border-transparent focus:border-accent bg-secondary"
            }
          >
            <Mail className={"text-primary"} />
            <input
              className={"w-full bg-transparent text-text"}
              placeholder={"Enter Email"}
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
          {/* MAIN SIGN UP BUTTON*/}
          <button
            className={`text-primary border-2 bg-primary p-2 rounded-xl border-transparent hover:border-accent flex items-center justify-center gap-2 transition duration-100 ${loading && "!bg-gray-700 bg-opacity-70"}`}
            onClick={onSignUpPress}
            disabled={loading}
          >
            {loading ? (
              <Loader scale={30} />
            ) : (
              <UserRoundPlus className={"text-secondary"} />
            )}

            <p className={"text-lg text-text"}>
              {loading ? "Signing up..." : "Sign Up"}
            </p>
          </button>

          {/* DIVIDER */}
          <hr className={"mt-4"} />
          <p className={"text-gray-600 text-center"}> or sign up with</p>
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
            Have an account already?{" "}
            <Link href={"/auth/sign-in"}>
              <span className={"text-primary"}>Sign In</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
