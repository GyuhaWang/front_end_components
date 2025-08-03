"use client";

import DropDownButton from "../../button/dropdown-button/button";
import { useSidebarContext } from "../../../../providers/SidebarContext";
import SideBarControllButton from "../../sidebar/sidebar-controller/sidebar-controll-button";
import styles from "./header.module.css";
import commonStyles from "@/app/page.module.css";
export default function Header() {
  return (
    <div className={styles.header_container}>
      <SideBarControllButton />

      <div>this is header main</div>
      <DropDownButton />
    </div>
  );
}
