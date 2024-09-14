"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type props = {
  image: React.ReactNode;
  name: string;
  link?: string;
};

const Index = ({ image, name, link = "" }: props) => {
  const pathname = usePathname();
  const linkTo = link ? link : `/user/${name}`;
  return (
    <Link href={linkTo}>
      <div
        className={`${pathname === `${linkTo}` && "bg-secondary"} rounded-2xl p-2 flex flex-col justify-center items-center cursor-pointer hover:bg-secondary backdrop-opacity-70 transition duration-150 hover:shadow hover:shadow-accent z-50`}
      >
        <div>{image}</div>
        <p className={"text-sm mt-1 capitalize"}>{name}</p>
      </div>
    </Link>
  );
};

export default Index;
