// import { CryptoJS } from 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js';
class BaradosControllerUsers {
    #baradosModel;
    #baradosView;

    constructor(baradosModel, baradosView) {
        this.#baradosModel = baradosModel;
        this.#baradosView = baradosView;

        // Lo invocamos en el constructor como primer evento ya que el resto necesitarán que la carga inicial se haya producido.
        this.onLoad();

    }

    onLoad = async () => {
        let user = [];

        if (sessionStorage.getItem("currentUser")) user = sessionStorage.getItem("currentUser").split(",");

        if (user.length == 1) user = sessionStorage.getItem("currentUser").split(" ");
       
        let currentUser;
        let userBar;
        let eventsId;
        let userEvent = [];

        if (user.length > 1) {
            if (user[0] == "Owner") {
                currentUser = await this.#baradosModel.fetchDataWhere("Owner", { Id: user[1] });
                if (currentUser[0].Email == "admin@barados.com") {
                    userBar = await this.#baradosModel.fetchData("Business");
                } else {
                    userBar = await this.#baradosModel.fetchDataWhere("Business", { Owner_Id: user[1] });

                }
                this.#baradosView.showOwnerInfo(currentUser, userBar);
                this.#baradosView.bindUpdateOwner(this.HandleUpdateOwner);
                this.#baradosView.bindOwnerBusinessForm(this.HandleNewBusinessForm);
                this.#baradosView.bindWarningBusiness(this.HandleDeleteBusinessWarning);
            }
            if (user[0] == "Customers") {
                currentUser = await this.#baradosModel.fetchDataWhere("Customers", { Id: user[1] });
                eventsId = await this.#baradosModel.fetchDataWhere("Event_Customers", { Customer_Id: user[1] });
                for (let event of eventsId) {
                    let currentEvent = await this.#baradosModel.fetchDataWhere("Events", { Id: event.Event_Id });
                    userEvent.push(currentEvent[0]);
                }
                this.#baradosView.showCustomerInfo(currentUser, userEvent, user);
                this.#baradosView.bindUpdateUser(this.HandleUpdateUser);
                this.#baradosView.bindWarningEvent(this.HandleLeaveEvent);
            }
            if (user[0] == "Business") {
                currentUser = await this.#baradosModel.fetchDataWhere("Business", { Id: user[1] });
                eventsId = await this.#baradosModel.fetchDataWhere("Events", { Business_Id: user[1] });
                this.#baradosView.showBusinessInfo(currentUser, eventsId, user);
                this.#baradosView.bindUpdateBusiness(this.HandleUpdateBusiness);
                this.#baradosView.bindEventForm(this.HandleNewEventForm);
                this.#baradosView.bindWarningEvent(this.HandleDeleteEventWarning);
            }

            sessionStorage.setItem("currentUser", user);

            this.#baradosView.infoUserHeader(currentUser[0].Name, currentUser[0].Image);

            this.#baradosView.bindLogOff(this.HandleLogOff);

            this.#baradosView.bindShowUserSubMenu(this.HandleUserSubMenu);
        } else {
            this.#baradosView.ShowSignUpForms();
            this.#baradosView.bindShowOwnerForm(this.HandleshowOwnerForm);

            this.#baradosView.bindShowUserForm(this.HandleshowUserForm);
        }
        this.#baradosView.bindShowAllBusinessFromUser(this.HandleShowBusiness)
        this.#baradosView.bindShowAllEventsFromUser(this.HandleShowEvents)
        this.#baradosView.bindShowIndexFromUser(this.HandleShowIndex)
    }

    HandleshowOwnerForm = () => {
        this.#baradosView.showOwnerForm();
        this.#baradosView.bindNewOwner(this.HandleNewOwner);
        this.#baradosView.bindShowFormReturn(this.HandleFormReturn);
    }

    HandleshowBusinessForm = () => {
        this.#baradosView.showBusinessForm();
        this.#baradosView.bindNewBusiness(this.HandleNewBusiness);
        this.#baradosView.bindShowFormReturn(this.HandleFormReturn);
    }

    HandleshowUserForm = () => {
        this.#baradosView.showUserForm();
        this.#baradosView.bindNewClient(this.HandleNewClient);
        this.#baradosView.bindShowFormReturn(this.HandleFormReturn);
    }

    HandleNewOwner = async (name, email, genre, birth, picture, passwd) => {

        let exists = [];
        let regex = RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
        let today = new Date();
        email = email.toLowerCase();
        try {
            exists = await this.#baradosModel.fetchDataWhere("Owner", { Email: email });
            if (exists.length == 0) {
                exists = await this.#baradosModel.fetchDataWhere("Customers", { Email: email });
            }
            if (exists.length == 0) {
                exists = await this.#baradosModel.fetchDataWhere("Business", { Email: email });
            }
        } catch (error) {
            console.log(error);
        }

        if (exists.length == 0) {
            if (regex.test(email)) {
                regex = RegExp(".{6,}");
                if (regex.test(passwd)) {
                    if (name != "") {
                        if (Date.parse(this.birth) < today.getTime() || this.birth != "") {
                            if (picture == undefined) {
                                picture = "/Media/default-user-icon.jpg";
                            } else {
                                picture = await this.#baradosModel.uploadInTo(picture.name, picture, "BaradosMedia/UsersImages");
                            }
                            
                            await this.#baradosModel.insertInto("Owner", { Name: name, Email: email, Genre: genre, Birth_Date: birth, Image: picture });
                            exists = await this.#baradosModel.createUser({ email: email, password: passwd });

                            this.#baradosView.showFeedback("Usuario creado con exito", 0, "success");
                        } else {
                            this.#baradosView.showFeedback("Introduce una fecha válido", 0);
                        }
                    } else {
                        this.#baradosView.showFeedback("Introduce un nombre válido", 0);
                    }

                } else {
                    this.#baradosView.showFeedback("La contraseña debe tener 6 caracteres mínimo", 0);
                }
            } else {
                this.#baradosView.showFeedback("Introduce un correo válido", 0);
            }
        } else {
            this.#baradosView.showFeedback("Ya existe un usuario con este correo", 0);
        }
    }

    HandleUpdateOwner = async (name, genre, picture) => {
        let user;
        if (sessionStorage.getItem("currentUser")) user = sessionStorage.getItem("currentUser").split(",");
        if (user.length == 1) user = sessionStorage.getItem("currentUser").split(" ");

        if (name != "") {
            if (picture == undefined) {
                this.#baradosModel.updateDataWhere("Owner", { Name: name, Genre: genre }, user[1])
            } else {
                picture = await this.#baradosModel.uploadInTo(picture.name, picture, "BaradosMedia/UsersImages");
                this.#baradosModel.updateDataWhere("Owner", { Name: name, Genre: genre, Image: picture }, user[1])
            }
        } else {
            this.#baradosView.showFeedback("Introduce un nombre válido", 0);
        }

        this.#baradosView.showFeedback("Los cambios se han realizado con éxito, serán visibles al actualizar la página", 0, "success")
    }

    HandleUpdateUser = async (name, genre, picture) => {
        let user;
        if (sessionStorage.getItem("currentUser")) user = sessionStorage.getItem("currentUser").split(",");
        if (user.length == 1) user = sessionStorage.getItem("currentUser").split(" ");

        if (name != "") {
            if (picture == undefined) {
                this.#baradosModel.updateDataWhere("Customers", { Name: name, Genre: genre }, user[1])
            } else {
                picture = await this.#baradosModel.uploadInTo(picture.name, picture, "BaradosMedia/UsersImages");
                this.#baradosModel.updateDataWhere("Customers", { Name: name, Genre: genre, Image: picture }, user[1])
            }
        } else {
            this.#baradosView.showFeedback("Introduce un nombre válido", 0);
        }

        this.#baradosView.showFeedback("Los cambios se han realizado con éxito, serán visibles al actualizar la página", 0, "success")
    }

    HandleUpdateBusiness = async (name, description, longitud, latitud, picture) => {
        let user;
        if (sessionStorage.getItem("currentUser")) user = sessionStorage.getItem("currentUser").split(",");
        if (user.length == 1) user = sessionStorage.getItem("currentUser").split(" ");
        if (name != "") {
            if (!isNaN(latitud) && latitud < 90 && latitud > -90) {
                if (!isNaN(longitud) && longitud < 180 && longitud > -180) {
                    let location = latitud + "," + longitud;
                    if (picture == undefined) {
                        this.#baradosModel.updateDataWhere("Business", { Name: name, Description: description, Location: location }, user[1])
                    } else {
                        picture = await this.#baradosModel.uploadInTo(picture.name, picture, "BaradosMedia/BusinessImages");

                        this.#baradosModel.updateDataWhere("Business", { Name: name, Description: description, Location: location, Image: picture }, user[1])
                    }
                } else {

                    this.#baradosView.showFeedback("Introduce una longitud válida", 0);
                }
            } else {

                this.#baradosView.showFeedback("Introduce una latitud válida", 0);
            }
        } else {
            this.#baradosView.showFeedback("Introduce un nombre válido", 0);
        }

        this.#baradosView.showFeedback("Los cambios se han realizado con éxito, serán visibles al actualizar la página", 0, "success")
    }

    HandleNewClient = async (name, email, genre, birth, picture, passwd) => {
        let exists = [];
        let regex = RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
        let today = new Date();
        email = email.toLowerCase();
        try {
            exists = await this.#baradosModel.fetchDataWhere("Owner", { Email: email });
            if (exists.length == 0) {
                exists = await this.#baradosModel.fetchDataWhere("Customers", { Email: email });
            }
            if (exists.length == 0) {
                exists = await this.#baradosModel.fetchDataWhere("Business", { Email: email });
            }
        } catch (error) {
            console.log(error);
        }

        if (exists.length == 0) {
            if (regex.test(email)) {
                regex = RegExp(".{6,}");
                if (regex.test(passwd)) {
                    if (name != "") {
                        if (Date.parse(this.birth) < today.getTime() || this.birth != "") {
                            if (picture == "") {
                                picture = "/Media/default-user-icon.jpg";
                            } else {
                                picture = await this.#baradosModel.uploadInTo(picture.name, picture, "BaradosMedia/UsersImages");
                            }

                            await this.#baradosModel.insertInto("Customers", { Name: name, Email: email, Genre: genre, Birth_Date: birth, Image: picture });

                            exists = await this.#baradosModel.createUser({ email: email, password: passwd });

                            this.#baradosView.showFeedback("Usuario creado con exito", 0, "success");

                        } else {
                            this.#baradosView.showFeedback("Introduce una fecha válido", 0);
                        }
                    } else {
                        this.#baradosView.showFeedback("Introduce un nombre válido", 0);
                    }

                } else {
                    this.#baradosView.showFeedback("La contraseña debe tener 6 caracteres mínimo", 0);
                }
            } else {
                this.#baradosView.showFeedback("Introduce un correo válido", 0);
            }
        } else {
            this.#baradosView.showFeedback("Ya existe un usuario con este correo", 0);
        }
    }

    HandleNewBusinessForm = () => {
        let user;
        if (sessionStorage.getItem("currentUser")) user = sessionStorage.getItem("currentUser").split(",");
        if (user.length == 1) user = sessionStorage.getItem("currentUser").split(" ");

        this.#baradosView.showBusinessForm(user);

        this.#baradosView.bindNewBusiness(this.HandleNewBusiness);

    }

    HandleNewBusiness = async (name, latitud, longitud, description, email, passwd, owner, picture) => {
        let exists = [];
        let regex = RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
        let location;
        let currentUser;
        let userBar;
        email = email.toLowerCase();
        try {
            exists = await this.#baradosModel.fetchDataWhere("Business", { Email: email });
        } catch (error) {
            console.log(error);
        }

        if (exists.length == 0) {
            if (regex.test(email)) {
                regex = RegExp(".{6,}");
                if (regex.test(passwd)) {
                    if (!isNaN(latitud) && latitud < 90 && latitud > -90) {
                        if (!isNaN(longitud) && longitud < 180 && longitud > -180) {
                            if (picture == undefined) {
                                picture = "/Media/business.png";
                            } else {
                                picture = await this.#baradosModel.uploadInTo(picture.name, picture, "BaradosMedia/BusinessImages");
                            }
                            location = latitud + "," + longitud;
                            // exists = await this.#baradosModel.createUser({ email: email, password: passwd });
                            
                            let encryptedPasswd = CryptoJS.enc.Hex.stringify(CryptoJS.SHA1(passwd));

                            await this.#baradosModel.insertInto("Business", { Name: name, Location: location, Description: description, Email: email, Owner_Id: owner, Image: picture, Password:encryptedPasswd });
                            
                            this.#baradosView.showFeedback("Negocio creado con exito", 1, "success");

                            currentUser = await this.#baradosModel.fetchDataWhere("Owner", { Id: owner });
                            if (currentUser[0].Email == "admin@barados.com") {
                                userBar = await this.#baradosModel.fetchData("Business");
                            } else {
                                userBar = await this.#baradosModel.fetchDataWhere("Business", { Owner_Id: owner });

                            }
                            this.#baradosView.showOwnerInfo(currentUser, userBar);
                            this.#baradosView.bindUpdateOwner(this.HandleUpdateOwner);
                            this.#baradosView.bindOwnerBusinessForm(this.HandleNewBusinessForm);
                            this.#baradosView.bindWarningBusiness(this.HandleDeleteBusinessWarning);
                        } else {

                            this.#baradosView.showFeedback("Introduce una longitud válida", 1);
                        }
                    } else {

                        this.#baradosView.showFeedback("Introduce una latitud válida", 1);
                    }
                } else {
                    this.#baradosView.showFeedback("La contraseña debe tener 6 caracteres mínimo", 1);
                }
            } else {
                this.#baradosView.showFeedback("Introduce un correo válido", 1);
            }
        } else {
            this.#baradosView.showFeedback("Ya existe un usuario con este correo", 1);
        }
    }

    HandleNewEventForm = () => {
        let user;
        if (sessionStorage.getItem("currentUser")) user = sessionStorage.getItem("currentUser").split(",");
        if (user.length == 1) user = sessionStorage.getItem("currentUser").split(" ");

        this.#baradosView.eventForm(user);

        this.#baradosView.bindNewEvent(this.HandleNewEvent);

    }

    HandleNewEvent = async (eventName, Start, End, eventDesc, capacity, business, picture) => {
        let user;
        let currentUser;
        let eventsId;
        if (eventName != "") {
            if (Start != "") {
                if (End != "" && Date.parse(End) > Date.parse(Start)) {
                    if (capacity > 0) {
                        if (picture == undefined) {
                            picture = "/Media/DefaultEvent.png";
                        } else {
                            picture = await this.#baradosModel.uploadInTo(picture.name, picture, "BaradosMedia/BusinessImages");
                        }

                        await this.#baradosModel.insertInto("Events", { Business_Id: business, Event_Start: Start, Event_End: End, Description: eventDesc, Capacity: capacity, Name: eventName, Image: picture });

                        if (sessionStorage.getItem("currentUser")) user = sessionStorage.getItem("currentUser").split(",");

                        currentUser = await this.#baradosModel.fetchDataWhere("Business", { Id: business });

                        eventsId = await this.#baradosModel.fetchDataWhere("Events", { Business_Id: business });

                        this.#baradosView.showBusinessInfo(currentUser, eventsId, user);
                        this.#baradosView.bindUpdateBusiness(this.HandleUpdateBusiness);
                        this.#baradosView.bindEventForm(this.HandleNewEventForm);
                        this.#baradosView.bindWarningEvent(this.HandleDeleteEventWarning);
                    } else {
                        this.#baradosView.showFeedback("Introduce un número válido", 1);
                    }
                } else {
                    this.#baradosView.showFeedback("Introduce una fecha válida", 1);
                }

            } else {
                this.#baradosView.showFeedback("Introduce una fecha válida", 1);
            }
        } else {
            this.#baradosView.showFeedback("Introduce un nombre válido", 1);
        }

    }

    HandleDeleteBusinessWarning = async (BusinessId) => {

        let business = await this.#baradosModel.fetchDataWhere("Business", { Id: BusinessId });
        this.#baradosView.showWarning(business, "Evento", "Business");
        this.#baradosView.bindDeleteObject(this.HandleDeleteBusiness);
    }

    HandleDeleteEventWarning = async (EventId) => {
        let eventsId = await this.#baradosModel.fetchDataWhere("Events", { Id: EventId });
        this.#baradosView.showWarning(eventsId, "Evento", "Events");
        this.#baradosView.bindDeleteObject(this.HandleDeleteEvent);
    }

    HandleLeaveEvent = async (EventId) => {
        let user = sessionStorage.getItem("currentUser").split(",");
        let userEvent = [];

        await this.#baradosModel.deleteDataEventCustomer("Event_Customers", { Customer_Id: user[1], Event_Id: EventId });

        let events = await this.#baradosModel.fetchDataWhere("Event_Customers", { Customer_Id: user[1] });

        for (let event of events) {
            let currentEvent = await this.#baradosModel.fetchDataWhere("Events", { Id: event.Event_Id });
            userEvent.push(currentEvent[0]);
        }

        this.#baradosView.ShowEventsCardsOfUsersInfo(userEvent, userEvent.length, user);

        this.#baradosView.bindWarningEvent(this.HandleLeaveEvent);
    }

    HandleDeleteEvent = async (EventId, table) => {
        let user;
        let currentUser;
        let events;
        let body = document.getElementsByTagName("body");
        let modal = document.getElementById("exampleModal");
        let modalBackDrop = document.getElementsByClassName("modal-backdrop");

        if (sessionStorage.getItem("currentUser")) user = sessionStorage.getItem("currentUser").split(",");


        await this.#baradosModel.deleteDataWhere(table, EventId);

        events = await this.#baradosModel.fetchDataWhere("Events", { Business_Id: user[1] });


        currentUser = await this.#baradosModel.fetchDataWhere("Business", { Id: user[1] });


        this.#baradosView.showBusinessInfo(currentUser, events, user);
        this.#baradosView.bindEventForm(this.HandleNewEventForm);
        this.#baradosView.bindUpdateBusiness(this.HandleUpdateBusiness);

        body[0].setAttribute("class", " ");
        modal.setAttribute("class", "modal fade");
        modalBackDrop[0].parentElement.removeChild(modalBackDrop[0]);
    }

    HandleDeleteBusiness = async (BusinessId, table) => {
        let user;
        let currentUser;
        let userBar;
        let body = document.getElementsByTagName("body");
        let modal = document.getElementById("exampleModal");
        let modalBackDrop = document.getElementsByClassName("modal-backdrop");

        if (sessionStorage.getItem("currentUser")) user = sessionStorage.getItem("currentUser").split(",");


        await this.#baradosModel.deleteDataWhere(table, BusinessId);

        userBar = await this.#baradosModel.fetchDataWhere("Business", { Owner_Id: user[1] });

        currentUser = await this.#baradosModel.fetchDataWhere("Owner", { Id: user[1] });

        this.#baradosView.showOwnerInfo(currentUser, userBar);
        this.#baradosView.bindUpdateOwner(this.HandleUpdateOwner);
        this.#baradosView.bindOwnerBusinessForm(this.HandleNewBusinessForm);
        this.#baradosView.bindWarningBusiness(this.HandleDeleteBusinessWarning);

        body[0].setAttribute("class", " ");
        modal.setAttribute("class", "modal fade");
        modalBackDrop[0].parentElement.removeChild(modalBackDrop[0]);
    }
    HandleFormReturn = () => {
        this.#baradosView.ShowSignUpForms();
        this.#baradosView.bindShowOwnerForm(this.HandleshowOwnerForm);
        this.#baradosView.bindShowUserForm(this.HandleshowUserForm);
    }

    HandleLogOff = async () => {
        await this.#baradosModel.logOff();
        sessionStorage.setItem("currentUser", "");
        document.getElementById("signUp").setAttribute("class", "py-3 bg-light main d-flex justify-content-center");
        window.location.href = "index.html";

    }

    HandleUserSubMenu = () => {
        let subMenu = document.getElementById("sub-menu");

        subMenu.classList.toggle("open-menu");
    }

    HandleShowBusiness = () => {
        sessionStorage.setItem("action", "Business");
        window.location.href = "index.html";

    }

    HandleShowEvents = () => {
        sessionStorage.setItem("action", "Events");
        window.location.href = "index.html";

    }

    HandleShowIndex = () => {
        sessionStorage.setItem("action", "Index");
        window.location.href = "index.html";

    }

}

export default BaradosControllerUsers;