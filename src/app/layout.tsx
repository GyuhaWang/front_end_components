import type { Metadata } from "next";

import "./globals.css";
import { SidebarProvider } from "../compoments/layout/sidebar/context/SidebarContext";

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
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
