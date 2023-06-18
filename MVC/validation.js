"use strict";

function showFeedBack(input, valid, message) {
    let validClass = valid ? "is-valid" : "is-invalid";
    let div = valid
        ? input.nextAll("div.valid-feedback")
        : input.nextAll("div.invalid-feedback");
    input.nextAll("div").removeClass("d-block");
    div.removeClass("d-none").addClass("d-block");
    input.removeClass("is-valid is-invalid").addClass(validClass);
    if (message) {
        div.empty();
        div.append(message);
    }
}

function logInValidation(handler) {
    let form = document.forms.flogIn;
    $(form).attr("novalidate", true);
    $(form).submit(function (event) {
        let feedBack = document.getElementById("OwnFeedback");
        if (feedBack != null) feedBack.parentElement.removeChild(feedBack);

        let isValid = true;
        let firstInvalidElement = null;

        if (!this.email.checkValidity()) {
            showFeedBack($(this.email), false);
            isValid = false;
            firstInvalidElement = this.email;
        } else {
            showFeedBack($(this.email), true);
        }


        if (!this.passwd.checkValidity()) {
            isValid = false;
            showFeedBack($(this.passwd), false);
            firstInvalidElement = this.passwd;
        } else {
            showFeedBack($(this.passwd), true);
        }


        let regex = RegExp(".\.(jpg|png|jfif)$");
        if (this.profilePic.files[0] == undefined || (regex.test(this.profilePic.files[0].name))) {
            showFeedBack($(this.profilePic), true);
        } else {
            firstInvalidElement = this.profilePic;
            showFeedBack($(this.profilePic), false);
            isValid = false;
        }

        if (!isValid || firstInvalidElement) {
            firstInvalidElement.focus();
        } else {
            handler(this.email.value, this.passwd.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });
}


function newClientValidation(handler) {
    let form = document.forms.fUser;
    let today = new Date();
    $(form).attr("novalidate", true);
    $(form).submit(function (event) {
        let feedBack = document.getElementById("OwnFeedback");
        if (feedBack != null) feedBack.parentElement.removeChild(feedBack);
        let isValid = true;
        let firstInvalidElement = null;
        this.name.value = this.name.value.trim();
        if (this.name.value == "") {
            showFeedBack($(this.name), false);
            isValid = false;
        } else {
            showFeedBack($(this.name), true);
        }

        if (
            Date.parse(this.birth.value) > today.getTime() ||
            this.birth.value == ""
        ) {
            isValid = false;
            showFeedBack($(this.birth), false);
            firstInvalidElement = this.birth;
        } else {
            showFeedBack($(this.birth), true);
        }

        if (!this.email.checkValidity()) {
            isValid = false;
            showFeedBack($(this.email), false);
            firstInvalidElement = this.email;
        } else {
            showFeedBack($(this.email), true);
        }


        if (!this.passwd.checkValidity()) {
            isValid = false;
            showFeedBack($(this.passwd), false);
            firstInvalidElement = this.passwd;
        } else {
            showFeedBack($(this.passwd), true);
        }


        let regex = RegExp(".\.(jpg|png|jfif)$");
        if (this.profilePic.files[0] == undefined || (regex.test(this.profilePic.files[0].name))) {
            showFeedBack($(this.profilePic), true);
        } else {
            firstInvalidElement = this.profilePic;
            showFeedBack($(this.profilePic), false);
            isValid = false;
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(
                this.name.value,
                this.email.value.toLowerCase(),
                this.genre.value,
                this.birth.value,
                this.profilePic.value,
                this.passwd.value
            );
        }
        event.preventDefault();
        event.stopPropagation();
    });
}
function newOwnerValidation(handler) {
    let form = document.forms.fOwner;
    let today = new Date();
    $(form).attr("novalidate", true);
    $(form).submit(function (event) {
        let feedBack = document.getElementById("OwnFeedback");
        if (feedBack != null) feedBack.parentElement.removeChild(feedBack);
        let isValid = true;
        let firstInvalidElement = null;
        if (this.name.value == "") {
            showFeedBack($(this.name), false);
            isValid = false;
        } else {
            showFeedBack($(this.name), true);
        }

        if (
            Date.parse(this.birth.value) > today.getTime() ||
            this.birth.value == ""
        ) {
            isValid = false;
            showFeedBack($(this.birth), false);
            firstInvalidElement = this.birth;
        } else {
            showFeedBack($(this.birth), true);
        }

        if (!this.email.checkValidity()) {
            isValid = false;
            showFeedBack($(this.email), false);
            firstInvalidElement = this.email;
        } else {
            showFeedBack($(this.email), true);
        }

        if (!this.passwd.checkValidity()) {
            isValid = false;
            showFeedBack($(this.passwd), false);
            firstInvalidElement = this.passwd;
        } else {
            showFeedBack($(this.passwd), true);
        }



        let regex = RegExp(".\.(jpg|png|jfif)$");
        if (this.profilePic.files[0] == undefined || (regex.test(this.profilePic.files[0].name))) {
            showFeedBack($(this.profilePic), true);
        } else {
           
            firstInvalidElement = this.profilePic;
            showFeedBack($(this.profilePic), false);
            isValid = false;
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(
                this.name.value,
                this.email.value,
                this.genre.value,
                this.birth.value,
                this.profilePic.files[0],
                this.passwd.value
            );
        }
        event.preventDefault();
        event.stopPropagation();
    });
}

function newEventValidation(handler) {
    let form = document.forms.fEvent;
    $(form).attr("novalidate", true);
    $(form).submit(function (event) {
        let feedBack = document.getElementById("OwnFeedback");
        if (feedBack != null) feedBack.parentElement.removeChild(feedBack);
        let isValid = true;
        let firstInvalidElement = null;
        if (this.eventName.value == "") {
            showFeedBack($(this.eventName), false);
            isValid = false;
        } else {
            showFeedBack($(this.eventName), true);
        }

        if (this.Start.value == "") {
            isValid = false;
            showFeedBack($(this.Start), false);
            firstInvalidElement = this.Start;
        } else {
            showFeedBack($(this.Start), true);
        }

        if (Date.parse(this.End.value) < Date.parse(this.Start.value) || this.Start.value == "") {
            isValid = false;
            showFeedBack($(this.End), false);
            firstInvalidElement = this.End;
        } else {
            showFeedBack($(this.End), true);
        }

        if (!this.Capacity.checkValidity()) {
            isValid = false;
            showFeedBack($(this.Capacity), false);
            firstInvalidElement = this.Capacity;
        } else {
            showFeedBack($(this.Capacity), true);
        }


        let regex = RegExp(".\.(jpg|png|jfif)$");
        if (this.profilePic.files[0] == undefined || (regex.test(this.profilePic.files[0].name))) {
            showFeedBack($(this.profilePic), true);
        } else {
           
            firstInvalidElement = this.profilePic;
            showFeedBack($(this.profilePic), false);
            isValid = false;
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.eventName.value, this.Start.value, this.End.value, this.eventDesc.value, this.Capacity.value, this.business.value, this.profilePic.files[0],);
        }
        event.preventDefault();
        event.stopPropagation();
    });
}

function updateOwnerValidation(handler) {
    let form = document.forms.fUpdateOwner;
    $(form).attr("novalidate", true);
    $(form).submit(function (event) {
        let feedBack = document.getElementById("OwnFeedback");
        if (feedBack != null) feedBack.parentElement.removeChild(feedBack);
        let isValid = true;
        let firstInvalidElement = null;
        if (this.name.value == "") {
            showFeedBack($(this.name), false);
            isValid = false;
        } else {
            showFeedBack($(this.name), true);
        }


        let regex = RegExp(".\.(jpg|png|jfif)$");
        if (this.profilePic.files[0] == undefined || (regex.test(this.profilePic.files[0].name))) {
            showFeedBack($(this.profilePic), true);
        } else {
           
            firstInvalidElement = this.profilePic;
            showFeedBack($(this.profilePic), false);
            isValid = false;
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.name.value, this.genre.value, this.profilePic.files[0]);
        }
        event.preventDefault();
        event.stopPropagation();
    });
}

function updateUserValidation(handler) {
    let form = document.forms.fUpdateUser;
    $(form).attr("novalidate", true);
    $(form).submit(function (event) {
        let regex = RegExp(".\.(jpg|png|jfif)$");
        let feedBack = document.getElementById("OwnFeedback");
        if (feedBack != null) feedBack.parentElement.removeChild(feedBack);
        let isValid = true;
        let firstInvalidElement = null;
        if (this.name.value == "") {
            showFeedBack($(this.name), false);
            isValid = false;
            firstInvalidElement = this.name;
        } else {
            showFeedBack($(this.name), true);
        }

        if (this.profilePic.files[0] == undefined || (regex.test(this.profilePic.files[0].name))) {
            showFeedBack($(this.profilePic), true);
        } else {
           
            firstInvalidElement = this.profilePic;
            showFeedBack($(this.profilePic), false);
            isValid = false;
        }
        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.name.value, this.genre.value, this.profilePic.files[0]);
        }
        event.preventDefault();
        event.stopPropagation();
    });
}

function updateBusinessValidation(handler) {
    let form = document.forms.fUpdateBusiness;
    $(form).attr("novalidate", true);
    $(form).submit(function (event) {
        let feedBack = document.getElementById("OwnFeedback");
        if (feedBack != null) feedBack.parentElement.removeChild(feedBack);
        let isValid = true;
        let firstInvalidElement = null;
        if (this.name.value == "") {
            showFeedBack($(this.name), false);
            firstInvalidElement = this.name;
            isValid = false;
        } else {
            showFeedBack($(this.name), true);
        }

        if (isNaN(this.latitud.value) || this.latitud.value > 90 || this.latitud.value < -90) {
            showFeedBack($(this.latitud), false);
            firstInvalidElement = this.latitud;
            isValid = false;
        } else {
            showFeedBack($(this.latitud), true);
        }
        if (isNaN(this.longitud.value) || this.longitud.value > 180 || this.longitud.value < -180) {
            showFeedBack($(this.longitud), false);
            firstInvalidElement = this.longitud;
            isValid = false;
        } else {
            showFeedBack($(this.longitud), true);
        }

        let regex = RegExp(".\.(jpg|png|jfif)$");
        if (this.profilePic.files[0] == undefined || (regex.test(this.profilePic.files[0].name))) {
            showFeedBack($(this.profilePic), true);
        } else {
           
            firstInvalidElement = this.profilePic;
            showFeedBack($(this.profilePic), false);
            isValid = false;
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {

            handler(this.name.value, this.description.value, this.latitud.value, this.longitud.value, this.profilePic.files[0]);
        }
        event.preventDefault();
        event.stopPropagation();
    });
}

function newBusinessValidation(handler) {
    let form = document.forms.fBusiness;
    $(form).attr("novalidate", true);
    $(form).submit(function (event) {
        let feedBack = document.getElementById("OwnFeedback");
        if (feedBack != null) feedBack.parentElement.removeChild(feedBack);
        let isValid = true;
        let firstInvalidElement = null;
        if (this.businessName.value == "") {
            showFeedBack($(this.businessName), false);
            firstInvalidElement = this.businessName;
            isValid = false;
        } else {
            showFeedBack($(this.businessName), true);
        }

        if (isNaN(this.latitud.value) || this.latitud.value > 90 || this.latitud.value < -90) {
            showFeedBack($(this.latitud), false);
            firstInvalidElement = this.latitud;
            isValid = false;
        } else {
            showFeedBack($(this.latitud), true);
        }
        if (isNaN(this.longitud.value) || this.longitud.value > 180 || this.longitud.value < -180) {
            showFeedBack($(this.longitud), false);
            firstInvalidElement = this.longitud;
            isValid = false;
        } else {
            showFeedBack($(this.longitud), true);
        }

        if (!this.businessEmail.checkValidity()) {
            isValid = false;
            showFeedBack($(this.businessEmail), false);
            firstInvalidElement = this.businessEmail;
        } else {
            showFeedBack($(this.businessEmail), true);
        }

        if (!this.passwd.checkValidity()) {
            isValid = false;
            showFeedBack($(this.passwd), false);
            firstInvalidElement = this.passwd;
        } else {
            showFeedBack($(this.passwd), true);
        }

        let regex = RegExp(".\.(jpg|png|jfif)$");
        if (this.businessProfilePic.files[0] == undefined || (regex.test(this.businessProfilePic.files[0].name))) {
            showFeedBack($(this.businessProfilePic), true);
        } else {
            firstInvalidElement = this.businessProfilePic;
            showFeedBack($(this.businessProfilePic), false);
            isValid = false;
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.businessName.value, this.latitud.value, this.longitud.value, this.businessDesc.value, this.businessEmail.value, this.passwd.value, this.owner.value, this.businessProfilePic.files[0]);
        }
        event.preventDefault();
        event.stopPropagation();
    });
}


export { logInValidation, newBusinessValidation, newOwnerValidation, newClientValidation, updateOwnerValidation, updateUserValidation, updateBusinessValidation, newEventValidation }