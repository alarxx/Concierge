import monthName from "../monthName";

export default function dateToSting(date){
    const _date = new Date(date);
    // console.log("dateToForm", monthName(_date.getMonth()));
    const month = monthName(_date.getMonth()).substring(0, 3).toLowerCase();
    const __date = _date.getDate() ? _date.getDate() : '-';
    return `${__date} ${month}`;
}