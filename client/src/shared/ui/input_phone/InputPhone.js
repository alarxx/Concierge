import React from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import styles from './inputPhone.module.css'
export default function InputPhone({value='', onChange=f=>f}) {

    return (<>
        <PhoneInput
            inputProps={{
                name: 'phone',
                required: true,
                autoFocus: true,
            }}
            country={'kz'}
            onlyCountries={['kz', 'ru']}
            preferredCountries={['kz', 'ru']}
            // priority={{kz: 0, ru: 1}}
            countryCodeEditable={false}
            areaCodes={{kz: ['700', '701', '702', '705', '706', '707', '708', '747', '760', '761', '762', '763', '764', '771', '775', '776', '777', '778', '785']}}
            masks={{kz: '... ...-..-..', ru: '... ...-..-..'}}
            value={value}
            onChange={onChange}
            inputClass={styles.inputClass}
            containerClass={styles.containerClass}
            buttonClass={styles.buttonClass}
            // isValid={(inputNumber, onlyCountries) => {
            //     return onlyCountries.some((country) => {
            //         return startsWith(inputNumber, country.dialCode) || startsWith(country.dialCode, inputNumber);
            //     });
            // }}
        />
    </>)
}