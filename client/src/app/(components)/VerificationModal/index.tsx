"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { SetActive, SignUpResource } from "@clerk/types";
import { router } from "next/client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { BadgeCheck, CircleX, UserRoundPlus } from "lucide-react";

type props = {
  form: any;
  isLoaded: boolean;
  verf: {
    state: string;
    error: string;
    code: string;
  };
  setActive: SetActive | undefined;
  signUp: SignUpResource | undefined;
};

const VerificationModal = ({
  form,
  isLoaded,
  verf,
  setActive,
  signUp,
}: props) => {};

export default VerificationModal;
