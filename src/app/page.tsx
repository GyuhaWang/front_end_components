import SideBar from "@/compoments/layout/sidebar/default-sidebar/sidebar";
import styles from "./page.module.css";
import { SideBarItem } from "@/compoments/layout/sidebar/props";
import Header from "@/compoments/layout/header/default-header/header";
import BlurScrollView from "@/compoments/layout/scroll-view/blurred-scroll-view/scroll-view";
import { ScrollViewPItem } from "@/compoments/layout/scroll-view/props";

export default function Home() {
  const scrollItems: ScrollViewPItem[] = [
    { id: 0, displayName: "this is first" },
    { id: 1, displayName: "this is second" },
    { id: 2, displayName: "this is third" },
    { id: 3, displayName: "this is 4" },
    { id: 4, displayName: "this is 5" },
    { id: 5, displayName: "this is 6" },
    { id: 5, displayName: "this is 7" },
    { id: 6, displayName: "this is 8" },
    { id: 7, displayName: "this is 9" },
  ];
  return (
    <div className={styles.body}>
      <BlurScrollView items={scrollItems} min_display_num={3} />
    </div>
  );
}
