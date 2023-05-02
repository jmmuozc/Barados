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

//Excepción Business existe
class BusinessExists extends BaseException {
    constructor(fileName, lineNumber) {
        super("Business already exists.", fileName, lineNumber);
        this.name = "Business already Exists";
    }
}

//Excepción Customer existe
class CustomerExists extends BaseException {
    constructor(fileName, lineNumber) {
        super("Customer already exists.", fileName, lineNumber);
        this.name = "Customer already Exists";
    }
}

//Excepción Event existe
class EventExists extends BaseException {
    constructor(fileName, lineNumber) {
        super("Event already exists.", fileName, lineNumber);
        this.name = "Event already Exists";
    }
}

//Excepción Objeto Invalido
class InvalidObject extends BaseException {
    constructor(fileName, lineNumber) {
        super("Invalid Object", fileName, lineNumber);
        this.name = "Invalid Object Exception";
    }
}

export {InvalidPassword,BusinessExists,CustomerExists,EventExists,InvalidObject}