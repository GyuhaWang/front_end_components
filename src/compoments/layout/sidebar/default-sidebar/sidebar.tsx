"use client";
import styles from "./sidebar.module.css";
import commonStyles from "@/app/page.module.css";
import { SideBarProps } from "../props";
import { useSidebarContext } from "../../../../providers/SidebarContext";
import Link from "next/link";

export default function SideBar(props: SideBarProps) {
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
    <section className={`${styles.section} `}>
      <div
        className={`${styles.flex_box} ${
          isSidebarOpened ? styles.open : styles.close
        }`}
      />

      {/* content container */}
      <div
        className={styles.content_container}
        data-state={isSidebarOpened ? "open" : "close"}
        data-header-hovered={isSidebarHovered ? "true" : "false"}
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
      >
        {/* header 부분 */}
        <div
          className={`${styles.header} ${commonStyles.hover_item} `}
          data-state={isSidebarOpened ? "open" : "close"}
        >
          <p>user info</p>
          <button
            className={`${styles.close_button} ${commonStyles.hover_button}`}
            onClick={handleClickSidebarButton}
          ></button>
        </div>
        <div className="styles.header_closed"></div>
        {/* body 부분 */}
        <div
          className={styles.body}
          data-state={isSidebarOpened ? "open" : "close"}
          data-header-hovered={isSidebarHovered ? "true" : "false"}
        >
          {props.title && <div className={styles.title}>{props.title}</div>}
          {props.items.length > 0 && (
            <div className={styles.items}>
              {props.items.map((item, index) => (
                <Link
                  href={`/main/${String(item.id)}`}
                  className={commonStyles.hover_item}
                  key={(item.id as string) + index}
                >
                  {item.displayName}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
