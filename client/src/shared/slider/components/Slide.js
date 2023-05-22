import React from "react";
import SlideTitle from "./SlideTitle";
import SlideImage from "./SlideImage";

import styles from "../slider.module.css";

export default function Slide({ data: { url, title } }) {
  return (
    <div className={styles['slide']}>
      <SlideImage src={url} alt={title} />
      {/*<SlideTitle title={title} />*/}
    </div>
  );
}
