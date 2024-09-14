import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={
        "absolute inset-0 h-full w-full bg-[radial-gradient(#80808012_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center"
      }
    >
      <div
        className={
          "h-[65%] md:h-[85%] my-auto w-[70%] lg:w-[50%] rounded-2xl p-4 bg-black"
        }
      >
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
