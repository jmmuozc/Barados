import Business from "../Js/Business.js";
import Customer from "../Js/Customer.js";
import Event from "../Js/Event.js";
class Barados {

    #Users = [];
    #Business = [];
    #Events = [];

    /**
      * Dado un business, devuelve la posición de ese business en el array de business o -1 si no lo encontramos
      * @param {Business} business 
      * @returns Devolvemos la posicion en caso de que se encuentre
    */
    #getBusinessPosition(business) {
        if (!(business instanceof Business)) {
            throw new InvalidObject();
        }
        // Creamos un patron para la busqueda de findIndex
        function compareElements(element) {
            // Comprobamos que el business del array y del objeto introducido tenga el mismo email
            return (element.business.email === business.email)
        }

        return this.#Business.findIndex(compareElements);
    }

    /**
      * Crea un objeto Business
      * @param {Number} id 
      * @param {String} name 
      * @param {String} location
      * @param {String} description 
      * @param {String} email 
      * @param {Number} subscription 
      * @returns Objeto Business creado
    */
    businessFactory(id, name = "",location, description, email, subscription) {
        let createdBusiness = new Business(id,name,location, description,email,subscription);
        // Comprueba la posicion del business en la Array principal de Business
        let position = this.#getBusinessPosition(createdBusiness);
        if (position === -1) {
            // Devuelve el objeto creado
            return createdBusiness;
        } else throw new BusinessExists();

    }

}