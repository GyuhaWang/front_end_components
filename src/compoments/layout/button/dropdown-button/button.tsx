"use client"

import {  useState } from "react";
import styles  from "./button.module.css";
import commonStyles from "@/app/page.module.css";
export default function DropDownButton(){
    const [isDropdownOpened, setIsDropdownOpened] = useState(false);
    const handleClickButton = ()=>{
        setIsDropdownOpened(prev=>!prev);
    }
    return (
        <section className={`${styles.section}`}>
        <button className={`${commonStyles.hover_button} ${styles.button}`} onClick={handleClickButton}></button>
        {/* 버튼을 기준으로 오른쪽 하단에서 시작하여 왼쪽으로 width:fit-content 만큼 크기로 생깁니다 */}
        <div className={`${styles.contents} ${isDropdownOpened?styles.open :styles.close}`}>
           
            <div>
                1.test .com
            </div>
            <div>
                2.test .com
            </div>
            <div>
                3.test .com
            </div>
           
        </div>
        
    
    </section>);
}