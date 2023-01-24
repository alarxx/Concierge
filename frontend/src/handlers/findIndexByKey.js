/**
 * Копия findIndexById
 * find index of object by id
 * */
export default function findIndexByKey({array, key, id}) {
    return array.findIndex(obj => obj[key] === id);
}
