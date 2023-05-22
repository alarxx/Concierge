import React, {useEffect, useMemo, useRef, useState} from "react";

import styles from './uploader.module.css';
import Button from "./components/Button";
import Preview from "./components/Preview";
import Logger from "../../internal/Logger";

export default function Uploader({setSelectedFiles=f=>f, isMultiple=true, accept=['.png','.jpg', '.jpeg']}) {

    const logger = useMemo(()=>new Logger('Uploader'), []);

    const [filePreviews, setFilePreviews] = useState([]);
    const [uploadProgress, setUploadProgress] = useState([]);

    function handleFileChange(event){
        if (!event.target.files.length) {
            return
        }
        const files = event.target.files;
        const selectedFilesArray = Array.from(files); // Convert FileList to an array
        setSelectedFiles(selectedFilesArray);

        // set previews for files
        const filePreviewsArray = [];

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = (e) => {
                filePreviewsArray.push({
                    file: files[i],
                    preview: e.target.result,
                });
                if (filePreviewsArray.length === files.length) {
                    setFilePreviews(filePreviewsArray);
                }
            };
            reader.readAsDataURL(files[i]);
        }
    }

    function handleRemovePreview(index){
        // if (!event.target.dataset.name) {
        //     return
        // }
        //
        // const {name} = event.target.dataset
        //
        // let files = files.filter(file => file.name !== name)
        const updatedPreviews = [...filePreviews];
        updatedPreviews.splice(index, 1);
        setFilePreviews(updatedPreviews);
        // setTimeout(() => block.remove(), 300)
    }


   /* // загрузка массива файлов
    async function handleSubmit(event){
        event.preventDefault();

        const formData = new FormData();
        formData.append('postId', id);


        selectedFiles.forEach((file, index) => {
            formData.append(`files[${index}]`, file);

            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    const progress = Math.round((event.loaded / event.total) * 100);
                    setUploadProgress((prevProgress) => {
                        const updatedProgress = [...prevProgress];
                        updatedProgress[index] = progress;
                        return updatedProgress;
                    });
                }
            });

            // ЛОГИКА ЗАГРУЗКИ В БЭКЕНД
            xhr.open('POST', '/api/upload');
            xhr.onload = () => {
                if (xhr.status === 200) {
                    console.log('Files uploaded successfully!');
                    // Perform any additional actions upon successful upload
                } else {
                    console.error('File upload failed.');
                }
            };

            xhr.send(formData);
        });
    }*/

    /*
    // загрузка одного файла
    function handleSubmitSingle(event) {
        event.preventDefault();

        if (selectedFiles) {
            const selectedImage = selectedFiles[0]
            const formData = new FormData();

            // нужно айдишник отеля присваивать, но при создании отеля айдишник не существует
            // formData.append('hotel', id);
            formData.append('type', 'image');
            formData.append('image', selectedImage);

            logger.log('SINGLE FILE',selectedImage);

            // api загрузки файлов
            fetch('/api/file/', {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    logger.log('Image response', response);
                    // Handle server response
                })
                .catch(error => {
                    // Handle upload error
                    logger.log('Image error', error);
                });

        }
    }*/

    const fileInputRef = useRef(null);
    function handleButtonClick(){
        fileInputRef.current.click();
    }


    return(
        <div className={styles['uploader']}>
            <form>

                <input type={'file'} name={'file'} multiple={isMultiple} accept={accept.join(',')} onChange={handleFileChange} ref={fileInputRef} />

                <div className={styles['uploader-previews']}>
                    {filePreviews.map((preview, index) => (
                        <Preview preview={preview} index={index} onClick={handleRemovePreview} uploadProgress={uploadProgress} />
                    ))}
                </div>

                <Button type={'button'} onClick={handleButtonClick}>Выбрать изображения</Button>

                {/*{(selectedFiles && selectedFiles.length > 0) && <Button type={'submit'} onClick={handleSubmit}>Загрузить</Button>}*/}

            </form>
        </div>
    )
}