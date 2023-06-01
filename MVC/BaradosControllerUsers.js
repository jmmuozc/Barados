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
        let user=sessionStorage.getItem("currentUser").split(" ");
        let currentUser;
        let userBar;
        let eventsId;
        let userEvent=[];
        console.log(user);
       
        if ( user.length>1) {
            if (user[0]=="Owner"){
                currentUser=await this.#baradosModel.fetchDataWhere("Owner",{Id: user[1]});
                if (currentUser[0].Email=="admin@barados.com") {
                    userBar = await this.#baradosModel.fetchData("Business"); 
                }else{
                    userBar = await this.#baradosModel.fetchDataWhere("Business",{Owner_Id: user[1]});
                    
                }
                this.#baradosView.showOwnerInfo(currentUser,userBar); 
            } 
            if (user[0]=="Customers"){
                currentUser=await this.#baradosModel.fetchDataWhere("Customers",{Id: user[1]});
                eventsId = await this.#baradosModel.fetchDataWhere("Event_Customers",{Customer_Id: user[1]});
                for (let event of eventsId) {
                    let currentEvent=await this.#baradosModel.fetchDataWhere("Events",{Id: event.Event_Id});
                    userEvent.push(currentEvent[0]);
                }
                console.log(userEvent)
                this.#baradosView.showCustomerInfo(currentUser,userEvent); 
            } 
            if (user[0]=="Business"){
                currentUser=await this.#baradosModel.fetchDataWhere("Business",{Id: user[1]});
                this.#baradosView.showBusinessInfo(currentUser); 
            } 

            this.#baradosView.infoUserHeader(currentUser[0].Name, currentUser[0].Image);

            this.#baradosView.bindLogOff(this.HandleLogOff);

            this.#baradosView.bindShowUserSubMenu(this.HandleUserSubMenu);
        }else{
            this.#baradosView.ShowSignUpForms();
            this.#baradosView.bindShowOwnerForm(this.HandleshowOwnerForm);
            // this.#baradosView.bindShowBusinessForm(this.HandleshowBusinessForm);
            this.#baradosView.bindShowUserForm(this.HandleshowUserForm);
        }
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
        if (picture=="") picture="/Media/default-user-icon.jpg";
        let exists=[];
        let pic;
        try {
           exists= await this.#baradosModel.fetchDataWhere("Owner",{Email: email});
        //    pic= this.#baradosModel.getBase64FromFile(picture,function(base64){});
            // return base64;
        //   });
        //   console.log("getBase64FromFile");
        //   console.log(pic);
        //   console.log("getBase");
        //   pic= await this.#baradosModel.toBase64(picture);
        //   pic= await this.#baradosModel.getBase64(picture);
        //   console.log(pic);
        } catch (error) {
            console.log(error);
        }
        // console.log(pic);

        if (exists.lenght==0) {
            exists= this.#baradosModel.createUser({email:email, password: passwd});
            this.#baradosModel.insertInto("Owner",{Name:name, Email:email, Genre:genre, Birth_Date:birth,Picture: picture});

            console.log("No existe");
        }
    }

    HandleNewClient = async (name, email, genre, birth, picture, passwd) => {
        if (picture=="") picture="/Media/default-user-icon.jpg";
                try {
            currentUserEmail = await this.#baradosModel.logIn(user, passwd);
            // console.log(await this.#baradosModel.currentUser());

        } catch (error) {
            console.log(error);

            this.#baradosModel.insertInto("Customers",{Name:name, Email:email, Genre:genre, Birth_Date:birth,Picture: picture});
        }

    }

    HandleNewBusiness = async (name, location, description, email, password) => {
        let currentUserEmail;
        try {
            currentUserEmail = await this.#baradosModel.logIn(user, passwd);
            // console.log(await this.#baradosModel.currentUser());

        } catch (error) {
            console.log(error);
        }

        if (currentUserEmail != false) {
            let currentUser = await this.#baradosModel.fetchDataWhere("Owner", { Email: currentUserEmail });
            if (currentUser.lenght == 0) currentUser = await this.#baradosModel.fetchDataWhere("Customers", { Email: currentUserEmail });
            if (currentUser.lenght == 0) currentUser = await this.#baradosModel.fetchDataWhere("Business", { Email: currentUserEmail });
            this.#baradosView.infoUserHeader(currentUser[0].Name, currentUser[0].Image);
            this.#baradosView.bindLogOff(this.HandleLogOff);
            this.#baradosView.bindShowUserSubMenu(this.HandleUserSubMenu);
        } else {
            console.log("loginIncorrecto");
        }
        // if () {
        // document.cookie = `Cookie1 = ${user}`;
        // this.onLogIn();
        // } else {
        // this.failedLogIn();
        // }
    }

    HandleFormReturn = () => {
        this.#baradosView.ShowSignUpForms();
        this.#baradosView.bindShowOwnerForm(this.HandleshowOwnerForm);
        this.#baradosView.bindShowUserForm(this.HandleshowUserForm);
    }

    HandleLogOff = async () => {
        await this.#baradosModel.logOff();
        sessionStorage.setItem("currentUser", "");
        this.#baradosView.ShowSignUpForms();
        this.#baradosView.bindShowOwnerForm(this.HandleshowOwnerForm);
        this.#baradosView.bindShowUserForm(this.HandleshowUserForm);
    }

    HandleUserSubMenu = () => {
        let subMenu = document.getElementById("sub-menu");

        subMenu.classList.toggle("open-menu");
    }
}

export default BaradosControllerUsers;