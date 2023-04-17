export default class Logger {
    constructor(moduleName) {
        this.moduleName = moduleName;
    }
    log(...str){
        if(process.env.NODE_ENV === 'development') {
            console.log(`${this.moduleName}.js:`,...str);
        }
    }
    error(...str){
        if(process.env.NODE_ENV === 'development') {
            console.error(`${this.moduleName}.js:`,...str);
        }
    }

}