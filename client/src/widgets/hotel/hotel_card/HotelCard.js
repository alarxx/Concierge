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

    const photos = ['https://www.discoverlosangeles.com/sites/default/files/business/hilton-pasadena/h_2000-crm-la-1-hilton-pasadena_port-cochure-e454ef6c5056a36_e454f09a-5056-a36f-233cbb308efaf59d.jpg','https://avatars.mds.yandex.net/get-altay/998237/2a00000161e27a91e164a409a740f64aced7/XXL','https://venturesafrica.com/wp-content/uploads/2018/10/153050202-1-1024x661.jpg','https://www.theartofbusinesstravel.com/wp-content/uploads/2017/04/92275707.jpg','https://salon.ru/storage/thumbs/gallery/179/178992/5000_5000_s763.jpg','https://images.acase.ru/acase_images/1310763/204783592_P.jpg','https://archinect.imgix.net/uploads/9d/9ddc50df6e0ced48dc1b06785a946531.jpg?fit=crop&amp;auto=compress%2Cformat&amp;w=1200','https://images.acase.ru/acase_images/1310763/204733943_P.jpg'];

    return(<>
        <CardService onClick={onClick}>
            <CardServiceHeader>
                {stars > 0 && <Stars stars={stars}/>}
                {title}
            </CardServiceHeader>
            <CardServiceBody>
                <SliderNew photos={photos} />
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