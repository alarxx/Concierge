export default function getCity(fullcity){
    const words = fullcity?.split(",", 2); // 'Казахстан, Астана'.split(",", 2);
    return words?.length === 2 ? words[1]: words;
}