import React, {useEffect, useState} from 'react';

import styles from './gallery.module.css';

import Slider from "../../slider/Slider";

export default function Gallery({images=[], height}){

    const style = {
        height: height,
    }

    const [items, setItems] = useState([]);

    useEffect(()=>{
        if(!images || images.length===0){return;}
        setItems(images.map((image, index) => ({
            title: `image ${index}`,
            url: image
        })));
    }, [images])

    return (
        <div className={styles.gallery} style={style}>
            <Slider items={items}/>
        </div>
    );
}

