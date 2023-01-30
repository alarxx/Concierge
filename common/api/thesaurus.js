let fetch;

if (typeof window !== 'undefined') {
    fetch = window.fetch;
} else {
    fetch = require('node-fetch');
}

const key = 'J3G1Urb5+UAEM6Ula7N4zQ==GMz7yhxm89jJCAEk';

/** Возвращает массивы синонимов и антонимов.
 * {
 *   word: 'bright',
 *   synonyms: [
 *     'shining',     'smart',
 *     'hopeful',     'bright',
 *     'brilliantly', 'vivid',
 *     'promising',   'lustrous',
 *     'shiny',       'brilliant',
 *     'undimmed',    'brightly',
 *     'burnished'
 *   ],
 *   antonyms: [ 'dimmed', 'dull' ]
 * } */
async function thesaurus(word){
    try{
        const response = await fetch(`https://api.api-ninjas.com/v1/thesaurus?word=${word}`, {
            headers: {
                'X-Api-Key': key
            }
        })

        if (!response.ok) {
            throw new Error(`Request failed with status code: ${response.status}`);
        }

        const data = await response.json();

        return data;
    }
    catch(e){
        console.log(e);
    }

    /*
    // Usage:
    const word = "bright";
    const thesaurusData = await thesaurus(word);
    console.log(thesaurusData);
    */
}

module.exports = thesaurus;