const LOG_NEEDED = true;

module.exports = function(...str){
    if(LOG_NEEDED)
        console.log(...str);
}