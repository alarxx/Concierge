import React, { useContext } from "react";
import { SliderContext } from "../../Slider";
import Dot from "./Dot";

import styles from './dots.module.css';

export default function Dots() {
  const { slidesCount } = useContext(SliderContext);

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < slidesCount; i++) {
      dots.push(<Dot key={`dot-${i}`} number={i} />);
    }

    return dots;
  };

  return <div className={styles.dots}>{renderDots()}</div>;
}
