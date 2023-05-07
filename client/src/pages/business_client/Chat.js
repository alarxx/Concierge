import React, {Fragment, useEffect, useState} from 'react';

import NavbarPanel from '../../widgets/navbar_panel/NavbarPanel';
import Box from '../../shared/ui/box/Box'
import NavigationPanel from '../../widgets/navigation_panel/NavigationPanel';
import Button from "../../shared/ui/button/Button";
import Input from "../../shared/ui/input/Input";
// import MapModal from "../../components/map/Map";

export default function Chat({}){

    const [orderJson, setOrderJson] = useState({
        bookings: [
            {
                attachments: null,
            },
            {
                attachments: null,
            },
        ]
    })
    // const [selectedFiles, setSelectedFiles] = useState([]);

    // const handleFileChange = (event) => {
    //     setSelectedFiles([...event.target.files]);
    // };

    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        console.log("effect file",selectedFile)
    }, [selectedFile])
    const handleFileChange = (event) => {
        console.log(event.target.files[0])
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // if (event.target.files && event.target.files.length > 0) {
        //     const file = event.target.files[0];

        // }

        const formData = new FormData();
        setOrderJson({
            bookings: [
                {
                    attachments: selectedFile,
                },
                {
                    attachments: null,
                },
            ]
        })
        console.log('ORDER', orderJson)
        // formData.bookings.append('Alarfiles', selectedFile);

        // selectedFiles.forEach((file) => {
        //     formData.append('files[]', file);
        // });

        // Отправка formData на бэкенд
        // Например, с использованием fetch или axios
        fetch('/test', {
          method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderJson)
        })
          .then(response => {
              console.log(response)
            // Обработка ответа от бэкенда
          })
          .catch(error => {
            // Обработка ошибки
          });
    };


    return (
        <Fragment>
            <NavbarPanel title={'Чат'}/>
                <Box>
                    <div className="section section-profile">
                        <form onSubmit={handleSubmit}>
                            {selectedFile && <p>Selected File: {selectedFile.name}</p>}
                            <Input type="file" onChange={handleFileChange} />
                            <Button type={'submit'}></Button>
                        </form>
                    </div>
                </Box>
            <NavigationPanel />
        </Fragment>
    )
}