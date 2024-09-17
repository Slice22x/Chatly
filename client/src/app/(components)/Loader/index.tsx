import React from "react";
import Image from "next/image";
import LoaderIcon from "@/assets/tube-spinner.svg";
import { number } from "prop-types";

type props = {
  scale?: number;
};

const Loader = ({ scale = 30 }: props) => {
  return (
    <Image src={LoaderIcon} alt={"Loading"} width={scale} height={scale} />
  );
};

export default Loader;
