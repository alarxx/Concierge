/**
 * обход объекта и обход его внутренних объектов.
 * Если это массив, он все равно будет проходить каждый элемент (ключ - это индекс)
 * */
function objectsTraversal(obj, f){
    f(obj);

    for(const key in obj){
        if(typeof obj[key] === 'object'){ // null это видимо тоже объект
            // console.log(`setIds: objectsTraversal by key ${key}:`, obj)
            objectsTraversal(obj[key], f)
        }
    }
}

function renameId(obj){
    // console.log(`setIds: renameId:`, obj, (!obj ? 'OBJECT IS NULL' : ''))
    if(obj?._id) {
        obj.id = obj._id;
        // delete obj._id;
    }
}

/**
 * Меняем объект! Не чистая функция, создавать клон, пока не вижу смысла.
 * Создать глубокий клон можно вот так JSON.parse(JSON.stringify(obj))
 * */
export default function setIds(obj){
    // console.log("setIds:", {obj})
    objectsTraversal(obj, renameId)
    return obj;
}


/*
//Проверка
const arr = [
    {_id: 1},
    "a", "b", "c",
    {d: {_id: 2}}
]
objectsTraversal(arr, console.log)
*/