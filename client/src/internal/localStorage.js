export function loadJSON(key){
    return key && JSON.parse(localStorage.getItem(key));
}

export function saveJSON(key, data){
    return localStorage.setItem(key, JSON.stringify(data));
}

export function removeJSON(key){
    return localStorage.removeItem(key);
}