"use strict";
class BaseException extends Error {
    constructor(message = "", fileName, lineNumber) {
        super(message, fileName, lineNumber);
        this.name = "BaseException";
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BaseException);
        }
    }
}


//Excepción Password no cumple su patrón
class InvalidPassword extends BaseException {
    constructor(fileName, lineNumber) {
        super("Password is not valid, do not fulfills minimum security.", fileName, lineNumber);
        this.name = "Invalid Password Exception";
    }
}

//Excepción Business no cumple su patrón
class InvalidBusiness extends BaseException {
    constructor(fileName, lineNumber) {
        super("Business already exists.", fileName, lineNumber);
        this.name = "Business already Exists";
    }
}

//Excepción Objeto Invalido
class InvalidObject extends BaseException {
    constructor(fileName, lineNumber) {
        super("Invalid Object", fileName, lineNumber);
        this.name = "Invalid Object Exception";
    }
}