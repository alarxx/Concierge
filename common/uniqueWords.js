module.exports = function uniqueWords(words) {
    const seen = {};
    const unique = [];
    let j = 0;
    for(let i = 0; i < words.length; i++) {
        let item = words[i];
        if(seen[item] !== 1) {
            seen[item] = 1;
            unique[j++] = item;
        }
    }
    return unique;
}