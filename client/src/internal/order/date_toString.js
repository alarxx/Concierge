import monthName from "../monthName";

export default function dateToSting(date){
    const _date = new Date(date);
    console.log("dateToForm", monthName(_date.getMonth()));
    return `${_date.getDate()} ${monthName(_date.getMonth()).substring(0, 3).toLowerCase()}`;
}