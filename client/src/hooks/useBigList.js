import React, {useEffect, useMemo, useState} from 'react';
import Logger from "../internal/Logger";
import setIds from '../internal/setIds';

export default function useBigList(api, opts={}){
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
    function getUrl(skip, limit, _opts={}){
        return `${api}/?` + new URLSearchParams({
            skip,
            limit,
            sort:'createdAt',
            ..._opts,
        });
    }

    /**
     * Элементы, которые будут постепенно загружаться
     * */
    const [items, setItems] = useState({});

    const [requestCache, setRequestCache] = useState({});
    const [hasMore, setHasMore] = useState(true);

    // Нужно учитывать, что есть прошлый выбранный элемент
    // Лучшим решением будет хранить состояние листа где-то наверху, чтобы не терять состояние.
    // const [firstLoading, setFirstLoading] = useState(true);

    const [notFound, setNotFound] = useState(false);
    useEffect(()=>{
        logger.log(`Has more ${hasMore}. Not found ${Object.keys(items)}.`);
        if(!hasMore && Object.keys(items).length === 0){
            setNotFound(true);
            logger.log("Has not more. Not found.");
        }

    }, [hasMore])

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

        return await fetch(getUrl(startIndex, length, opts))
            .then(async response => {
                const json = await response.json();

                setIds(json);

                logger.log({ json }); // json = [{}, {}] array

                // Если вернулось меньше элементов, чем мы запросили, это значит, что больше элементов в БД нет
                if(!json.length || json.length < length){
                    setHasMore(false);
                }

                // [{}, {}] добавляем items-ы под индексом startIndex + индекс элемента в массиве который нам вернулся
                const add = {};

                json.forEach((hotel, index) => {
                    add[startIndex + index] = hotel;
                });
                setItems({ ...items, ...add });

            })
            .catch(logger.error)
    }

    // +Number.MAX_SAFE_INTEGER позволяет нам использовать максимально заданное число элементов(по ум. 30+-), которые можно загрузить за раз, если добавим 1 будет грузиться максимум 1 элемент */}
    const itemCountLoader = (() => Object.keys(items).length + (hasMore ? Number.MAX_SAFE_INTEGER : 0))();

    // +1 позволяет показать только один (loading...) элемент
    const itemCountList = (() => Object.keys(items).length + (hasMore ? 1 : 0))();

    return ({
        items,
        isItemLoaded,
        loadMoreItems,
        itemCountLoader,
        itemCountList,
        notFound,
    });
}