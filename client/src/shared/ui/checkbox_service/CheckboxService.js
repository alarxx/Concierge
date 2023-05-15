import React from "react";

import styles from './checkboxService.module.css'


// TO DO: сделать режим фокусировки при нажатии TAB

// $(window).keyup(function(e){
//     var target = $('.checkbox-btn input:focus');
//     if (e.keyCode == 9 && $(target).length){
//         $(target).parent().addClass('focused');
//     }
// });
//
// $('.checkbox-btn input').focusout(function(){
//     $(this).parent().removeClass('focused');
// });

export default function CheckboxService({
    Icon,
    title='',
    description='',
    name='_',
    onChange=f=>f,
    value,
    required=false,
    bottom,
    isChecked,

}) {

    const style = {
        marginBottom: bottom,
    }

    return(<>
        <label className={styles['CheckboxService-label']}>

            <input
                name={name}
                value={value}
                type="checkbox"
                onChange={onChange}
                required={required}
                checked={isChecked}
            />

            <div className={styles['CheckboxService']} style={style}>
                <div className={styles['CheckboxService__icon']}>
                    {Icon}
                </div>

                <div className={styles['CheckboxService__info']}>

                    <div className={styles['CheckboxService__title']}>{title}</div>
                    { description !== '' &&
                        <div className={styles['CheckboxService__description']}>{description}</div>
                    }

                </div>
            </div>
        </label>
    </>)
}



// function FocusStyleExample() {
//     const divRef = useRef(null);
//     const inputRef = useRef(null);
//
//     const handleInputFocus = () => {
//         if (inputRef.current.value === '') {
//             divRef.current.classList.add('focused');
//         }
//     };
//
//     const handleInputBlur = () => {
//         divRef.current.classList.remove('focused');
//     };
//
//     return (
//         <div>
//             <div ref={divRef} className="container">
//                 <input
//                     ref={inputRef}
//                     type="text"
//                     onFocus={handleInputFocus}
//                     onBlur={handleInputBlur}
//                 />
//             </div>
//         </div>
//     );
// }
// STYLE CSS
// .container {
//     border: 1px solid #ccc;
//     padding: 10px;
//     transition: box-shadow 0.3s ease-in-out;
// }
//
// .focused {
//     box-shadow: 0 0 5px 2px rgba(0, 0, 255, 0.5);
// }