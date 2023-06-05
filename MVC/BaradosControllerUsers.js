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
        let user = sessionStorage.getItem("currentUser").split(" ");
        let currentUser;
        let userBar;
        let eventsId;
        let userEvent = [];
        console.log(user);

        if (user.length > 1) {
            if (user[0] == "Owner") {
                currentUser = await this.#baradosModel.fetchDataWhere("Owner", { Id: user[1] });
                if (currentUser[0].Email == "admin@barados.com") {
                    userBar = await this.#baradosModel.fetchData("Business");
                } else {
                    userBar = await this.#baradosModel.fetchDataWhere("Business", { Owner_Id: user[1] });

                }
                this.#baradosView.showOwnerInfo(currentUser, userBar);
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
        this.#baradosView.bindShowAllBusiness(this.HandleShowBusiness)
        this.#baradosView.bindShowAllEvents(this.HandleShowEvents)
        this.#baradosView.bindShowIndex(this.HandleShowIndex)
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
        try {
            exists = await this.#baradosModel.fetchDataWhere("Owner", { Email: email });
        } catch (error) {
            console.log(error);
        }
        // console.log(pic);
        console.log(picture);
        console.log(exists.length);
        if (exists.length == 0) {
            exists = await this.#baradosModel.createUser({ email: email, password: passwd });
            if (picture == undefined) {
                picture = "/Media/default-user-icon.jpg";
            } else {
                picture = await this.#baradosModel.uploadInTo(picture.name, picture, "BaradosMedia/BusinessImages");
            }
            await this.#baradosModel.insertInto("Owner", { Name: name, Email: email, Genre: genre, Birth_Date: birth, Image: picture });

        }
    }

    HandleNewClient = async (name, email, genre, birth, picture, passwd) => {
        let exists = [];
        try {
            exists = await this.#baradosModel.fetchDataWhere("Customers", { Email: email });
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
            await this.#baradosModel.insertInto("Customers", { Name: name, Email: email, Genre: genre, Birth_Date: birth, Image: picture });

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
        window.open("index.html");
        window.close();
        // this.#baradosView.ShowSignUpForms();
        // this.#baradosView.bindShowOwnerForm(this.HandleshowOwnerForm);
        // this.#baradosView.bindShowUserForm(this.HandleshowUserForm);
    }

    HandleUserSubMenu = () => {
        let subMenu = document.getElementById("sub-menu");

        subMenu.classList.toggle("open-menu");
    }

    HandleShowBusiness = async () => {
        sessionStorage.setItem("action","Business");
    }

    HandleShowEvents = async () => {
       sessionStorage.setItem("action","Events");
    }

    HandleShowIndex = async () => {
       sessionStorage.setItem("action","Index");
    }
}

export default BaradosControllerUsers;