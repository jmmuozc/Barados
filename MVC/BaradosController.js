"use strict"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// Crear un cliente para interactuar con la bbdd de supabase

class BaradosController {
    #baradosModel;
    #baradosView;
   
    constructor(baradosModel, baradosView) {
        this.#baradosModel = baradosModel;
        this.#baradosView = baradosView;

        // Lo invocamos en el constructor como primer evento ya que el resto necesitarán que la carga inicial se haya producido.
        this.onLoad();

        this.onInit();
        // Enlazamos handlers con la vista
        // this.#baradosView.bindInit(this.handleInit);
    }

    onLoad = async () => {

        let currentUserEmail=await this.#baradosModel.currentUser();
        let business = await this.#baradosModel.fetchData("Business");
        let customers = await this.#baradosModel.fetchData("Customers");
        let owners = await this.#baradosModel.fetchData("Owner");
        // let business = await this.#supabaseConection.from("Business").select();
        // let customers = await this.#supabaseConection.from("Customers").select();
        // let owners = await this.#supabaseConection.from("Owner").select();
        console.log(business);
        // console.log(customers);
        // console.log(owners);
        console.log(await this.#baradosModel.currentUser());
        if (currentUserEmail!=false){

            let currentUser= await this.#baradosModel.fetchDataWhere("Owner",{Email : currentUserEmail});
            if (currentUser.lenght==0) currentUser= await this.#baradosModel.fetchDataWhere("Customers",{Email : currentUserEmail});

            this.#baradosView.removeLogInForm();

            this.#baradosView.infoUserHeader(currentUser[0].Name, currentUser[0].Image)

        } 

        this.#baradosView.ShowBusinessCards(business);

    }

    onInit = () => {
        this.#baradosView.bindLogIn(this.HandleLogIn);
    }

    HandleLogIn = async (user, passwd) => {
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
            this.#baradosView.infoUserHeader(currentUser[0].Name, currentUser[0].Image);
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

export default BaradosController;