import dateToSting from "./date_toString";

export default function (check_in_date, check_out_date){
    return `${dateToSting(check_in_date)} - ${dateToSting(check_out_date)}`;
}