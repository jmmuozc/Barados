"use strict"

class BaradosController {
    #baradosModel;
    #baradosView;

    constructor(baradosModel, baradosView) {
        this.#baradosModel = baradosModel;
        this.#baradosView = baradosView;

        // Lo invocamos en el constructor como primer evento ya que el resto necesitarán que la carga inicial se haya producido.
        this.onLoad();

        // this.#baradosView.bindInit(this.handleInit);
        this.onInit();
        // Enlazamos handlers con la vista
        // this.#baradosView.bindInit(this.handleInit);
    }

    onLoad = async () => {

        let business = await this.#baradosModel.fetchData("Business");
        let customers = await this.#baradosModel.fetchData("Customers");
        let events = await this.#baradosModel.fetchData("Events");
        // let business = await this.#supabaseConection.from("Business").select();
        // let customers = await this.#supabaseConection.from("Customers").select();
        // let owners = await this.#supabaseConection.from("Owner").select();
        // console.log(business);
        // console.log(customers);
        // console.log(owners);
        // console.log(await this.#baradosModel.logOff());
        if (!sessionStorage.getItem("action")) {
            this.#baradosView.ShowBusinessCards(business, 3);
            this.#baradosView.ShowEventsCards(events, 3)
        }
        
    }
    
    onInit =async () => {
        let currentUserEmail = await this.#baradosModel.currentUser();
        // await this.#baradosModel.logOff();
        let user;
        let action=sessionStorage.getItem("action");
        if (currentUserEmail != false) {
    
            let currentUser = await this.#baradosModel.fetchDataWhere("Owner", { Email: currentUserEmail });
            if (currentUser.length == 0) {
                currentUser = await this.#baradosModel.fetchDataWhere("Customers", { Email: currentUserEmail });
    
                if (currentUser.length != 0) user = "Customers," + currentUser[0].Id + "," + currentUser[0].Name;
            } else {
                user = "Owner," + currentUser[0].Id + "," + currentUser[0].Name;
            }
            if (currentUser.length == 0) {
                currentUser = await this.#baradosModel.fetchDataWhere("Business", { Email: currentUserEmail });
    
                if (currentUser.length != 0) user = "Business," + currentUser[0].Id + "," + currentUser[0].Name;

            }
            sessionStorage.setItem("currentUser", user);
    
            // console.log(sessionStorage.getItem("currentUser"));
    
            this.#baradosView.removeLogInForm();
    
            this.#baradosView.infoUserHeader(currentUser[0].Name, currentUser[0].Image);
    
            this.#baradosView.bindLogOff(this.HandleLogOff);
    
            this.#baradosView.bindShowUserSubMenu(this.HandleUserSubMenu);
    
        }
        if(action=="Business")this.HandleShowBusiness();
        if(action=="Events")this.HandleShowEvents();
        if(action=="Index")this.HandleShowIndex();
        this.#baradosView.bindLogIn(this.HandleLogIn);
        this.#baradosView.bindShowABusiness(this.HandleShowABusiness);
        this.#baradosView.bindShowAEvent(this.HandleShowAEvent);
        this.#baradosView.bindShowAllBusiness(this.HandleShowBusiness);
        this.#baradosView.bindShowAllEvents(this.HandleShowEvents);
        this.#baradosView.bindShowIndex(this.HandleShowIndex);

    }
    
    handleInit = () => {
        this.onInit();
    }

    HandleLogIn = async (user, passwd) => {
        let currentUserEmail;
       user=user.toLowerCase();
        try {
            currentUserEmail = await this.#baradosModel.logIn(user, passwd);
            // console.log(await this.#baradosModel.currentUser());

        } catch (error) {
            
        }
        // console.log(feedBack);
      
        if (currentUserEmail != false) {
            let currentUser = await this.#baradosModel.fetchDataWhere("Owner", { Email: currentUserEmail });
            // console.log(currentUser);
            if (currentUser.length == 0) {
                currentUser = await this.#baradosModel.fetchDataWhere("Customers", { Email: currentUserEmail });
                if (currentUser.length != 0) user = "Customers " + currentUser[0].Id + "," + currentUser[0].Name;

            } else {
                user = "Owner," + currentUser[0].Id + "," + currentUser[0].Name;

            }
            if (currentUser.length == 0) {
                currentUser = await this.#baradosModel.fetchDataWhere("Business", { Email: currentUserEmail });
                if (currentUser.length != 0) user = "Business," + currentUser[0].Id + "," + currentUser[0].Name;

            }
            sessionStorage.setItem("currentUser", user);
            this.#baradosView.infoUserHeader(currentUser[0].Name, currentUser[0].Image);
            this.#baradosView.bindLogOff(this.HandleLogOff);
            this.#baradosView.bindShowUserSubMenu(this.HandleUserSubMenu);

            // console.log(sessionStorage.getItem("currentUser"));
        } else {
            this.#baradosView.showFeedback("Correo o contraseña incorrectos",0);
        }
        // if () {
        // document.cookie = `Cookie1 = ${user}`;
        // this.onLogIn();
        // } else {
        // this.failedLogIn();
        // }
    }

    HandleLogOff = async () => {
        await this.#baradosModel.logOff();
        sessionStorage.setItem("currentUser", "");
        this.#baradosView.setUpLogIn();
        this.#baradosView.bindLogIn(this.HandleLogIn);
    }

    HandleUserSubMenu = () => {
        let subMenu = document.getElementById("sub-menu");

        subMenu.classList.toggle("open-menu");
    }

    HandleShowBusiness = async () => {
        this.#baradosView.ShowIndex([], [], 3);
        let business = await this.#baradosModel.fetchData("Business");
        let inicio = document.getElementById("inicio");
        let eventos = document.getElementById("eventos");
        // console.log(inicio);
        if (inicio) inicio.parentElement.removeChild(inicio);
        // console.log(eventos)
        if (eventos) eventos.parentElement.removeChild(eventos);
        this.#baradosView.ShowBusinessCards(business, business.length);
        this.#baradosView.bindShowABusiness(this.HandleShowABusiness);
    }
    
    HandleShowEvents = async () => {
        this.#baradosView.ShowIndex([], [], 3);
        let events = await this.#baradosModel.fetchData("Events");
        let inicio = document.getElementById("inicio");
        let business = document.getElementById("bares");
        if (inicio) inicio.parentElement.removeChild(inicio);
        if (business) business.parentElement.removeChild(business);
        this.#baradosView.ShowEventsCards(events, events.length)
        this.#baradosView.bindShowAEvent(this.HandleShowAEvent);
    }

    HandleShowIndex = async () => {
        let businessElement = await this.#baradosModel.fetchData("Business");
        let eventsElement = await this.#baradosModel.fetchData("Events");

        let inicio = document.getElementById("inicio");
        let business = document.getElementById("bares");
        let eventos = document.getElementById("eventos");
        if (inicio) inicio.parentElement.removeChild(inicio);
        if (business) business.parentElement.removeChild(business);
        if (eventos) eventos.parentElement.removeChild(eventos);
        this.#baradosView.ShowIndex(businessElement, eventsElement, 3);
        this.#baradosView.bindShowABusiness(this.HandleShowABusiness);
        this.#baradosView.bindShowAEvent(this.HandleShowAEvent);
    }

    HandleShowABusiness= async (businessToShow)=>{
        let inicio = document.getElementById("inicio");
        let business = document.getElementById("bares");
        let eventos = document.getElementById("eventos");
        if (inicio) inicio.parentElement.removeChild(inicio);
        if (business) business.parentElement.removeChild(business);
        if (eventos) eventos.parentElement.removeChild(eventos);
        
        let businessData= await this.#baradosModel.fetchDataWhere("Business",{Id:businessToShow});
        // console.log(businessData);
        let eventsData= await this.#baradosModel.fetchDataWhere("Events",{Business_Id:businessData[0].Id});
        this.#baradosView.showBusinessInfoToUsers(businessData,eventsData);
        this.#baradosView.bindShowAEvent(this.HandleShowAEvent);
    }
    
    HandleShowAEvent= async (eventToShow)=>{
        let inicio = document.getElementById("inicio");
        let business = document.getElementById("bares");
        let eventos = document.getElementById("eventos");
        if (inicio) inicio.parentElement.removeChild(inicio);
        if (business) business.parentElement.removeChild(business);
        if (eventos) eventos.parentElement.removeChild(eventos);
        
        let eventData= await this.#baradosModel.fetchDataWhere("Events",{Id:eventToShow});
        // console.log(businessData);
        let businessData= await this.#baradosModel.fetchDataWhere("Business",{Id:eventData[0].Business_Id});
        this.#baradosView.showEventInfoToUsers(eventData,businessData);
        this.#baradosView.bindShowABusiness(this.HandleShowABusiness);
    }
}

export default BaradosController;