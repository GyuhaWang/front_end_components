"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollViewProps } from "../props";
import styles from "./scroll-view.module.css";
export default function BlurScrollView(props: ScrollViewProps) {
  const itemWidth = 124;
  const scrollSize = useRef<number>(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [scrollState, setScrollState] = useState<"left" | "right" | "middle">(
    "left"
  );

  /*scroll section 의 크기 변경에 따른  scrollSize 대응*/
  useEffect(() => {
    if (!scrollRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        scrollSize.current = Math.max(
          1,
          Math.min(Math.floor(entry.contentRect.width / itemWidth), 4)
        );
      }
    });
    observer.observe(scrollRef.current);

    let lastState: "left" | "right" | "middle" = scrollState;

    const handleScroll = () => {
      const el = scrollRef.current;
      if (!el) return;

      let newState: "left" | "right" | "middle";
      if (Math.abs(el.scrollLeft + el.clientWidth - el.scrollWidth) < 1) {
        newState = "right";
      } else if (el.scrollLeft === 0) {
        newState = "left";
      } else {
        newState = "middle";
      }

      if (lastState !== newState) {
        setScrollState(newState);
        lastState = newState;
      }
    };

    scrollRef.current.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      scrollRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClickPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft - itemWidth * scrollSize.current,
        behavior: "smooth",
      });
      // 왼쪽으로 400px 이동
    }
  };
  const handleClickNext = () => {
    if (scrollRef.current) {
      console.log("prev", scrollRef.current.scrollLeft);
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + itemWidth * scrollSize.current,
        behavior: "smooth",
      });

      // 오른쪽으로 400px 이동
    }
  };
  return (
    <section className={styles.scroll_section} style={{ height: "124px" }}>
      {scrollState === "left" ? (
        <div></div>
      ) : (
        <button
          className={`${styles.button} ${styles.left}`}
          onClick={handleClickPrev}
        ></button>
      )}
      <div
        className={`${
          scrollState == "right"
            ? styles.blur_left
            : scrollState == "left"
            ? styles.blur_right
            : styles.blur
        }`}
      >
        <div ref={scrollRef} className={styles.contents}>
          {props.items.map((item, index) => (
            <button
              key={`${item.id} + ${index}`}
              className={`${styles.item}`}
              style={{ width: itemWidth, minWidth: itemWidth }}
            >
              {item.displayName}
            </button>
          ))}
        </div>
      </div>
      {scrollState !== "right" && (
        <button
          className={`${styles.button} ${styles.right}`}
          onClick={handleClickNext}
        ></button>
      )}
    </section>
  );
}
