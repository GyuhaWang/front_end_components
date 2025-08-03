"use client";

import { useSidebarContext } from "../../../../providers/SidebarContext";
import styles from "./sidebar-controller-button.module.css";
import commonStyles from "@/app/page.module.css";
export default function SideBarControllButton() {
  const {
    isSidebarOpened,
    setIsSidebarOpened,
    isSidebarHovered,
    setIsSidebarHovered,
  } = useSidebarContext();

  const handleClickSidebarButton = () => {
    setIsSidebarOpened(!isSidebarOpened);
  };

  return (
    <div
      className={styles.header_sidebar_container}
      data-state={isSidebarOpened ? "open" : "close"}
      onMouseEnter={() => setIsSidebarHovered(true)}
      onMouseLeave={() => setIsSidebarHovered(false)}
    >
      <button
        className={`${styles.toggle_button} ${commonStyles.hover_button}`}
        data-header-hovered={isSidebarHovered ? "true" : "false"}
        data-state={isSidebarOpened ? "open" : "close"}
        onClick={handleClickSidebarButton}
      />
    </div>
  );
}
