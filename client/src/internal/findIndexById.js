/**
 * find index of object by id
 * */
export default function findIndexById (array, id) {
    return array.findIndex(obj => obj.id == id);
}