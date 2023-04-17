import Logger from "./Logger";

const logger = new Logger('fetchJSON');

export default async function fetchJSON(url, opt={}) {
    if (opt.body && typeof opt.body !== 'string') {
        opt.body = JSON.stringify(opt.body);
    }

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        ...opt
    });

    logger.log(response);

    try{
        const json = await response.json();
        return ({...json, status: response.status});
    }
    catch (e){
        return ({message: response.statusText, status: response.status});
    }

}