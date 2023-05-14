import React, {useState} from "react";

export default function useToggle(init=false) {

    const [isActive, setIsActive] = useState(init);
    function onToggle() {
        setIsActive(!isActive);
    }

    return [isActive, onToggle];
}