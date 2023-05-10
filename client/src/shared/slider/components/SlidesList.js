import React, { useContext } from "react";
import Slide from "./Slide";
import { SliderContext } from "../Slider";

import styles from "../slider.module.css";

export default function SlidesList() {
  const { slideNumber, items } = useContext(SliderContext);

  return (
    <div
      className={styles['slide-list']}
      style={{ transform: `translateX(-${slideNumber * 100}%)` }}
    >
      {items.map((slide, index) => (
        <Slide key={index} data={slide} />
      ))}
    </div>
  );
}
