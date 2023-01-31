/* fetch api теперь есть в node js */

// const key = 'df59ba06f38eee20a0ec';
// const email = 'alar.akilbekov99@gmail.com'

function log(...str){
    console.log("translate()", ...str);
}


/**
 * Переводит текст.
 * {
 *   responseData: { translatedText: 'Hello', match: 1 },
 *   quotaFinished: false,
 *   mtLangSupported: null,
 *   responseDetails: '',
 *   responseStatus: 200,
 *   responderId: null,
 *   exception_code: null,
 *   matches: [
 *     {
 *       id: '619254363',
 *       segment: 'Привет',
 *       translation: 'Hello',
 *       source: 'ru-RU',
 *       target: 'en-GB',
 *       quality: '74',
 *       reference: null,
 *       'usage-count': 2,
 *       subject: 'All',
 *       'created-by': 'MateCat',
 *       'last-updated-by': 'MateCat',
 *       'create-date': '2022-08-13 10:18:21',
 *       'last-update-date': '2022-08-13 10:18:21',
 *       match: 1
 *     },
 *     {
 *       id: '600056926',
 *       segment: 'Привет',
 *       translation: 'Hey',
 *       source: 'ru-RU',
 *       target: 'en-GB',
 *       quality: '74',
 *       reference: null,
 *       'usage-count': 3,
 *       subject: 'All',
 *       'created-by': 'MateCat',
 *       'last-updated-by': 'MateCat',
 *       'create-date': '2022-03-20 08:42:59',
 *       'last-update-date': '2022-03-20 08:42:59',
 *       match: 0.99
 *     }
 *   ]
 * }
 * */
async function translate(text, langpair){

    // url: `http://api.mymemory.translated.net/get?q=${text}&langpair=${langpair}&key=${key}&de=${email}`,

    try{
        const response = await fetch(`http://api.mymemory.translated.net/get?q=${text}&langpair=${langpair}`);
        if (!response.ok) {
            throw new Error(`Request failed with status code: ${response.status}`);
        }

        const data = await response.json();
        log(data);
        return data;
    }
    catch(e){
        log(e);
    }



    /*
    // Usage:
    const text = "Привет";
    const langpair = "ru|en";
    const translated = await tr(text, langpair).catch(e=>console.log("Fuck", e));
    console.log(translated);
    */
}

module.exports = translate;