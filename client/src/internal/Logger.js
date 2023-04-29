export default class Logger {
    constructor(moduleName) {
        this.moduleName = moduleName.endsWith('.js') ? moduleName : `${moduleName}.js`;
    }
    log(...str){
        if(process.env.NODE_ENV === 'development') {
            console.log(`${this.moduleName}:`,...str);
        }
    }
    error(...str){
        if(process.env.NODE_ENV === 'development') {
            console.error(`${this.moduleName}:`,...str);
        }
    }

}