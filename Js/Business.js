"use strict"
class Business {
    #id;
    #name;
    #location;
    #description;
    #email;
    #idOwner;
    #verified

    constructor(id, name) {
        this.#id = id;
        this.#name = name;
    }

    // constructor(id, name, location, description, email, idOwner, verified) {
    //     this.#id = id;
    //     this.#name = name;
    //     this.#location = location;
    //     this.#description = description;
    //     this.#email = email;
    //     this.#idOwner = idOwner;
    //     this.#verified = verified;

    // }

    get id(){
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    set name(newName) {
        if (newName == "") throw exception;
        this.#name = newName;
    }

    get location() {
        return this.#location;
    }

    set location(newLocation) {
        if (newLocation == "") throw exception;
        this.#location = newLocation;
    }

    get description() {
        return this.#description;
    }

    set description(newDescription) {
        if (newDescription == "") throw exception;
        this.#description = newDescription;
    }

    get email() {
        return this.#email;
    }

    set email(newEmail) {
        if (newEmail == "") throw exception;
        this.#email = newEmail;
    }

    get idOwner() {
        return this.#idOwner;
    }
    
    set idOwner(newidOwner) {
        if (newidOwner == "") throw exception;
        this.#idOwner = newidOwner;
    }
    get verified() {
        return this.#idOwner;
    }
    
    set verified(verified) {
        if (verified == "") throw exception;
        this.#idOwner = verified;
    }

}

export default Business;