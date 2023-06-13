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
            handler(
                this.name.value,
                this.location.value,
                this.description.value,
                this.email.value,
                this.passwd.value
            );
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

        // if (!this.genre.checkValidity() || !isValid) {
        //     isValid = false;
        //     showFeedBack($(this.genre), false);
        //     firstInvalidElement = this.genre;
        // } else {
        //     showFeedBack($(this.genre), true);
        // }

        if (!this.email.checkValidity()) {
            isValid = false;
            showFeedBack($(this.email), false);
            firstInvalidElement = this.email;
        } else {
            showFeedBack($(this.email), true);
        }

        // if (!this.profilePic.checkValidity() || !isValid) {
        //     isValid = false;
        //     showFeedBack($(this.profilePic), false);
        //     firstInvalidElement = this.profilePic;
        // } else {
        //     showFeedBack($(this.profilePic), true);
        // }

        if (!this.passwd.checkValidity()) {
            isValid = false;
            showFeedBack($(this.passwd), false);
            firstInvalidElement = this.passwd;
        } else {
            showFeedBack($(this.passwd), true);
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
        //     console.log(this.genre.value);
        //     console.log(!this.genre.checkValidity());
        // if (!this.genre.checkValidity() || !isValid) {
        //     isValid = false;
        //     showFeedBack($(this.genre), false);
        //     firstInvalidElement = this.genre;
        // } else {
        //     showFeedBack($(this.genre), true);
        // }

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

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.eventName.value, this.Start.value, this.End.value, this.businessDesc.value,this.Capacity.value,this.business.value);
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

        this.location.value = this.location.value.trim();
        if (this.location.checkValidity()) {
            showFeedBack($(this.location), false);
            firstInvalidElement = this.location;
            isValid = false;
        } else {
            showFeedBack($(this.name), true);
        }
        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(
                this.name.value,
                this.description.value,
                this.location.value,
                this.profilePic.files[0]
            );
        }
        event.preventDefault();
        event.stopPropagation();
    });
}

export {logInValidation,newBusinessValidation,newOwnerValidation,newClientValidation,updateOwnerValidation,updateUserValidation,updateBusinessValidation,newEventValidation}