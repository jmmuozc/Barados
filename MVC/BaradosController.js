"use strict"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// Crear un cliente para interactuar con la bbdd de supabase

class BaradosController {
    #baradosModel;
    #baradosView;
    #supabaseConection = createClient('https://wcqazpjgyqxtpiytqezb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjcWF6cGpneXF4dHBpeXRxZXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIyNTI1NDcsImV4cCI6MTk5NzgyODU0N30.4G_KX9VntK8GeNGZpAdM7CcxqN264hySeaHw3pe5fHg');
    constructor(baradosModel, baradosView) {
        this.#baradosModel = baradosModel;
        this.#baradosView = baradosView;

        // Lo invocamos en el constructor como primer evento ya que el resto necesitarán que la carga inicial se haya producido.
        this.onLoad();

        // this.onInit();
        console.log(this.#supabaseConection);
        // Enlazamos handlers con la vista
        this.#baradosView.bindInit(this.handleInit);
    }

    onLoad = () => {



    }


    fetchBusiness = async () => {

        const { data, error } = await this.#supabaseConection
            .from('Business')
            .select()

        if (error) return error;
        if (data) return data;
    }
}

export default BaradosController;