import SideBar from "@/compoments/layout/sidebar/default-sidebar/sidebar";
import styles from "./page.module.css";
import { SideBarItem } from "@/compoments/layout/sidebar/@props";

export default function Home() {
  const items: SideBarItem[] = [
    { id: 0, displayName: "this is first" },
    { id: 1, displayName: "this is second" },
    { id: 2, displayName: "this is third" },
  ];
  return (
    <div className={styles.page}>
      <SideBar title="this is title" items={items} />
      <main>this is main</main>
    </div>
  );
}
