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
        this.#baradosView.bindShowBusinessForm(this.HandleshowBusinessForm);
        this.#baradosView.bindShowUserForm(this.HandleshowUserForm);
    }

    HandleshowOwnerForm =() =>{
        this.#baradosView.showOwnerForm();
    }
    HandleshowBusinessForm =() =>{
        this.#baradosView.showBusinessForm();
    }
    HandleshowUserForm =() =>{
        this.#baradosView.showUserForm();
    }
}

export default BaradosControllerUsers;