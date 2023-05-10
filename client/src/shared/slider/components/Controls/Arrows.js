import React, { useContext } from "react";
import { SliderContext } from "../../Slider";

import styles from './arrows.module.css';

export default function Arrows() {
  const { changeSlide } = useContext(SliderContext);

  return (
    <div className={styles["arrows"]}>
      <div className={`${styles["left"]} ${styles['arrow']}`} onClick={() => changeSlide(-1)} />
      <div className={`${styles["right"]} ${styles['arrow']}`} onClick={() => changeSlide(1)} />
    </div>
  );
}
