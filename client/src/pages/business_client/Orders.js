import React, { Fragment, useEffect } from 'react';
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

export default function Orders({}){

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => {
        console.log('onChangeeeeee', panel)
        panel === expanded ? setExpanded(false) : setExpanded(panel)
    };

    const Row = ({index, style}) => {
        const item = items[index];
        return (
            <div className='' style={style}>
                {item ? item : "Loading..." }
            </div>
        )
    };

    // skip - это стартовый индекс
    // limit - это сколько нужно итемов
    // js queryParam чекнуть
    const getUrl = (skip, limit) => `http://localhost:3000/api/hotel/pagination?skip=${skip}&limit=${limit}`

    const items = {};
    const requestCache = {};

    const isItemLoaded = ({index}) => !!items[index];

    const loadMoreItems = async (visibleStartIndex, visibleStopIndex) => {
        const key = [visibleStartIndex, visibleStopIndex].join(":");
        if (requestCache[key]) {
            return;
        }
        const length = visibleStopIndex - visibleStartIndex;
        const visibleRange = [...Array(length).keys()].map(
            x=> x+visibleStartIndex
        );
        const itemsRetrieved = visibleRange.every(index => !!items[index])

        if (itemsRetrieved) {
            requestCache[key] = key;
            return;
        }
        console.log(key)

        return await fetch(getUrl(visibleStartIndex, length))
            .then(response => response.json())
            .then(data => {
                console.log(data)
                data.records.forEach((hotel, index) => {
                    items[index+visibleStartIndex] = hotel;
                })
            })
            .catch(error => console.error("Error:", error))
    }

    return (
        <Fragment>
            <NavbarPanel title={'Заказы'} />
            <Box>
                <div className="section section-profile">
                    orders

                    <HotelCard title={'Hilton'} price={'от 50,000 KZT '} addInfo={'2 взрослых, 2 ночи'} />

                    <AutoSizer>
                        {({height, width}) => (
                            <InfiniteLoader
                                isItemLoaded={isItemLoaded}
                                loadMoreItems={loadMoreItems}
                                itemCount={1000}
                            >
                                {({onItemsRendered, ref}) => (
                                    <FixedSizeList
                                        className={'List'}
                                        width={width}
                                        height={height}
                                        itemCount={1000}
                                        itemSize={35}
                                        ref={ref}
                                        onItemsRendered={onItemsRendered}
                                    >
                                        {Row}
                                    </FixedSizeList>
                                )}
                            </InfiniteLoader>
                        )}
                    </AutoSizer>

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
        </Fragment>
    )
}