export default function getCity(country_comma_city){
    const words = country_comma_city?.split(",", 2); // 'Казахстан, Астана'.split(",", 2);
    return words?.length === 2 ? words[1]: words;
}