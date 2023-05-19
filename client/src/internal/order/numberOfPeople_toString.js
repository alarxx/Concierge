export default function numberOfPeople_toString(number_of_adults, number_of_children){
    const adults_str = `${number_of_adults} ${number_of_adults > 1 ? 'взрослых' : 'взрослый'}`;
    const children_str = number_of_children !== 0 ? `, ${number_of_children} ${number_of_children > 1 ? 'детей' : 'ребенок'}`:'';
    return `${adults_str}${children_str}`;
}