import React, {useMemo, useState} from 'react';
import Logger from "../internal/Logger";

export default function useBigList(api, sort='createdAt'){
    const logger = useMemo(()=>new Logger('useBigList'), []);

    /**
     * skip - это стартовый индекс
     * limit - это сколько нужно итемов
     * sort - поле по которому нужно сортировать (&sort=-createdAt), "-" в начале названия поля - это направление сортировки
     * js queryParam чекнуть, там можно в виде объекта вписывать параметры запроса
     * */
    /*function getUrl(skip, limit){
        return `${api}?skip=${skip}&limit=${limit}&sort=${sort}`;
    }*/
    function getUrl(skip, limit, opts={}){
        return `${api}/?` + new URLSearchParams({
            skip,
            limit,
            sort: 'createdAt',
            ...opts,
        });
    }

    /**
     * Элементы, которые будут постепенно загружаться
     * */
    const [items, setItems] = useState({});

    const [requestCache, setRequestCache] = useState({});
    const [hasMore, setHasMore] = useState(true);

    function isItemLoaded({index}){
        return Boolean(items[index]);
    }

    async function loadMoreItems(startIndex, stopIndex){
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

    const itemCountLoader = (() => hasMore ? Object.keys(items).length+100000 : Object.keys(items).length)();
    const itemCountList = (() => hasMore ? Object.keys(items).length + 1 : Object.keys(items).length)();

    return ({
        items,
        isItemLoaded,
        loadMoreItems,
        itemCountLoader,
        itemCountList,
    });
}