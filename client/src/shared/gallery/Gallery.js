import React, {useEffect, useRef, useState} from "react";

import styles from './gallery.module.css'

import ForwardIcon from '../../assets/icons/arrow_forward_ios_FILL0_wght400_GRAD0_opsz48.svg'
import BackIcon from '../../assets/icons/arrow_back_ios_FILL0_wght400_GRAD0_opsz48.svg'
import GalleryThumb from "./GalleryThumb";
export default function Gallery({children}) {

    const divRef = useRef(null); // Reference to the div element
    const btnNextRef = useRef(null);
    const btnPrevRef = useRef(null);
    const [isScrolledByX, setIsScrolledByX] = useState(false);
    const [isScrolledByXDone, setIsScrolledByXDone] = useState(false);

    const [scrollAmount, setScrollAmount] = useState(null)
    useEffect(()=> {
        const galleryThumbElement = document.querySelector('div[data-id="gallery-thumb"]');
        if (galleryThumbElement) {
            const width = galleryThumbElement.offsetWidth;
            // const width = 160;
            setScrollAmount(width+2)
        }
    })

    const handleScroll = () => {
        if (divRef.current.scrollLeft > 0) {
            setIsScrolledByX(true)
        } else {
            setIsScrolledByX(false)
        }

        if (Math.round(divRef.current.scrollLeft + divRef.current.clientWidth + 1) >= divRef.current.scrollWidth) {
            setIsScrolledByXDone(true)
        } else {
            setIsScrolledByXDone(false)
        }

        // console.log('scrollWidth',divRef.current.scrollWidth)
        // console.log('clientWidth',divRef.current.clientWidth)
        // console.log('scrollLeft',divRef.current.scrollLeft)
        // console.log('scrollLeft + clientWidth',divRef.current.scrollLeft + divRef.current.clientWidth)
        // console.log('round',Math.round(divRef.current.scrollLeft + divRef.current.clientWidth))
    };

    function handleClickNext() {
        const divElement = divRef.current;
        if (divElement) {
            divElement.scrollLeft += scrollAmount;
        }
    };
    function handleClickPrev() {
        const divElement = divRef.current;
        if (divElement) {
            divElement.scrollLeft -= scrollAmount;
        }
    };

    return (<>
        <div className={styles['Gallery']}>
            <div ref={divRef} onScroll={handleScroll} className={styles["Gallery-thumb-list"]}>
                {children}
                {/*<GalleryThumb>*/}

                {/*</GalleryThumb>*/}
            </div>
            <div className={styles["Gallery-buttons"]}>
                <button ref={btnPrevRef} className={`${ !isScrolledByX && styles['Gallery-button--inactive']} ${styles['Gallery-button']} ${styles['Gallery-button--prev']}`} onClick={handleClickPrev}>
                    <BackIcon width={30} height={30} />
                </button>
                <button ref={btnNextRef} className={`${isScrolledByXDone && styles['Gallery-button--inactive']} ${styles['Gallery-button']} ${styles['Gallery-button--next']}`} onClick={handleClickNext}>
                    <ForwardIcon width={30} height={30} />
                </button>
            </div>
        </div>
    </>)
}