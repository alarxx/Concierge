import React, {useEffect, useMemo} from "react";

import {useNavigate} from "react-router-dom";

import BackIcon from "../../../../assets/icons/backbtn_icon.svg";

import NavbarPanel from "../../../../widgets/navbar_panel/NavbarPanel";
import BottomControl from "../../../../shared/ui/bottom_control/BottomControl";
import Button from "../../../../shared/ui/button/Button";
import NavigationPanel from "../../../../widgets/navigation_panel/NavigationPanel";
import Box from "../../../../shared/ui/box/Box";
import Gallery from "../../../../shared/ui/gallery/Gallery";
import GalleryNew from "../../../../shared/gallery/Gallery";
import HotelGeo from "../../../../widgets/hotel/hotel_geo/HotelGeo";
import HotelChoiceRoom from "../../../../widgets/hotel/hotel_choice_room/HotelChoiceRoom";
import HotelPolitics from "../../../../widgets/hotel/hotel_politics/HotelPolitics";
import HotelDetails from "../../../../widgets/hotel/hotel_details/HotelDetails";
import NavbarLeft from "../../../../shared/ui/navbar/NavbarLeft";
import useBigList from "../../../../hooks/useBigList";
import Logger from "../../../../internal/Logger";
import Container from "../../../../shared/ui/box/Container";
import GalleryThumbColumn from "../../../../shared/gallery/GalleryThumbColumn";
import GalleryThumb from "../../../../shared/gallery/GalleryThumb";
import {useAppContext} from "../../../../context/AppContext";
import SliderNew from "../../../../shared/slider_new/SliderNew";

function getUrl(skip, limit, filter={}){
    return `/api/hotel/room/pagination/?` + new URLSearchParams({
        skip,
        limit,
        sort: 'createdAt',
        ...filter,
    });
}

export default function HotelSingle({ data={}, next=f=>f, back=f=>f, }) {
    const logger = useMemo(() => new Logger('HotelSingle'), []);

    const { adaptiveHandler } = useAppContext();
    const { device } = adaptiveHandler;
    const { hotel } = data;
    const rooms = hotel['hotel/rooms'];

    const images = ['/file/646b038f1b08015b5e5ba2b6','/file/646b038f1b08015b5e5ba2b6','/file/646b038f1b08015b5e5ba2b6','/file/646b038f1b08015b5e5ba2b6','/file/646b038f1b08015b5e5ba2b6','/file/646b038f1b08015b5e5ba2b6','/file/646b038f1b08015b5e5ba2b6','/file/646b038f1b08015b5e5ba2b6','/file/646b038f1b08015b5e5ba2b6','/file/646b038f1b08015b5e5ba2b6','/file/646b038f1b08015b5e5ba2b6','/file/646b038f1b08015b5e5ba2b6']
    // Разделение массива на группы по два элемента
    const groupedImages = [];
    for (let i = 1; i < images.length; i += 2) {
        groupedImages.push(images.slice(i, i + 2));
    }
    useEffect(() => {
        console.log(hotel.images.map(id=>`/file/${id}`))
    })

    return(<>
        <NavbarPanel
            LeftButton={<NavbarLeft Icon={<BackIcon />} onClick={e => back()} />}
            title={'Отель'}
        />

        <Box navbar={true} menu={true} yummy={true}>
            <Container>
                {device === 'mobile'
                    ? <SliderNew photos={images} />
                    : <GalleryNew>
                            <GalleryThumb isBig={true}>
                                <img src={images[0]} alt="images[0]"/>
                            </GalleryThumb>
                            {groupedImages.map((groupedImage, index) => {
                                return (<>
                                    <GalleryThumbColumn>
                                        {groupedImage.map((image, index) => {
                                            return (<GalleryThumb>
                                                <img src={image} alt={`image[${index}`}/>
                                            </GalleryThumb>)
                                        })}
                                    </GalleryThumbColumn>
                                </>)
                            })}
                        </GalleryNew>
                }
                {/*<Gallery images={hotel.images.map(id=>`/file/${id}`)} height={240} />*/}


                <HotelGeo />
                {/*<HotelChoiceRoom />*/}
                <HotelPolitics hotel={hotel} />
                <HotelDetails hotel={hotel} />
            </Container>
        </Box>

        <BottomControl>
            <Button variant={'control'} onClick={e => next()}>Выбрать отель</Button>
        </BottomControl>

        <NavigationPanel />
    </>)
}