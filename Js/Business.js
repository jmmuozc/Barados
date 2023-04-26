"use strict"
class Business {
    #id
    #name
    #location
    #description
    #email
    #subscription

    constructor(id, name, location, description, email, subscription) {
        this.#id = id
        this.#name = name
        this.#location = location
        this.#description = description
        this.#email = email
        this.#subscription = subscription

    }

    get name() {
        return this.#name
    }

    set name(newName) {
        if (newName == "") throw exception;
        this.#name = newName;
    }

    get location() {
        return this.#location
    }

    set location(newLocation) {
        if (newLocation == "") throw exception;
        this.#location = newLocation;
    }

    get description() {
        return this.#description
    }

    set description(newDescription) {
        if (newDescription == "") throw exception;
        this.#description = newDescription;
    }

    get email() {
        return this.#email
    }

    set email(newEmail) {
        if (newEmail == "") throw exception;
        this.#email = newEmail;
    }

    get subscription() {
        return this.#subscription
    }
    
    set subscription(newSubscription) {
        if (newSubscription == "") throw exception;
        this.#subscription = newSubscription;
    }

}

export default Business