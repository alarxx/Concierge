import React, {useEffect} from "react";

import "../slider.module.css";
import styles from "../slider.module.css";

export default function SlideImage({ src, alt }) {
  useEffect(()=>{
    console.log(src)
  })
  return <img src={src} alt={alt} className={styles['slide-image']} />;
}
