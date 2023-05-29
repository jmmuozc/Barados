class BaradosControllerUsers {
    #baradosModel;
    #baradosView;
   
    constructor(baradosModel, baradosView) {
        this.#baradosModel = baradosModel;
        this.#baradosView = baradosView;

        console.log("Usuarios");
        // Lo invocamos en el constructor como primer evento ya que el resto necesitarán que la carga inicial se haya producido.
        this.onLoad();

        // this.onInit();
        // Enlazamos handlers con la vista
        // this.#baradosView.bindInit(this.handleInit);
    }

    onLoad = () => {

        this.#baradosView.bindShowOwnerForm(this.HandleshowOwnerForm);
        // this.#baradosView.bindShowBusinessForm(this.HandleshowBusinessForm);
        this.#baradosView.bindShowUserForm(this.HandleshowUserForm);
    }

    HandleshowOwnerForm =() =>{
        this.#baradosView.showOwnerForm();
        this.#baradosView.bindNewOwner(this.HandleNewOwner);
    }

    HandleshowBusinessForm =() =>{
        this.#baradosView.showBusinessForm();
        this.#baradosView.bindNewBusiness(this.HandleNewBusiness);
    }

    HandleshowUserForm =() =>{
        this.#baradosView.showUserForm();
        this.#baradosView.bindNewClient(this.HandleNewClient);
    }

    HandleNewOwner = async (name, email, genre, birth, picture, passwd) => {
        let currentUserEmail;
        try {
            currentUserEmail = await this.#baradosModel.logIn(user, passwd);
            // console.log(await this.#baradosModel.currentUser());
            
        } catch (error) {
            console.log(error);
        }

        if (currentUserEmail!= false) {
            let currentUser= await this.#baradosModel.fetchDataWhere("Owner",{Email : currentUserEmail});
            if (currentUser.lenght==0) currentUser= await this.#baradosModel.fetchDataWhere("Customers",{Email : currentUserEmail});
            if (currentUser.lenght==0) currentUser= await this.#baradosModel.fetchDataWhere("Business",{Email : currentUserEmail});
            this.#baradosView.infoUserHeader(currentUser[0].Name, currentUser[0].Image);
            this.#baradosView.bindLogOff(this.HandleLogOff);
            this.#baradosView.bindShowUserSubMenu(this.HandleUserSubMenu);
        }else{
            console.log("loginIncorrecto");
        }
        // if () {
            // document.cookie = `Cookie1 = ${user}`;
            // this.onLogIn();
        // } else {
            // this.failedLogIn();
        // }
    }

    HandleNewClient = async (name, email, genre, birth, picture, passwd) => {
        let currentUserEmail;
        try {
            currentUserEmail = await this.#baradosModel.logIn(user, passwd);
            // console.log(await this.#baradosModel.currentUser());
            
        } catch (error) {
            console.log(error);
        }

        if (currentUserEmail!= false) {
            let currentUser= await this.#baradosModel.fetchDataWhere("Owner",{Email : currentUserEmail});
            if (currentUser.lenght==0) currentUser= await this.#baradosModel.fetchDataWhere("Customers",{Email : currentUserEmail});
            if (currentUser.lenght==0) currentUser= await this.#baradosModel.fetchDataWhere("Business",{Email : currentUserEmail});
            this.#baradosView.infoUserHeader(currentUser[0].Name, currentUser[0].Image);
            this.#baradosView.bindLogOff(this.HandleLogOff);
            this.#baradosView.bindShowUserSubMenu(this.HandleUserSubMenu);
        }else{
            console.log("loginIncorrecto");
        }
        // if () {
            // document.cookie = `Cookie1 = ${user}`;
            // this.onLogIn();
        // } else {
            // this.failedLogIn();
        // }
    }

    HandleNewBusiness = async (name, location, description, email, password) => {
        let currentUserEmail;
        try {
            currentUserEmail = await this.#baradosModel.logIn(user, passwd);
            // console.log(await this.#baradosModel.currentUser());
            
        } catch (error) {
            console.log(error);
        }

        if (currentUserEmail!= false) {
            let currentUser= await this.#baradosModel.fetchDataWhere("Owner",{Email : currentUserEmail});
            if (currentUser.lenght==0) currentUser= await this.#baradosModel.fetchDataWhere("Customers",{Email : currentUserEmail});
            if (currentUser.lenght==0) currentUser= await this.#baradosModel.fetchDataWhere("Business",{Email : currentUserEmail});
            this.#baradosView.infoUserHeader(currentUser[0].Name, currentUser[0].Image);
            this.#baradosView.bindLogOff(this.HandleLogOff);
            this.#baradosView.bindShowUserSubMenu(this.HandleUserSubMenu);
        }else{
            console.log("loginIncorrecto");
        }
        // if () {
            // document.cookie = `Cookie1 = ${user}`;
            // this.onLogIn();
        // } else {
            // this.failedLogIn();
        // }
    }
}

export default BaradosControllerUsers;