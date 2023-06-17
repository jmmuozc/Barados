"use strict"

class BaradosController {
    #baradosModel;
    #baradosView;

    constructor(baradosModel, baradosView) {
        this.#baradosModel = baradosModel;
        this.#baradosView = baradosView;

        // Lo invocamos en el constructor como primer evento ya que el resto necesitarán que la carga inicial se haya producido.
        this.onLoad();

        this.onInit();

    }

    onLoad = async () => {

        let business = await this.#baradosModel.fetchData("Business");
        let customers = await this.#baradosModel.fetchData("Customers");
        let events = await this.#baradosModel.fetchData("Events");

        if (!sessionStorage.getItem("action")) {
            this.#baradosView.ShowBusinessCards(business, 3);
            this.#baradosView.ShowEventsCards(events, 3)
            this.#baradosView.bindShowABusiness(this.HandleShowABusiness);
            this.#baradosView.bindShowAEvent(this.HandleShowAEvent);
        }
        
    }
    
    onInit =async () => {
        let currentUserEmail = await this.#baradosModel.currentUser();

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
            if (currentUser.length!=0) {
                sessionStorage.setItem("currentUser", user);
        

        
                this.#baradosView.removeLogInForm();
        
    
                this.#baradosView.infoUserHeader(currentUser[0].Name, currentUser[0].Image);
        
                this.#baradosView.bindLogOff(this.HandleLogOff);
        
                this.#baradosView.bindShowUserSubMenu(this.HandleUserSubMenu);
                
            }else{
                await this.#baradosModel.logOff();
            }
    
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
        let encryptedPasswd = CryptoJS.enc.Hex.stringify(CryptoJS.SHA1(passwd));
       user=user.toLowerCase();
        try {
            currentUserEmail = await this.#baradosModel.logIn(user, passwd);
            
            if (await this.#baradosModel.fetchDataWhere("Business", { Email: user,Password: encryptedPasswd })) currentUserEmail=user;
                

        } catch (error) {
            
        }

      
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
            this.#baradosView.infoUserHeader(currentUser[0].Name, currentUser[0].Image);
            this.#baradosView.bindLogOff(this.HandleLogOff);
            this.#baradosView.bindShowUserSubMenu(this.HandleUserSubMenu);

        } else {
            this.#baradosView.showFeedback("Correo o contraseña incorrectos",0);
        }

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

        if (inicio) inicio.parentElement.removeChild(inicio);

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

        let businessData= await this.#baradosModel.fetchDataWhere("Business",{Id:eventData[0].Business_Id});
        let countEvent= await this.#baradosModel.fetchDataSelect("Event_Customers","Event_Id(count)",{Event_Id:eventToShow});
        eventData.push(countEvent);
        this.#baradosView.showEventInfoToUsers(eventData,businessData);
        this.#baradosView.bindShowABusiness(this.HandleShowABusiness);
        this.#baradosView.bindJoinEvent(this.HandleJoinEvent);
    }

    HandleJoinEvent=async (eventToJoin)=>{
        let currentUser=sessionStorage.getItem("currentUser");
        let event= await this.#baradosModel.fetchDataWhere("Events",{Id:eventToJoin});
        let business = document.getElementById("bares");
        let eventos = document.getElementById("eventos");
        if (!sessionStorage.getItem("currentUser")) {
            this.#baradosView.changeJoinButton("Debes iniciar sesión apuntarte","danger");
            
        }else{
            currentUser=currentUser.split(",")
 
            if (currentUser[0]=="Customers") {
               let count= await this.#baradosModel.fetchDataSelect("Event_Customers","Customer_Id(count)",{Customer_Id: currentUser[1],Event_Id:eventToJoin});
               let countEvent= await this.#baradosModel.fetchDataSelect("Event_Customers","Event_Id(count)",{Event_Id:eventToJoin});

                if (count.length>0) {
                    this.#baradosView.changeJoinButton("Ya estas apuntado","danger");       
                }else{
                    if (event.Capacity==countEvent.length) {
                        this.#baradosView.changeJoinButton("El evento esta completo","danger");       
                        
                    }
                    this.#baradosModel.insertInto("Event_Customers",{Event_Id:eventToJoin, Customer_Id: currentUser[1]});

                    if (business) business.parentElement.removeChild(business);
                    if (eventos) eventos.parentElement.removeChild(eventos);
                    
                    let eventData= await this.#baradosModel.fetchDataWhere("Events",{Id:eventToJoin});

                    let businessData= await this.#baradosModel.fetchDataWhere("Business",{Id:eventData[0].Business_Id});
                    countEvent= await this.#baradosModel.fetchDataSelect("Event_Customers","Event_Id(count)",{Event_Id:eventToJoin});
                    eventData.push(countEvent);
                    this.#baradosView.showEventInfoToUsers(eventData,businessData);
                    this.#baradosView.bindShowABusiness(this.HandleShowABusiness);
                    this.#baradosView.bindJoinEvent(this.HandleJoinEvent);     
                    this.#baradosView.changeJoinButton("Te has apuntado con éxito","success");
                }
            }else{
                this.#baradosView.changeJoinButton("Debes ser cliente para apuntarte","warning");
            }
        }
    }
    
}

export default BaradosController;