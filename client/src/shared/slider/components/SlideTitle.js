import React from "react";

import styles from "../slider.module.css";

export default function SlideTitle({ title }) {
  return <div className={styles['slide-title']}>{title}</div>;
}
