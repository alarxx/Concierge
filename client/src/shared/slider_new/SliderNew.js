import React, {useEffect, useRef, useState} from "react";
import Slider from "react-slick";

import styles from './sliderNew.module.css'
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BackIcon from "../../assets/icons/arrow_back_ios_FILL0_wght400_GRAD0_opsz48.svg";
import ForwardIcon from "../../assets/icons/arrow_forward_ios_FILL0_wght400_GRAD0_opsz48.svg";

export default function SliderNew({photos}) {

    const [currentCounter, setCurrentCounter] = useState(0)
    const sliderRef = useRef(null);

    const next = () => {
        sliderRef.current.slickNext();
        // if (currentCounter >= photos.length) {
        //     setCurrentCounter(1)
        // } else if (currentCounter < photos.length) {
        //     setCurrentCounter(currentCounter+1)
        // }
    };

    const previous = () => {
        sliderRef.current.slickPrev();
        // if (currentCounter === 1) {
        //     setCurrentCounter(photos.length)
        // } else if (currentCounter > 1) {
        //     setCurrentCounter(currentCounter-1)
        // }
    };

    const handleSlideChange = (currentSlide) => {
        setCurrentCounter(currentSlide);
    };
    const settings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        dotsClass: styles['banner-dots'],
        // waitForAnimate: true,
        beforeChange: (current, next) => handleSlideChange(next),
    };

    return (<div className={styles['banner']}>
        <Slider ref={sliderRef} {...settings}>
            {photos.map((photo, index) => {
                return (<>
                    <div className={styles['banner-image']} key={index}>
                        <img src={photo} alt={`photo[${index}]`}/>
                    </div>
                </>)
            })}
        </Slider>
        <div className={styles["banner-control"]}>
            <button className={`${styles['banner-button']} ${styles['banner-button--prev']}`} onClick={previous}>
                <BackIcon width={24} height={24} />
            </button>
            <div className={styles["banner-counter"]}>
                {String(currentCounter+1) + '/' + String(photos.length)}
            </div>
            <button className={`${styles['banner-button']} ${styles['banner-button--next']}`} onClick={next}>
                <ForwardIcon width={24} height={24} />
            </button>
        </div>
    </div>)
}
