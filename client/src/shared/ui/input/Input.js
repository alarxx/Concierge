import React, {useEffect, useState} from 'react';

import styles from './input.module.css'

import EyeOffIcon from '../../../assets/icons/visibility_off_FILL0_wght400_GRAD0_opsz48.svg';
import EyeIcon from '../../../assets/icons/visibility_FILL0_wght400_GRAD0_opsz48.svg'

export default function Input({
                                  placeHolder="Введите значение",
                                  onChange=f=>f,
                                  value="",
                                  name="_",
                                  type="text",
                                  required=false,
                              }){

    const [_type, setType] = useState(type);
    function handleToggle() {
        if (type === 'password') {
            _type === 'password' ? setType('text') : setType('password');
        }
    }

    return (
        <div className={styles['input-wrapper']}>
            <input
                className={styles.input}
                name={name}
                placeholder={placeHolder}
                type={_type}
                value={value}
                onChange={onChange}
                required={required}
            />
            {type === 'password' && <span className={styles['input-icon']} onClick={handleToggle}>{_type === 'password' ? <EyeIcon/> : <EyeOffIcon/>}</span>}
        </div>
    );
}

