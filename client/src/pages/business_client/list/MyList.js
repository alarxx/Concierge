import React from 'react';

import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import {FixedSizeList} from "react-window";

export default function MyList({
                    items,
                    isItemLoaded,
                    loadMoreItems,
                    itemCountLoader,
                    itemCountList,
                    notFound=false,

                    itemSize=290,

                    children
                }){

    if(notFound){
        return (<>
            <p>Not found</p>
        </>);
    }

    return (<>
        <InfiniteLoader
            isItemLoaded={isItemLoaded}
            loadMoreItems={loadMoreItems}
            itemCount={itemCountLoader}
        >
            {({onItemsRendered, ref}) => (<>
                <AutoSizer ref={ref}>
                    {({ height, width }) => (
                        <FixedSizeList
                            className={'List'}
                            width={width}
                            height={height}
                            itemCount={itemCountList}
                            itemSize={itemSize}
                            ref={ref}
                            onItemsRendered={onItemsRendered}
                        >
                            {children}
                        </FixedSizeList>
                    )}
                </AutoSizer>
            </>)}
        </InfiniteLoader>
    </>);
}