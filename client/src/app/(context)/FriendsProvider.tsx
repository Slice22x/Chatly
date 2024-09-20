"use client";

import { createContext, useContext, useState } from "react";
import React from "react";

const FriendsContext = createContext<any>(undefined);

export function FriendsProvider({ children }: { children: React.ReactNode }) {
  const [selectedFriend, setSelectedFriend] = useState<string>("");
  const [selectedClerkId, setSelectedClerkId] = useState<string>("");

  return (
    <FriendsContext.Provider
      value={{
        selectedFriend,
        setSelectedFriend,
        selectedClerkId,
        setSelectedClerkId,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
}

export function useFriendsContext() {
  return useContext(FriendsContext);
}
