"use client";
import { useState } from "react";
import styles from "./sidebar.module.css";
import { SideBarProps } from "../@props";

export default function SideBar(props: SideBarProps) {
  const [isSidebarOpened, setIsSideBarOpened] = useState<boolean>(true);
  const [isHeaderHovered, setIsHeaderHovered] = useState<boolean>(false);

  const handleClickSidebarButton = () => {
    setIsSideBarOpened((prev) => !prev);
  };

  return (
    <section
      className={`${styles.section} ${
        isSidebarOpened ? styles.open : styles.close
      }`}
      style={{ "--sidebar-bg": props.backgroundColor } as React.CSSProperties}
    >
      {/* header 부분 */}
      <div
        className={styles.header}
        data-state={isSidebarOpened ? "open" : "close"}
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
      >
        <button
          className={styles.toggle_button}
          onClick={handleClickSidebarButton}
        >
          ☰
        </button>
      </div>
      {/* body 부분 */}
      <div
        className={styles.body}
        data-state={isSidebarOpened ? "open" : "close"}
        data-header-hovered={isHeaderHovered ? "true" : "false"}
      >
        {props.title && <div className={styles.title}>{props.title}</div>}
        {props.items.length > 0 && (
          <div className={styles.items}>
            {props.items.map((item, index) => (
              <div className={styles.item} key={(item.id as string) + index}>
                {item.displayName}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
