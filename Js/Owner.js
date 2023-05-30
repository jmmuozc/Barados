"use strict"

class Owner {
    #id;
    #name;
    #email;
    #genre;
    #birth;
    #image;

    constructor(id, name) {
        this.#id = id;
        this.#name = name;
    }

    // constructor(id, name, email, genre, birth, image) {
    //     this.#id = id;
    //     this.#name = name;
    //     this.#email = email;
    //     this.#genre = genre;
    //     this.#birth = birth;
    //     this.#image = image;
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

    get genre() {
        return this.#genre;
    }

    set genre(newGenre) {
        if (newGenre == "") throw exception;
        this.#genre = newGenre;
    }

    get birth() {
        return this.#birth;
    }

    get email() {
        return this.#email;
    }

    set email(newEmail) {
        if (newEmail == "") throw exception;
        this.#email = newEmail;
    }

    get image() {
        return this.#image;
    }
    
    set image(newImage) {
        if (newImage == "") throw exception;
        this.#image = newImage;
    }

}

export default Owner;