"use strict"

class Event {
    #id;
    #businessId;
    #name;
    #eventStart;
    #eventEnd;
    #description;
    #capacity;

    constructor(id,businessId, name, eventStart, eventEnd, description, capacity) {
        this.#id = id;
        this.#businessId = businessId;
        this.#name = name;
        this.#eventStart = eventStart;
        this.#eventEnd = eventEnd;
        this.#description = description;
        this.#capacity = capacity;
    }

    get id(){
        return this.#id;
    }
    get businessId(){
        return this.#businessId;
    }

    get name() {
        return this.#name;
    }

    set name(newName) {
        if (newName == "") throw exception;
        this.#name = newName;
    }

    get eventStart() {
        return this.#eventStart;
    }

    set eventStart(neweventStart) {
        if (neweventStart == "") throw exception;
        this.#eventStart = neweventStart;
    }

    get eventEnd() {
        return this.#eventEnd;
    }

    get description() {
        return this.#description;
    }
    
    set description(newdescription) {
        if (newdescription == "") throw exception;
        this.#description = newdescription;
    }

    get capacity() {
        return this.#capacity;
    }
    
    set capacity(newcapacity) {
        if (newcapacity == "") throw exception;
        this.#capacity = newcapacity;
    }

}

export default Event;