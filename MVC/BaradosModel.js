import Customer from "../Js/Customer.js";
import Owner from "../Js/Owner.js";
import Business from "../Js/Business.js";
import Event from "../Js/Event.js";
import { BusinessExists, BusinessNoExists, CustomerExists, CustomerNoExists, OwnerExists, OwnerNoExists, EventExists, EventNoExists, InvalidObject } from "../Js/Exceptions.js";
class Barados {

    #CustomersList = [];
    #OwnerList = [];
    #BusinessList = [];
    #EventsList = [];

    /*
    Estructura de datos
    CustomerList: [ Array de Usuarios
    {
        Customer: Cliente
        Events: Eventos en los que participa el cliente
    }
    ]
    OwnerList: [
        {
            Owner: Propietario
            business: [business,business] Array con la referencia de los business del Owner
        }
    ]
    BusinessList: [Array de Empresas
    {
        Business: Empresa
        Events: Eventos que la empresa organiza
    }
    ]
    EventsList: [] Array de Eventos
     */

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

        return this.#BusinessList.findIndex(compareElements);
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

        return this.#CustomersList.findIndex(compareElements);
    }

    /**
      * Dado un owner, devuelve la posición de ese owner en el array de owners o -1 si no lo encontramos
      * @param {Customer} owner 
      * @returns Devolvemos la posicion en caso de que se encuentre
    */
    #getOwnerPosition(owner) {
        if (!(owner instanceof Owner)) {
            throw new InvalidObject();
        }
        // Creamos un patron para la busqueda de findIndex
        function compareElements(element) {
            // Comprobamos que el owner del array y del objeto introducido tenga el mismo email
            return (element.owner.email === owner.email)
        }

        return this.#OwnerList.findIndex(compareElements);
    }

    /**
      * Dado un event, devuelve la posición de ese event en el array de events o -1 si no lo encontramos
      * @param {Event} event 
      * @returns Devolvemos la posicion en caso de que se encuentre
    */
    #getEventPosition(event, eventsList = this.#EventsList) {
        if (!(event instanceof Event)) throw new InvalidObject();
        // Creamos un patron para la busqueda de findIndex
        function compareElements(element) {
            // Comprobamos que el event del array y del objeto introducido tenga el mismo id
            return (element.event.id === event.id)
        }

        return eventsList.findIndex(compareElements);
    }

    constructor() {
        console.log("Model working");
    }

    /**
     * Añade un objeto customer a la array de customers
     * @param {Customer} customer 
     */
    addCustomer(customer) {
        // Comprueba que el objeto introducido es un customer
        if (!(customer instanceof Customer)) throw new InvalidObject();
        // Comprueba que el customer no existe 
        if (this.#getCustomerPosition(customer) != -1) throw new CustomerExists();
        // En caso de que no exista lo introduce
        this.#CustomersList.push(
            {
                customer: customer,
                events: []
            })

    }

    /**
     * Elimina un objeto Customer del modelo
     * @param {Customer} customer 
     */
    removeCustomer(customer) {
        // Comprueba que el objeto introducido es un customer
        if (!(customer instanceof Customer)) throw new InvalidObject();
        // Comprueba que el customer existe
        if (this.#getCustomerPosition(customer) != -1) {
            // Se elimina el Customer segun la posicion encontrada
            this.#BusinessList.splice(this.#getCustomerPosition(customer), 1);
        } else throw new CustomerNoExists();

    }

    /**
     * Añade un objeto owner a la array de owners
     * @param {Owner} owner 
     */
    addOwner(owner) {
        // Comprueba que el objeto introducido es un owner
        if (!(owner instanceof Owner)) throw new InvalidObject();
        // Comprueba que el owner no existe 
        if (this.#getOwnerPosition(owner) != -1) throw new OwnerExists();
        // En caso de que no exista lo introduce
        this.#OwnerList.push(
            {
                owner: owner,
                business: []
            })

    }

    /**
     * Elimina los business del owner en cuestión y el owner del modelo
     * @param {Owner} owner 
     */
    removeOwner(owner) {
        // Comprueba que el objeto introducido es un owner
        if (!(owner instanceof Owner)) throw new InvalidObject();
        // Comprueba que el owner no existe 
        let ownerPosition=this.#getOwnerPosition(owner);
        if (ownerPosition === -1) throw new OwnerNoExists();
        // Recorre todos los business del objeto owner
        for (let business of this.#OwnerList[ownerPosition].business) {
            this.#BusinessList.splice(this.#getBusinessPosition(business),1);
        }
        // Elimina el Owner en cuestión
        this.#OwnerList.splice(ownerPosition,1);

     }

    /**
     * Añade un objeto business a la array de business
     * @param {Business} business 
     */
    addBusiness(business) {
        // Comprueba que el objeto introducido es un business
        if (!(business instanceof Business)) throw new InvalidObject();
        // Comprueba que el business no existe 
        if (this.#getBusinessPosition(business) != -1) throw new BusinessExists();
        // En caso de que no exista lo introduce
        this.#BusinessList.push(
            {
                business: business,
                events: []
            })

    }

    removeBusiness(business) {
        if (!(business instanceof Business)) throw new InvalidObject();
        // Consigue la posicion en el array segun 
        let positionBusiness = this.#getBusinessPosition(business);
        // En caso de que exista segun username y tenga la misma posicion segun email lo borra
        if (positionBusiness != -1) {
            // Se elimina el usuario segun la posicion de cualquiera de los anteriores
            this.#BusinessList.splice(positionBusiness, 1);
        } else throw new BusinessNoExists();

    }

    /**
     * Añade un objeto event a la array de event
     * @param {Event} event 
     */
    addEvent(event) {
        // Comprueba que el objeto introducido es un event
        if (!(event instanceof Event)) throw new InvalidObject();
        // Comprueba que el event no existe 
        if (this.#getEventPosition(event) != -1) throw new EventExists();
        // En caso de que no exista lo introduce
        this.#EventsList.push(event);
    }

    /**
     * Elimina el Event de forma total del modelo
     * @param {Event} event 
     */
    removeEvent(event) {
        // Comprueba que el objeto introducido es un event
        if (!(event instanceof Event)) throw new InvalidObject();
        // Comprueba que el event existe 
        if (this.#getEventPosition(event) === -1) throw new EventNoExists();
        let eventPosition;
        // Recorre el array de Business
        for (let index of this.#BusinessList) {
            // Comprueba que el event exista dentro de cada array dentro de Business
            eventPosition = this.#getEventPosition(event, index.events);
            // En caso de que exista el evento dentro de cualquier Business
            if (eventPosition > -1) {
                // Lo elimina del business donde se ha encontrado
                index.events.splice(eventPosition, 1);
            }
        }
        // Recorre el array de customers
        for (let index of this.#CustomersList) {
            // Comprueba que el event exista dentro de cada array dentro de customers
            eventPosition = this.#getEventPosition(event, index.events);
            // En caso de que exista el event dentro de cualquier actor
            if (eventPosition > -1) {
                // el elimina del customer donde se ha encontrado
                index.events.splice(eventPosition, 1);
            }
        }
        eventPosition = this.#getEventPosition(event);
        // Se elimina de la lista principal de producciones
        this.#EventsList.splice(eventPosition, 1);
    }

    /**
      * Crea un objeto Business
      * @param {Number} id 
      * @param {String} name 
      * @param {String} location
      * @param {String} description 
      * @param {String} email 
      * @returns Objeto Business creado
    */
    businessFactory(id, name = "", location, description, email, idOwner, verified) {
        let createdBusiness = new Business(id, name, location, description, email, idOwner, verified);
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
      * @param {String} image 
      * @returns Objeto Customer creado
    */
    customerFactory(id, name = "", email, genre, birth, image) {
        let createdCustomer = new Customer(id, name, email, genre, birth, image);
        // Comprueba la posicion del customer en la Array principal de customers
        let position = this.#getCustomerPosition(createdCustomer);
        if (position === -1) {
            // Devuelve el objeto creado
            return createdCustomer;
        } else throw new CustomerExists();

    }

    /**
      * Crea un objeto Owner
      * @param {Number} id 
      * @param {String} name 
      * @param {String} genre
      * @param {Date} birth 
      * @param {String} image 
      * @returns Objeto Owner creado
    */
    ownerFactory(id, name = "", email, genre, birth, image) {
        let createdOwner = new Owner(id, name, email, genre, birth, image);
        // Comprueba la posicion del Owner en la Array principal de owner
        let position = this.#getOwnerPosition(createdOwner);
        if (position === -1) {
            // Devuelve el objeto creado
            return createdOwner;
        } else throw new OwnerExists();

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