import Header from "@/compoments/layout/header/default-header/header";
import { SidebarProvider } from "@/providers/SidebarContext";
import AppSideBar from "./sideBar";
import "../globals.css";
export default function SideBarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSideBar />
      <main>
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
}
