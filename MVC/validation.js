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
    console.log(document.forms);
    $(form).attr('novalidate', true);
    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        this.email.value = this.email.value.trim();
        if (this.email.value == "") {
            showFeedBack($(this.email), false);
            isValid = false;
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
            handler(this.email.value, this.passwd.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });
}

export {logInValidation} ;