"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
  isSidebarOpened: boolean;
  setIsSidebarOpened: (open: boolean) => void;
  isSidebarHovered: boolean;
  setIsSidebarHovered: (hovered: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpened, setIsSidebarOpened] = useState<boolean>(true);
  const [isSidebarHovered, setIsSidebarHovered] = useState<boolean>(false);

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpened,
        setIsSidebarOpened,
        isSidebarHovered,
        setIsSidebarHovered,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
}; 