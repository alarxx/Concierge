/** Чистая функция.
 * Если элемент в массиве, удаляет его,
 * если элемента нет, то добавляет его
 * */
export default function toggleArrayElement(arr, element){
    const new_arr = [...arr]
    const i = new_arr.indexOf(element)
    if(i !== -1){ // Если найден
        new_arr.splice(i, 1)
    }
    else { // Если не найден
        new_arr.push(element)
    }
    return new_arr
}


