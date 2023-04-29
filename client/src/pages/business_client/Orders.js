import React, {useEffect, useMemo, useState} from 'react';
import {FixedSizeList} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";

import NavbarPanel from '../../widgets/navbar_panel/NavbarPanel';
import Box from '../../shared/ui/box/Box'
import NavigationPanel from '../../widgets/navigation_panel/NavigationPanel';

import Accordion from '../../shared/ui/accordion/Accordion'
import AccordionSummary from '../../shared/ui/accordion/AccordionSummary'
import AccordionDetails from '../../shared/ui/accordion/AccordionDetails'
import Card from '../../shared/ui/card/Card';
import CardBody from '../../shared/ui/card/CardBody';
import GroupFlex from '../../shared/ui/group_flex/GroupFlex'
import EmployeeInfo from '../../entities/employee/employee_info/EmployeeInfo'

import TriangleIcon from '../../assets/icons/drop-down-info.svg';
import BottomControl from "../../shared/ui/bottom_control/BottomControl";
import Button from "../../shared/ui/button/Button";
import HotelCard from "../../widgets/hotel_card/HotelCard";
import Configurator from "../../widgets/configurator/Configurator";
import Logger from "../../internal/Logger";

function getUrl(skip, limit){
    // skip - это стартовый индекс
    // limit - это сколько нужно итемов
    // sort - поле по которому нужно сортировать (&sort=-createdAt), "-" в начале названия поля - это направление сортировки
    // js queryParam чекнуть, там можно в виде объекта вписывать параметры запроса
    return `/api/hotel/pagination?skip=${skip}&limit=${limit}&sort=createdAt`;
}
export default function Orders({}){
    // Логгер просто будет прописывать из какого модуля вызван лог
    // Плюс в production logger не будет выводить в консоль ничего.
    const logger = useMemo(()=>new Logger('Orders'), []);

    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => {
        logger.log('onChangeeeeee', panel)
        panel === expanded ? setExpanded(false) : setExpanded(panel)
    };

    const [items, setItems] = useState({});
    const [requestCache, setRequestCache] = useState({});
    const [hasMore, setHasMore] = useState(true);

    const isItemLoaded = ({index}) => Boolean(items[index]);

    const loadMoreItems = async (startIndex, stopIndex) => {
        // key - запрос элементов от и до, в виде ключа from:to
        const key = [startIndex, stopIndex].join(":");

        if (requestCache[key]) {
            logger.log("retrieve already been -", key);
            return;
        }

        const length = stopIndex - startIndex;

        // Проверяем что каждый индекс есть в кэше items
        const itemsRetrieved = [...Array(length).keys()] // [0, 1, 2, 3,..., length]
            .map(x => x + startIndex) // [o+startIndex, 1+startIndex, 2+startIndex, 3+startIndex, ..., length + startIndex], где stopIndex = length + startIndex
            .every(index => Boolean(items[index]))

        if (itemsRetrieved) {
            logger.log("retrieved are already there -", key);
            return;
        }
        // requestCache[key] = key;
        setRequestCache({...requestCache, key});

        return await fetch(getUrl(startIndex, length))
            .then(async response => {
                const json = await response.json();


                logger.log({json}); // json = [{}, {}] array

                // Если вернулось меньше элементов, чем мы запросили, это значит, что больше элементов в БД нет
                if(json.length < length){
                    setHasMore(false);
                }

                // [{}, {}] добавляем items-ы под индексом startIndex + индекс элемента в массиве который нам вернулся
                const add = {};
                json.forEach((hotel, index) => {
                    add[startIndex + index] = hotel;
                });
                setItems({...items, ...add});

            })
            .catch(logger.error)
    }


    return (<>
        <NavbarPanel title={'Заказы'} />
        <Box>
            <div className="section section-profile">
                orders


                {/*<AutoSizer>*/}
                {/*    {({height, width}) => (*/}

                        {/* +100000 позволяет нам использовать максимально заданное число элементов(по ум. 30+-), которые можно загрузить за раз, если добавим 1 будет грузиться 1 элемент */}
                        <InfiniteLoader
                            isItemLoaded={isItemLoaded}
                            loadMoreItems={loadMoreItems}
                            itemCount={hasMore ? Object.keys(items).length+100000 : Object.keys(items).length}
                        >
                            {({onItemsRendered, ref}) => {
                                {/* +1 позволяет нам показывать loading элемент, если добавим 2 будут 2 loading элемента, что нам не нужно */}
                                return (<>
                                    <FixedSizeList
                                        className={'List'}
                                        width={1000}
                                        height={600}
                                        itemCount={hasMore ? Object.keys(items).length + 1 : Object.keys(items).length}
                                        itemSize={290}
                                        ref={ref}
                                        onItemsRendered={onItemsRendered}
                                    >
                                        {({index, style}) => {
                                            const item = items[index];
                                            // logger.log(index, item)
                                            return (<div style={style}>
                                                {item
                                                    ? <HotelCard title={item.name} price={'от 50,000 KZT '} addInfo={'2 взрослых, 2 ночи'} />
                                                    : <p>"Loading..."</p> }
                                            </div>);
                                        }}
                                    </FixedSizeList>
                                </>);
                            }}
                        </InfiniteLoader>
                    {/*)}*/}
                {/*</AutoSizer>*/}

                {/*<Accordion expanded={expanded === 'panel1'}>*/}
                {/*    <AccordionSummary onClick={() => handleChange('panel1')} >*/}
                {/*        <Card variant='info'>*/}
                {/*            <CardBody>*/}
                {/*                <GroupFlex align='aic' justify='jcsb'>*/}
                {/*                    AccordionSummary11111*/}
                {/*                    <TriangleIcon/>*/}
                {/*                </GroupFlex>*/}
                {/*            </CardBody>*/}
                {/*        </Card>*/}
                {/*    </AccordionSummary>*/}
                {/*    <AccordionDetails>*/}
                {/*        <Card variant='info'>*/}
                {/*            <CardBody>*/}
                {/*                <EmployeeInfo />*/}
                {/*            </CardBody>*/}
                {/*        </Card>*/}
                {/*    </AccordionDetails>*/}
                {/*</Accordion>*/}
                {/*<Accordion expanded={expanded === 'panel12'}>*/}
                {/*    <AccordionSummary onClick={() => handleChange('panel12')} >*/}
                {/*        <Card variant='info'>*/}
                {/*            <CardBody>*/}
                {/*                <GroupFlex align='aic' justify='jcsb'>*/}
                {/*                    Командировка #000421*/}
                {/*                    <TriangleIcon/>*/}
                {/*                </GroupFlex>*/}
                {/*            </CardBody>*/}
                {/*        </Card>*/}
                {/*    </AccordionSummary>*/}
                {/*    <AccordionDetails>*/}
                {/*        <Configurator />*/}
                {/*    </AccordionDetails>*/}
                {/*</Accordion>*/}

                {/*<Accordion expanded={expanded === 'panel13'} >*/}
                {/*    <AccordionSummary onClick={() => handleChange('panel13')} >*/}
                {/*        <Card variant='info'>*/}
                {/*            <CardBody>*/}
                {/*                <GroupFlex align='aic' justify='jcsb'>*/}
                {/*                    AccordionSummary11111*/}
                {/*                    <TriangleIcon/>*/}
                {/*                </GroupFlex>*/}
                {/*            </CardBody>*/}
                {/*        </Card>*/}
                {/*    </AccordionSummary>*/}
                {/*    <AccordionDetails>*/}
                {/*        <Card variant='info'>*/}
                {/*            <CardBody>*/}
                {/*                AccordionDetails1111*/}
                {/*            </CardBody>*/}
                {/*        </Card>*/}
                {/*    </AccordionDetails>*/}
                {/*</Accordion>*/}

            </div>
        </Box>
        <BottomControl>
            <Button variant={'control'} size={'big'} onClick={f=>f}>Заказать услугу</Button>
        </BottomControl>
        <NavigationPanel />
    </>)
}