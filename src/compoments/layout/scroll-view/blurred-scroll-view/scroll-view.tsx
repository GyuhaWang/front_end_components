"use client"

import { ReactElement, useEffect, useRef, useState } from "react";
import { ScrollViewProps } from "../props";
import styles from "./scroll-view.module.css";
export default function BlurScrollView(props: ScrollViewProps){
    const itemWidth = 100;
    const minDisplayNum =4;
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollIndex,setScrollIndex] = useState(0);

    useEffect(()=>{
    // 시작할 때 왼쪽 요소를 button 크기만큼 이동시켜야함

    },[])
    const handleClickPrev =()=>{
        if (scrollRef.current) {
            
            scrollRef.current.scrollTo({
                left:scrollRef.current.scrollLeft-(itemWidth*minDisplayNum),
                behavior:"smooth"
            });
        // 왼쪽으로 400px 이동
        }
    };
    const handleClickNext =()=>{
        if (scrollRef.current) {
            
            scrollRef.current.scrollTo({
                left:scrollRef.current.scrollLeft+(itemWidth*minDisplayNum),
                behavior:"smooth"
            });
        // 왼쪽으로 400px 이동
        }
    };
    return(
        <section className={styles.scroll_section}>
            
            {
            scrollIndex ==0 ?<div></div>:
            <button className={`${styles.button}`} onClick={handleClickPrev}>prev</button>}
            <div ref={scrollRef}  className={styles.contents}>
                {props.items.map((item,index)=><div key={`${item.id} + ${index}`} 
                className={`${styles.item}`}
                style={{width:itemWidth}}
                >{item.displayName}</div>)}
             
            </div>
            {scrollIndex != props.items.length-1 &&
            <button  className={`${styles.button} `} onClick={handleClickNext}>next</button>}
        </section>
    );
}