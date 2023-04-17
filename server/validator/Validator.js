const validator = require('validator');
const logger = require('../log/logger')('Validator');
module.exports = class Validator {
    #errors;
    #data;

    constructor(data) {
        this.#errors = [];
        this.#data = data;
    }

    get errors(){
        return this.#errors;
    }

    isEmpty(){
        return this.#errors.length === 0;
    }

    #addError(fieldName, message){
        this.#errors.push({name: fieldName, message});
        return this;
    }
    #requiredError(fieldName){
        return this.#addError(fieldName, "Required field");
    }
    #notAStringError(fieldName){
        return this.#addError(fieldName, "Not a string");
    }

    #str(fieldName){
        let str = this.#data[fieldName];

        if(!str){
            logger.log("str required", fieldName, str);
            return this.#requiredError(fieldName);
        }
        if(typeof str !== 'string') {
            return this.#notAStringError(fieldName);
        }

        // Remove spaces from the beginning and end
        this.#data[fieldName] = this.#data[fieldName].trim();

        return null;
    }

    validateString(fieldName){
        this.#str(fieldName);
        return this;
    }

    validateEmail(fieldName){
        if(this.#str(fieldName)) return this;

        let email = this.#data[fieldName];

        if(!validator.isEmail(email)){
            return this.#addError(fieldName, "Invalid email");
        }

        return this;
    }

    validatePassword(fieldName){
        if(this.#str(fieldName)) return this;

        let password = this.#data[fieldName];

        if(!validator.isStrongPassword(password)){
            return this.#addError(fieldName, "Insecure password");
        }

        return this;
    }
}