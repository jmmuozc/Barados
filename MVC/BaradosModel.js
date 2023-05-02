import Business from "../Js/Business.js";
import Customer from "../Js/Customer.js";
import Event from "../Js/Event.js";
import { BusinessExists,CustomerExists,EventExists,InvalidObject } from "../Js/Exceptions.js";
class Barados {

    #Customers = [];
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
      * Dado un customer, devuelve la posición de ese customer en el array de customers o -1 si no lo encontramos
      * @param {Customer} customer 
      * @returns Devolvemos la posicion en caso de que se encuentre
    */
    #getCustomerPosition(customer) {
        if (!(customer instanceof Customer)) {
            throw new InvalidObject();
        }
        // Creamos un patron para la busqueda de findIndex
        function compareElements(element) {
            // Comprobamos que el customer del array y del objeto introducido tenga el mismo email
            return (element.customer.email === customer.email)
        }

        return this.#Customers.findIndex(compareElements);
    }

    /**
      * Dado un event, devuelve la posición de ese event en el array de events o -1 si no lo encontramos
      * @param {Event} event 
      * @returns Devolvemos la posicion en caso de que se encuentre
    */
    #getEventPosition(event) {
        if (!(event instanceof Event)) {
            throw new InvalidObject();
        }
        // Creamos un patron para la busqueda de findIndex
        function compareElements(element) {
            // Comprobamos que el event del array y del objeto introducido tenga el mismo id
            return (element.event.id === event.id)
        }

        return this.#Events.findIndex(compareElements);
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

    /**
      * Crea un objeto Customer
      * @param {Number} id 
      * @param {String} name 
      * @param {String} genre
      * @param {Date} birth 
      * @param {Number} subscription 
      * @param {String} image 
      * @returns Objeto Customer creado
    */
    customerFactory(id, name = "", email, genre, birth, subscription, image) {
        let createdCustomer = new Customer(id, name, email, genre, birth, subscription, image);
        // Comprueba la posicion del customer en la Array principal de customers
        let position = this.#getCustomerPosition(createdCustomer);
        if (position === -1) {
            // Devuelve el objeto creado
            return createdCustomer;
        } else throw new CustomerExists();

    }

    /**
      * Crea un objeto Event
      * @param {Number} id 
      * @param {Number} businessId 
      * @param {String} name
      * @param {Date} eventStart
      * @param {Date} eventEnd 
      * @param {String} description 
      * @param {Number} capacity 
      * @returns Objeto Event creado
    */
    eventFactory(id, businessId, name, eventStart, eventEnd, description, capacity) {
        let createdEvent = new Event(id, businessId, name, eventStart, eventEnd, description, capacity);
        // Comprueba la posicion del event en la Array principal de events
        let position = this.#getEventPosition(createdEvent);
        if (position === -1) {
            // Devuelve el objeto creado
            return createdEvent;
        } else throw new EventExists();

    }

}

export default Barados;