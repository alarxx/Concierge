import React, {useEffect, useState} from 'react'
import Card from "../../../shared/ui/card/Card";
import CardServiceHeader from "../../../shared/ui/card_service/CardServiceHeader";
import CardServiceBody from "../../../shared/ui/card_service/CardServiceBody";
import CardServiceFooter from "../../../shared/ui/card_service/CardServiceFooter";
import Typography from "../../../shared/ui/typography/Typography";
import GroupFlex from "../../../shared/ui/group_flex/GroupFlex";
import ButtonLike from "../../../shared/ui/button_like/ButtonLike";
import CardService from "../../../shared/ui/card_service/CardService";
import Gallery from "../../../shared/ui/gallery/Gallery";
import Stars from "../../../shared/ui/stars/Stars";
import SliderNew from "../../../shared/slider_new/SliderNew";


export default function HotelCard({title='', stars=0, price='', addInfo='', images=[], onClick=f=>f}) {

    return(<>
        <CardService onClick={onClick}>
            <CardServiceHeader>
                {stars > 0 && <Stars stars={stars}/>}
                {title}
            </CardServiceHeader>
            <CardServiceBody>
                <SliderNew photos={['/file/646b038f1b08015b5e5ba2b6']} />
                {/*<Gallery images={images.map(id=>`/file/${id}`)} height={160} />*/}
            </CardServiceBody>
            <CardServiceFooter>
                <GroupFlex>
                    {/*<div>
                        <div><Typography size={16} weight={700} bottom={4}>{price}</Typography></div>
                        <div><Typography size={12} weight={500}>{addInfo}</Typography></div>
                    </div>
                    <ButtonLike />
                    */}
                </GroupFlex>
            </CardServiceFooter>
        </CardService>
    </>)
}