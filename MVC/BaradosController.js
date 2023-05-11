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

        // this.onInit();
        // Enlazamos handlers con la vista
        // this.#baradosView.bindInit(this.handleInit);
    }

    onLoad = async () => {

        // let business = this.fetchData("Business");
        // let customers = this.fetchData("Customers");
        // let owners = this.fetchData("Owner");
        let business = this.#baradosModel.fetchData("Business");
        let customers = this.#baradosModel.fetchData("Customers");
        let owners = this.#baradosModel.fetchData("Owner");
        
        for (let object of owners.data) {

            this.#baradosModel.addOwner(this.#baradosModel.ownerFactory(object.id,object.Name,object.Email,object.Genre,object.Birth_Date,object.Image));         
        }
        
        for (let object of business.data) {
            actualBusiness=this.#baradosModel.businessFactory(object.id,object.Name,object.Location,object.Description,object.Email,object.Owner,object.Verified);
            this.#baradosModel.addBusiness(actualBusiness);
        }
        
        for (let object of customers.data) {
            this.#baradosModel.addCustomers(this.#baradosModel.customerFactory(object.id,object.Name,object.Email,object.Genre,object.Birth_Date,object.Image));
        }
        console.log(business.data);
        console.log(customers.data);
        console.log(owners.data);

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