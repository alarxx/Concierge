import React, { useContext } from "react";
import { SliderContext } from "../../Slider";

import styles from './dots.module.css';

export default function Dot({ number }) {
  const { goToSlide, slideNumber } = useContext(SliderContext);

  return (
    <div
      className={`${styles.dot} ${slideNumber === number ? styles.selected : ""}`}
      onClick={() => goToSlide(number)}
    />
  );
}
