const colors = require("./colors");


class Logger {
    constructor(module_name) {
        this.module_name = module_name.endsWith('.js') ? module_name : `${module_name}.js`;
    }
    log(...str){
        if(process.env.NODE_ENV === 'development') {
            console.log(colors.cyan(`${this.module_name}:`),...str);
        }
    }

    error(...str){
        if(process.env.NODE_ENV === 'development') {
            console.error(colors.red(`${this.module_name}:`), ...str);
        }
    }

}

/**
 * Требуется название модуля из которого будет вызываться лог.
 * */
module.exports = (module_name) => new Logger(module_name);