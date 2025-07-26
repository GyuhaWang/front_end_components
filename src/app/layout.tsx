import type { Metadata } from "next";

import "./globals.css";
import { SidebarProvider } from "../compoments/layout/sidebar/context/SidebarContext";
import SideBar from "@/compoments/layout/sidebar/default-sidebar/sidebar";
import { SideBarItem } from "@/compoments/layout/sidebar/props";
import AppSideBar from "./sideBar";
import Header from "@/compoments/layout/header/default-header/header";

export const metadata: Metadata = {
  title: "FrontEnd",
  description: "FrontEnd components ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <SidebarProvider>
          <AppSideBar />
          <main>
            <Header />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
