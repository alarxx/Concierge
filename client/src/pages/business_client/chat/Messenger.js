import React, {useEffect, useMemo, useState} from 'react';

import NavbarPanel from '../../../widgets/navbar_panel/NavbarPanel';
import Box from '../../../shared/ui/box/Box'
import NavigationPanel from '../../../widgets/navigation_panel/NavigationPanel';
import Button from "../../../shared/ui/button/Button";
import Input from "../../../shared/ui/input/Input";
import ChatItemCard from "../../../widgets/chat/chat_item_card/ChatItemCard";
import ChatInputForm from "../../../features/chat/chat_input_form/ChatInputForm";
import DayInChat from "../../../features/chat/day_in_chat/DayInChat";
import ChatMessage from "../../../features/chat/chat_message/ChatMessage";
import Container from "../../../shared/ui/box/Container";

import BackIcon from "../../../assets/icons/backbtn_icon.svg";
import NavbarLeft from "../../../shared/ui/navbar/NavbarLeft";
import Logger from "../../../internal/Logger";

function getUrl(skip, limit){
    return `/api/hotel/room/pagination/?` + new URLSearchParams({
        skip,
        limit,
        sort: 'createdAt',
    });
}
export default function Messanger({}){

    // Логгер просто будет прописывать из какого модуля вызван лог
    // Плюс в production logger не будет выводить в консоль ничего.
    const logger = useMemo(()=>new Logger('HotelRoomsList'), []);


    const [items, setItems] = useState([]);

    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = async (__skip) => {
        logger.log("__skip:", __skip);

        const limit = 5;

        logger.log(getUrl(skip, limit));


        const response = await fetch(getUrl(skip, limit));

        const data = await response.json();

        // console.log(data); // Logging the data to the console
        // Do something with the data
        if (data.length < limit) {
            setHasMore(false);
        }
        logger.log('isLoadMore',hasMore);

        setItems(() => [
            ...data.reverse(),
            ...items
        ]);

        logger.log(items);

        setSkip(skip + limit);
    };

    return (
        <>
            <NavbarPanel
                LeftButton={<NavbarLeft Icon={<BackIcon />} onClick={e => back()} />}
                title={'Чат Single'}
            />
            <Box navbar={true} menu={true}>
                <Container>
                    {/*<div className={styles.hotel__list} style={{ height: "100%", overflow: 'auto' }}>*/}
                    {/*    <InfiniteScroll*/}
                    {/*        pageStart={0}*/}
                    {/*        loadMore={loadMore}*/}
                    {/*        hasMore={hasMore}*/}
                    {/*        loader={*/}
                    {/*            <div className="loader" key={0}>*/}
                    {/*                Loading ...*/}
                    {/*            </div>*/}
                    {/*        }*/}
                    {/*        isReverse={true}*/}
                    {/*        useWindow={false}*/}
                    {/*    >*/}
                    {/*        {items.map((item, i) => (*/}
                    {/*            <HotelCard key={i} title={item.name} price={'от 50,000 KZT '} addInfo={'2 взрослых, 2 ночи'} onClick={e => onRoomClick(item)} />*/}
                    {/*        ))}*/}
                    {/*    </InfiniteScroll>*/}
                    {/*</div>*/}
                    <DayInChat date={new Date().getDate()}/>
                    <ChatMessage message={'Информация о вашем заказе всегда доступна в информационной кнопке в шапке чата и на странице ваших заказов'}/>
                    <ChatMessage message={'Меня зовут Аксауле. Я  ваш менеджер-консультант. Я помогу вам разобраться во всем и с легкостью составлю вам бронь'}/>
                    <ChatMessage message={'Есть ли у вас дополнительные пожелания или вопросы? '}/>
                </Container>
            </Box>
            <ChatInputForm />
            {/*<NavigationPanel />*/}
        </>
    )
}