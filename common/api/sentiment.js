
/* fetch api теперь есть в node js */

const key = 'J3G1Urb5+UAEM6Ula7N4zQ==GMz7yhxm89jJCAEk';

function log(...str){
    console.log("sentiment()", ...str);
}

/** Возвращает настроение текста.
 * {
 *      score: 0.622,
 *      text: "I'm loving it!",
 *      sentiment: 'POSITIVE'
 * }
 * */
module.exports = async function sentiment(text){
    log(text);
    try{
        const response = await fetch(`https://api.api-ninjas.com/v1/sentiment?text=${text}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': key,
            }
        })

        if (!response.ok) {
            throw new Error(`Request failed with status code: ${response.status}`);
        }

        const data = await response.json();

        return data;
    }
    catch(e){
        log(e);
    }

    /*
    // Usage:
    const text = "I'm loving it!";
    const sentimentData = await sentiment(text);
    console.log(sentimentData);
    */
}
