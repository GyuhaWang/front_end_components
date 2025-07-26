import SideBar from "@/compoments/layout/sidebar/default-sidebar/sidebar";
import { SideBarItem } from "@/compoments/layout/sidebar/props";

export default function AppSideBar() {
  const items: SideBarItem[] = [
    { id: 0, displayName: "this is first" },
    { id: 1, displayName: "this is second" },
    { id: 2, displayName: "this is third" },
  ];

  return <SideBar title="this is title" items={items} />;
}
