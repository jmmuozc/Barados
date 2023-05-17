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

        let business = await this.#baradosModel.fetchData("Business");
        let customers = await this.#baradosModel.fetchData("Customers");
        let owners = await this.#baradosModel.fetchData("Owner");
        // let business = await this.#supabaseConection.from("Business").select();
        // let customers = await this.#supabaseConection.from("Customers").select();
        // let owners = await this.#supabaseConection.from("Owner").select();
        // console.log(business[0].Name);
        // console.log(customers);
        // console.log(owners);

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

            console.log("loginCorrecto");
            this.#baradosView.infoUserHeader("Berenjena");
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
    // fetchData = async (table) => {

        // let {data, error}= await this.#supabaseConection.from(table).select();
        // let fetched= await this.#supabaseConection.from(table).select();

        // if (error) {
        //     console.log(error);
        // }

        // if (data) {
        //     return data;
        // }
        // console.log(table);
        // console.log(fetched);
        // return fetched;
    // }
}

export default BaradosController;