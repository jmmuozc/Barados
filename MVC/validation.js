"use strict";

function showFeedBack(input, valid, message) {
    let validClass = (valid) ? 'is-valid' : 'is-invalid';
    let div = (valid) ? input.nextAll("div.valid-feedback") : input.nextAll("div.invalid-feedback");
    input.nextAll('div').removeClass('d-block');
    div.removeClass('d-none').addClass('d-block');
    input.removeClass('is-valid is-invalid').addClass(validClass);
    if (message) {
        div.empty();
        div.append(message);
    }
}

function logInValidation(handler) {
    let form = document.forms.flogIn;
    $(form).attr('novalidate', true);
    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        
        if (!this.email.checkValidity()) {
            showFeedBack($(this.email), false);
            isValid = false;
            firstInvalidElement = this.email;
        } else {
            showFeedBack($(this.email), true);
        }

        console.log(this.email.checkValidity());
        
        if (!this.passwd.checkValidity()) {
            isValid = false;
            showFeedBack($(this.passwd), false);
            firstInvalidElement = this.passwd;
        } else {
            showFeedBack($(this.passwd), true);
        }
        console.log(this.passwd.checkValidity());
        
        if (!isValid || firstInvalidElement) {
            firstInvalidElement.focus();
        } else {
            handler(this.email.value, this.passwd.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });
}

function newBusinessValidation(handler) {
    let form = document.forms.fBusiness;
    $(form).attr('novalidate', true);
    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        this.name.value = this.name.value.trim();
        if (this.name.value == "") {
            showFeedBack($(this.name), false);
            isValid = false;
        } else {
            showFeedBack($(this.name), true);
        }

        if (!this.location.checkValidity() || !isValid) {
            isValid = false;
            showFeedBack($(this.location), false);
            firstInvalidElement = this.location;
        } else {
            showFeedBack($(this.location), true);
        }

        if (!this.description.checkValidity() || !isValid) {
            isValid = false;
            showFeedBack($(this.description), false);
            firstInvalidElement = this.description;
        } else {
            showFeedBack($(this.description), true);
        }

        if (!this.email.checkValidity() || !isValid) {
            isValid = false;
            showFeedBack($(this.email), false);
            firstInvalidElement = this.email;
        } else {
            showFeedBack($(this.email), true);
        }
        
        if (!this.passwd.checkValidity() || !isValid) {
            isValid = false;
            showFeedBack($(this.passwd), false);
            firstInvalidElement = this.passwd;
        } else {
            showFeedBack($(this.passwd), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.name.value, this.location.value, this.description.value, this.email.value, this.passwd.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });
}

function newClientValidation(handler) {
    let form = document.forms.fUser;
    $(form).attr('novalidate', true);
    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        this.name.value = this.name.value.trim();
        if (this.name.value == "") {
            showFeedBack($(this.name), false);
            isValid = false;
        } else {
            showFeedBack($(this.name), true);
        }

        if (!this.birth.checkValidity() || !isValid) {
            isValid = false;
            showFeedBack($(this.birth), false);
            firstInvalidElement = this.birth;
        } else {
            showFeedBack($(this.birth), true);
        }

        if (!this.genre.checkValidity() || !isValid) {
            isValid = false;
            showFeedBack($(this.genre), false);
            firstInvalidElement = this.genre;
        } else {
            showFeedBack($(this.genre), true);
        }

        if (!this.email.checkValidity() || !isValid) {
            isValid = false;
            showFeedBack($(this.email), false);
            firstInvalidElement = this.email;
        } else {
            showFeedBack($(this.email), true);
        }
        
        if (!this.profilePic.checkValidity() || !isValid) {
            isValid = false;
            showFeedBack($(this.profilePic), false);
            firstInvalidElement = this.profilePic;
        } else {
            showFeedBack($(this.profilePic), true);
        }
        
        if (!this.passwd.checkValidity() || !isValid) {
            isValid = false;
            showFeedBack($(this.passwd), false);
            firstInvalidElement = this.passwd;
        } else {
            showFeedBack($(this.passwd), true);
        }
        console.log(passwd);
        console.log(passwd.checkValidity());

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.name.value, this.email.value, this.genre.value, this.birth.value, this.profilePic.value, this.passwd.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });
}
function newOwnerValidation(handler) {
    let form = document.forms.fOwner;
    console.log(form);
    $(form).attr('novalidate', true);
    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        this.name.value = this.name.value.trim();
        if (this.name.value == "") {
            showFeedBack($(this.name), false);
            isValid = false;
        } else {
            showFeedBack($(this.name), true);
        }

        if (!this.birth.checkValidity() || !isValid) {
            isValid = false;
            showFeedBack($(this.birth), false);
            firstInvalidElement = this.birth;
        } else {
            showFeedBack($(this.birth), true);
        }

        if (!this.genre.checkValidity() || !isValid) {
            isValid = false;
            showFeedBack($(this.genre), false);
            firstInvalidElement = this.genre;
        } else {
            showFeedBack($(this.genre), true);
        }

        if (!this.email.checkValidity() || !isValid) {
            isValid = false;
            showFeedBack($(this.email), false);
            firstInvalidElement = this.email;
        } else {
            showFeedBack($(this.email), true);
        }

        if (!this.profilePic.checkValidity() || !isValid) {
            isValid = false;
            showFeedBack($(this.profilePic), false);
            firstInvalidElement = this.profilePic;
        } else {
            showFeedBack($(this.profilePic), true);
        }
        
        if (!this.passwd.checkValidity() || !isValid) {
            isValid = false;
            showFeedBack($(this.passwd), false);
            firstInvalidElement = this.passwd;
        } else {
            showFeedBack($(this.passwd), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.name.value, this.email.value, this.genre.value, this.birth.value, this.profilePic.files[0], this.passwd.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });
}

export {logInValidation, newBusinessValidation, newOwnerValidation, newClientValidation} ;