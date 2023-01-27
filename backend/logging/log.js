const LOG_NEEDED = process.env;

module.exports = function(...str){
    if(LOG_NEEDED)
        console.log(...str);
}