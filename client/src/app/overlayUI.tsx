import React from "react";
import BottomBar from "@/app/(components)/BottomBar";

const OverlayUI = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={"flex flex-col w-full h-full"}>
      <div className={"h-full"}>{children}</div>
      {/* BOTTOM BAR */}
      <BottomBar />
    </div>
  );
};

export default OverlayUI;
