import React from 'react';

import styles from "../../assets/css/styles.css"
import inputStyles from "../../assets/css/input.css"

export default function Input(){

    return (
        <input name="password" type="password" className="input" placeholder="Input your password" required />
    );
}

