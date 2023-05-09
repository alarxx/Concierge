const colors = require("./colors");

/**
 * Требуется название модуля из которого будет вызываться лог.
 * */
module.exports = (module_name) => {

    const _module_name = module_name.endsWith('.js') ? module_name : `${module_name}.js`;

    if(process.env.NODE_ENV === 'development') {
        // console.log(colors.cyan(`${_module_name}:`), 'Initialize logger.');
    }

    return ({

        log(...str){
            if(process.env.NODE_ENV === 'development') {
                console.log(colors.cyan(`${_module_name}:`),...str);
            }
        },

        error(...str){
            if(process.env.NODE_ENV === 'development') {
                console.error(colors.red(`${_module_name}:`), ...str);
            }
        }

    });
};