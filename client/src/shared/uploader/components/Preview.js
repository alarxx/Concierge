import React from "react";

import styles from './preview.module.css';

export default function Preview({src, file, onClick, preview, index, uploadProgress, isUploading}) {

    return (<>
        <div className={styles["preview-image"]} key={index}>
            {(uploadProgress[index] !== 100) && <div className={styles["preview-remove"]} onClick={() => onClick(index)}>&times;</div>}

            <img src={preview.preview} alt={`Preview ${index}`} />

            <div className={styles["preview-info"]}>
                {uploadProgress[index] && (
                    <div className={styles["preview-info-progress"]}>
                        {`${uploadProgress[index]}% Uploaded`}
                    </div>
                )}

                {/*<span>{file.name}</span>*/}
                {/*{bytesToSize(file.size)}*/}
            </div>
        </div>
    </>)
}