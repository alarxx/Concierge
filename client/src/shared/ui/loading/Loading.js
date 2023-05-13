import React from "react";

import Block from "../ui/block/Block";
import Loader from "../ui/loader/Loader";
import Overlay from "../ui/overlay/Overlay";

export default function Loading(){
    return (<>
        <Overlay>
            <Block isAlignCenter={true}>
                <Loader color={'white'}/>
            </Block>
        </Overlay>
    </>);
}