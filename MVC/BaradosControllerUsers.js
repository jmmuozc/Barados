import Owner from '../Js/Owner.js';
import Customer from "../Js/Customer.js";
import Business from "../Js/Business.js";
class BaradosControllerUsers {
    #baradosModel;
    #baradosView;

    constructor(baradosModel, baradosView) {
        this.#baradosModel = baradosModel;
        this.#baradosView = baradosView;

        // Lo invocamos en el constructor como primer evento ya que el resto necesitarán que la carga inicial se haya producido.
        this.onLoad();

        // this.onInit();
        // Enlazamos handlers con la vista
        // this.#baradosView.bindInit(this.handleInit);
    }

    onLoad = async () => {
        let user = [];
        if (sessionStorage.getItem("currentUser")) user = sessionStorage.getItem("currentUser").split(" ");
        if (user.length == 1) user = sessionStorage.getItem("currentUser").split(",");
        let currentUser;
        let userBar;
        let eventsId;
        let userEvent = [];
        console.log(user);
        console.log(user.length);

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
            }
            if (user[0] == "Customers") {
                currentUser = await this.#baradosModel.fetchDataWhere("Customers", { Id: user[1] });
                eventsId = await this.#baradosModel.fetchDataWhere("Event_Customers", { Customer_Id: user[1] });
                for (let event of eventsId) {
                    let currentEvent = await this.#baradosModel.fetchDataWhere("Events", { Id: event.Event_Id });
                    userEvent.push(currentEvent[0]);
                }
                console.log(userEvent)
                this.#baradosView.showCustomerInfo(currentUser, userEvent);
                this.#baradosView.bindUpdateUser(this.HandleUpdateUser);
            }
            if (user[0] == "Business") {
                currentUser = await this.#baradosModel.fetchDataWhere("Business", { Id: user[1] });
                this.#baradosView.showBusinessInfo(currentUser);
            }
            sessionStorage.setItem("currentUser", user);

            this.#baradosView.infoUserHeader(currentUser[0].Name, currentUser[0].Image);

            this.#baradosView.bindLogOff(this.HandleLogOff);

            this.#baradosView.bindShowUserSubMenu(this.HandleUserSubMenu);
        } else {
            this.#baradosView.ShowSignUpForms();
            this.#baradosView.bindShowOwnerForm(this.HandleshowOwnerForm);
            // this.#baradosView.bindShowBusinessForm(this.HandleshowBusinessForm);
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
                            exists = await this.#baradosModel.createUser({ email: email, password: passwd });
                            if (picture == undefined) {
                                picture = "/Media/default-user-icon.jpg";
                            } else {
                                picture = await this.#baradosModel.uploadInTo(picture.name, picture, "BaradosMedia/UsersImages");
                            }

                            await this.#baradosModel.insertInto("Owner", { Name: name, Email: email, Genre: genre, Birth_Date: birth, Image: picture });

                            this.#baradosView.showFeedback("Usuario creado con exito", "success");
                        } else {
                            this.#baradosView.showFeedback("Introduce una fecha válido");
                        }
                    } else {
                        this.#baradosView.showFeedback("Introduce un nombre válido");
                    }

                } else {
                    this.#baradosView.showFeedback("La contraseña debe tener 6 caracteres mínimo");
                }
            } else {
                this.#baradosView.showFeedback("Introduce un correo válido");
            }
        } else {
            this.#baradosView.showFeedback("Ya existe un usuario con este correo");
        }
    }

    HandleUpdateOwner = async (name, genre, picture) => {
        let user;
        if (sessionStorage.getItem("currentUser")) user = sessionStorage.getItem("currentUser").split(" ");
        if (user.length == 1) user = sessionStorage.getItem("currentUser").split(",");

        if (name != "") {
            if (picture == undefined) {
                this.#baradosModel.updateDataWhere("Owner", { Name: name, Genre: genre }, user[1])
            } else {
                picture = await this.#baradosModel.uploadInTo(picture.name, picture, "BaradosMedia/UsersImages");
                this.#baradosModel.updateDataWhere("Owner", { Name: name, Genre: genre, Image: picture }, user[1])
            }
        } else {
            this.#baradosView.showFeedback("Introduce un nombre válido");
        }

       this.#baradosView.showFeedback("Los cambios se han realizado con éxito, serán visibles al actualizar la página","success")
    }

    HandleUpdateUser = async (name, genre, picture) => {
        let user;
        if (sessionStorage.getItem("currentUser")) user = sessionStorage.getItem("currentUser").split(" ");
        if (user.length == 1) user = sessionStorage.getItem("currentUser").split(",");

        if (name != "") {
            if (picture == undefined) {
                this.#baradosModel.updateDataWhere("Customers", { Name: name, Genre: genre }, user[1])
            } else {
                picture = await this.#baradosModel.uploadInTo(picture.name, picture, "BaradosMedia/UsersImages");
                this.#baradosModel.updateDataWhere("Customers", { Name: name, Genre: genre, Image: picture }, user[1])
            }
        } else {
            this.#baradosView.showFeedback("Introduce un nombre válido");
        }

       this.#baradosView.showFeedback("Los cambios se han realizado con éxito, serán visibles al actualizar la página","success")
    }

    HandleNewClient = async (name, email, genre, birth, picture, passwd) => {
        let exists = [];
        let regex = RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
        let today = new Date();
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
                            exists = await this.#baradosModel.createUser({ email: email, password: passwd });
                            if (picture == undefined) {
                                picture = "/Media/default-user-icon.jpg";
                            } else {
                                picture = await this.#baradosModel.uploadInTo(picture.name, picture, "BaradosMedia/UsersImages");
                            }

                            await this.#baradosModel.insertInto("Customers", { Name: name, Email: email, Genre: genre, Birth_Date: birth, Image: picture });

                            this.#baradosView.showFeedback("Usuario creado con exito", "success");
                        } else {
                            this.#baradosView.showFeedback("Introduce una fecha válido");
                        }
                    } else {
                        this.#baradosView.showFeedback("Introduce un nombre válido");
                    }

                } else {
                    this.#baradosView.showFeedback("La contraseña debe tener 6 caracteres mínimo");
                }
            } else {
                this.#baradosView.showFeedback("Introduce un correo válido");
            }
        } else {
            this.#baradosView.showFeedback("Ya existe un usuario con este correo");
        }
    }

    HandleNewBusiness = async (name, location, description, email, passwd, picture) => {
        let exists = [];
        try {
            exists = await this.#baradosModel.fetchDataWhere("Business", { Email: email });
        } catch (error) {
            console.log(error);
        }
        // console.log(pic);
        if (exists.length == 0) {
            exists = await this.#baradosModel.createUser({ email: email, password: passwd });
            if (picture == undefined) {
                picture = "/Media/default-user-icon.jpg";
            } else {
                picture = await this.#baradosModel.uploadInTo(picture.name, picture, "BaradosMedia/BusinessImages");
            }
            await this.#baradosModel.insertInto("Business", { Name: name, Location: location, Description: description, Email: email, Main_Image: picture });

        }
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
        // this.#baradosView.ShowSignUpForms();
        // this.#baradosView.bindShowOwnerForm(this.HandleshowOwnerForm);
        // this.#baradosView.bindShowUserForm(this.HandleshowUserForm);
    }

    HandleUserSubMenu = () => {
        let subMenu = document.getElementById("sub-menu");

        subMenu.classList.toggle("open-menu");
    }

    HandleShowBusiness = () => {
        sessionStorage.setItem("action", "Business");
        window.location.href = "index.html";
        // window.open("index.html");
        // window.close();
    }

    HandleShowEvents = () => {
        sessionStorage.setItem("action", "Events");
        window.location.href = "index.html";
        // window.open("index.html");
        // window.close();
    }

    HandleShowIndex = () => {
        sessionStorage.setItem("action", "Index");
        window.location.href = "index.html";
        // window.open("index.html");
        // window.close();
    }

}

export default BaradosControllerUsers;