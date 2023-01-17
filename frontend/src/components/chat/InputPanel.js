import React, {useState} from 'react'
import GalleryIcon from "../../icons/gallery.svg";
import SendIcon from "../../icons/send.svg";

export default function InputPanel({
                                         initInput="",
                                         onSend=console.log,
                                     }){

    const [input, setInput] = useState(initInput);

    function send( e ){
        onSend(input)
        setInput("")
    }

    return (
        <div className="chat__controlpanel">
            {/* <div class="chat-controls-attach">
                <div class="chat-controls-attach__close">
                    <!-- import close.svg --> 
                    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.75736 12.7573L13.2426 4.27204" stroke="#4D545C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13.2426 12.7573L4.75736 4.27197" stroke="#4D545C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="chat-controls-attach__title">
                    Выберите паттерн 
                </div>
                <div class="chat-controls-attach__actions">
                    <div class="btn btn-main btn-icon btn-attchinchat">
                        <span>Предложить услугу</span>  
                        <!-- import house.svg --> 
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 22H22" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2.94995 22L2.99995 9.96999C2.99995 9.35999 3.28995 8.78004 3.76995 8.40004L10.77 2.95003C11.49 2.39003 12.4999 2.39003 13.2299 2.95003L20.23 8.39003C20.72 8.77003 21 9.34999 21 9.96999V22" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linejoin="round"/>
                            <path d="M13 17H11C10.17 17 9.5 17.67 9.5 18.5V22H14.5V18.5C14.5 17.67 13.83 17 13 17Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linejoin="round"/>
                            <path d="M9.5 13.75H7.5C6.95 13.75 6.5 13.3 6.5 12.75V11.25C6.5 10.7 6.95 10.25 7.5 10.25H9.5C10.05 10.25 10.5 10.7 10.5 11.25V12.75C10.5 13.3 10.05 13.75 9.5 13.75Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linejoin="round"/>
                            <path d="M16.5 13.75H14.5C13.95 13.75 13.5 13.3 13.5 12.75V11.25C13.5 10.7 13.95 10.25 14.5 10.25H16.5C17.05 10.25 17.5 10.7 17.5 11.25V12.75C17.5 13.3 17.05 13.75 16.5 13.75Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linejoin="round"/>
                            <path d="M19.0001 7L18.9701 4H14.5701" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="btn btn-main btn-icon btn-attchinchat">
                        <span>Получить файлы</span>  
                        <!-- import personalcard.svg --> 
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 21H7C3 21 2 20 2 16V8C2 4 3 3 7 3H17C21 3 22 4 22 8V16C22 20 21 21 17 21Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14 8H19" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M15 12H19" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M17 16H19" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8.49994 11.2899C9.49958 11.2899 10.3099 10.4796 10.3099 9.47992C10.3099 8.48029 9.49958 7.66992 8.49994 7.66992C7.50031 7.66992 6.68994 8.48029 6.68994 9.47992C6.68994 10.4796 7.50031 11.2899 8.49994 11.2899Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 16.33C11.86 14.88 10.71 13.74 9.26 13.61C8.76 13.56 8.25 13.56 7.74 13.61C6.29 13.75 5.14 14.88 5 16.33" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="btn btn-main btn-icon btn-attchinchat">
                        <span>Отправить файл</span>  
                        <!-- import gallery.svg --> 
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2.67001 18.9501L7.60001 15.6401C8.39001 15.1101 9.53001 15.1701 10.24 15.7801L10.57 16.0701C11.35 16.7401 12.61 16.7401 13.39 16.0701L17.55 12.5001C18.33 11.8301 19.59 11.8301 20.37 12.5001L22 13.9001" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="btn btn-main btn-icon btn-attchinchat">
                        <span>Изменить данные</span>  
                        <!-- import house.svg --> 
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 22H22" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2.94995 22L2.99995 9.96999C2.99995 9.35999 3.28995 8.78004 3.76995 8.40004L10.77 2.95003C11.49 2.39003 12.4999 2.39003 13.2299 2.95003L20.23 8.39003C20.72 8.77003 21 9.34999 21 9.96999V22" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linejoin="round"/>
                            <path d="M13 17H11C10.17 17 9.5 17.67 9.5 18.5V22H14.5V18.5C14.5 17.67 13.83 17 13 17Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linejoin="round"/>
                            <path d="M9.5 13.75H7.5C6.95 13.75 6.5 13.3 6.5 12.75V11.25C6.5 10.7 6.95 10.25 7.5 10.25H9.5C10.05 10.25 10.5 10.7 10.5 11.25V12.75C10.5 13.3 10.05 13.75 9.5 13.75Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linejoin="round"/>
                            <path d="M16.5 13.75H14.5C13.95 13.75 13.5 13.3 13.5 12.75V11.25C13.5 10.7 13.95 10.25 14.5 10.25H16.5C17.05 10.25 17.5 10.7 17.5 11.25V12.75C17.5 13.3 17.05 13.75 16.5 13.75Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linejoin="round"/>
                            <path d="M19.0001 7L18.9701 4H14.5701" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="btn btn-main btn-icon btn-toarchive">
                        <span>Отправить в архив</span>  
                        <!-- import direct-normal.svg --> 
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2 13H5.76C6.52 13 7.21 13.43 7.55 14.11L8.44 15.9C9 17 10 17 10.24 17H13.77C14.53 17 15.22 16.57 15.56 15.89L16.45 14.1C16.79 13.42 17.48 12.99 18.24 12.99H21.98" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div> */}
            <div className="chat-controls-panel">
                <div className="chat-controls-panel__left attach">
                    <GalleryIcon />
                </div>
                <div className="chat-controls-panel__input">
                    <textarea
                        type="text"
                        className="chat__input"
                        placeholder="Введите сообщение"
                        rows="1"
                        value={input}
                        onChange={ e => setInput(e.target.value) }
                        onKeyDown={ e => {
                            if(e.key==='Enter')
                                send(e)
                        }}
                    ></textarea>
                </div>
                <div className="chat-controls-panel__right send" onClick={send}>
                    <SendIcon />
                </div>
            </div>

        </div>
    );
}