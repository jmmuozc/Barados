"use strict";

import { logInValidation, newBusinessValidation, newOwnerValidation, newClientValidation,updateOwnerValidation,updateUserValidation, updateBusinessValidation,newEventValidation } from "./validation.js";

class BaradosView {

  constructor() {
    // Recogemos el main
    this.main = document.getElementsByTagName("main")[0];

  }

  #excecuteHandler(handler, handlerArguments, scrollElement, data, url, event) {
    handler(handlerArguments);
    $(scrollElement).get(0).scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
  }

  infoUserHeader(name, image) {
  
    this.removeLogInForm();
    if (document.getElementById("user-header") == null) {
      let header = document.getElementById("navbarSupportedContent");
      let userSubMenu = document.getElementById("sub-menu");
      let userDiv = document.createElement("div");
      userDiv.setAttribute("class", "d-flex align-items-center ms-3 me-3");
      userDiv.setAttribute("id", "user-header");
      userDiv.innerHTML = `
      <div>
      <img src="${image}" class="me-3 user-image user-img" alt="user Image" />
      </div>
      <div">
      <p class="nav-link align-middle " id="username">${name}</p>
      </div>`;
      header.appendChild(userDiv);

      userSubMenu.innerHTML = `<div class="sub-menu">
      <div class="user-info">
          <img src="${image}" class="me-3 user-image" alt="user Image" />
          <h3>${name}</h3>
      </div>
      <hr/>
      <a href="users.html" class="sub-menu-link">
          <img src="/Media/edit-user-icon.png" alt="edit-user-icon.png">
          <p>Editar Perfil</p>
          <span>></span>
      </a>
      <a href="#" class="sub-menu-link" id="LogOff">
          <img src="/Media/logout-icon.png" alt="/Media/logout-icon.png">
          <p>Cerrar Sesión</p>
          <span>></span>
      </a>
  </div>`;

    }

  }


  removeLogInForm() {
    if (document.getElementsByClassName("LogInForm")) {
      let logInElements = Array.from(document.getElementsByClassName("LogInForm"));

      logInElements.forEach(element => {
        element.parentElement.removeChild(element);
      });
    }
  }

  ShowIndex(businessElement, eventsElement, MAX) {
    let logIn = document.getElementById("contacto");
    let parent = document.getElementsByTagName("body");
    let init = document.createElement("section");
    init.setAttribute("id", "inicio");
    init.setAttribute("class", "py-5");
    init.innerHTML = `<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h2 class="mb-3">Bienvenido a Barados</h2>
            <p class="lead">
                Encuentra los mejores centros de ocio de la ciudad en un solo lugar.
            </p>
        </div>
    </div>
</div>`;
    let business = document.createElement("section");
    business.setAttribute("id", "bares");
    business.setAttribute("class", "py-5 bg-light");

    let events = document.createElement("section");
    events.setAttribute("id", "eventos");
    events.setAttribute("class", "py-5");

    if (!document.getElementById("inicio")) parent[0].insertBefore(init, logIn);
    if (!document.getElementById("bares")) parent[0].insertBefore(business, logIn);
    if (!document.getElementById("eventos")) parent[0].insertBefore(events, logIn);

    this.ShowBusinessCards(businessElement, MAX);
    this.ShowEventsCards(eventsElement, MAX);
  }

  ShowBusinessCards(business, MAX) {

    let businessContainer = document.getElementById("bares");
    businessContainer.innerHTML = `
    <div class="container">
      <div class="row">
          <div class="col-md-12">
              <h2 class="mb-3">Centros de ocio</h2>
          </div>
      </div>
      <div class="row d-flex justify-content-center gap-5" id="baresDisplay">
    
      </div>
    </div>`;

    let businessDiv = document.getElementById("baresDisplay");
    let arrayExistent = [];
    let rng;
    if (business.length == 0) {
      let newBusiness = document.createElement("div");
      newBusiness.setAttribute("class", "container");
      newBusiness.innerHTML = `<h3>Oops... parece que no hay ningun centro de ocio</h3>
      <p>Los centros de ocio disponibles aparecerán aquí</p>`;
      businessDiv.appendChild(newBusiness);
    } else {

      for (let index = 0; index < MAX; index++) {
        do {
          rng = Math.floor(Math.random() * (business.length));
        } while (arrayExistent.includes(rng) && arrayExistent.length != business.length);
        if (!arrayExistent.includes(rng)) {
          arrayExistent.push(rng);

          let newBusiness = document.createElement("div");
          newBusiness.setAttribute("class", "card col-md-3 col-lg-3");
          newBusiness.innerHTML = `
          <img src="${business[rng].Image}" class="card-img-top bar-img" alt="${business[rng].Name}" width=350px height=250px/>
          <h3 class="card-title bar-title">${business[rng].Name}</h3>
          <div class="card-body d-flex flex-column justify-content-between">
          <span class="card-text bar-description">
          ${business[rng].Description}
          </span>
          <a href="#BusinessInfo" class="btn btn-primary btn-lg showBusinessInfo" data-business='${business[rng].Id}'>Ver</a>
          </div>
      
          `;
          businessDiv.appendChild(newBusiness);
        }
      }
    }

   
  }

  ShowBusinessCardsOfOwners(business, MAX) {
    let businessContainer = document.getElementById("bares");
    businessContainer.innerHTML = `
    <div class="container">
      <div class="row">
          <div class="col-md-12" id="baresCabecera">
              <h2 class="mb-3">Centros de ocio</h2>
          </div>
      </div>
      <div class="row d-flex justify-content-center gap-5" id="baresDisplay">
    
      </div>
    </div>`;

    let businessDiv = document.getElementById("baresDisplay");
    let arrayExistent = [];
    let rng;
    if (business.length == 0) {
      let newBusiness = document.createElement("div");
      newBusiness.setAttribute("class", "container");
      newBusiness.innerHTML = `<h3>Oops... parece que no hay ningun centro de ocio</h3>
      <p>Los centros de ocio disponibles aparecerán aquí</p>`;
      businessDiv.appendChild(newBusiness);
    } else {

      for (let index = 0; index < MAX; index++) {
        do {
          rng = Math.floor(Math.random() * (business.length));
        } while (arrayExistent.includes(rng) && arrayExistent.length != business.length);
        if (!arrayExistent.includes(rng)) {
          arrayExistent.push(rng);

          let newBusiness = document.createElement("div");
          newBusiness.setAttribute("class", "card mb-4 col-md-3 col-lg-3");
          newBusiness.innerHTML = `
          <img src="${business[rng].Image}" class="card-img-top bar-img" alt="${business[rng].Name}" width=350px height=250px/>
          <div class="card-body">
          <h3 class="card-title bar-title">${business[rng].Name}</h3>
          <p class="card-text bar-description">
          ${business[rng].Description}
          </p>
          <a href="#BusinessInfo" class="btn btn-primary btn-lg showBusinessInfo" data-business='${business[rng].Id}'>Ver</a>
          </div>
          `;
          businessDiv.appendChild(newBusiness);
        }
        let cardBody = document.getElementsByClassName("card-body");
        cardBody[index].setAttribute("class","card-body d-flex flex-column justify-content-between");
        cardBody[index].innerHTML = `
        <h3 class="card-title event-name">${business[rng].Name}</h3>
          <span class="card-text event-description">
            ${business[rng].Description}
          </span>
          <div class="d-flex justify-content-around">
          <button type="button" class="btn btn-danger btn-lg warningBusiness" data-bs-toggle="modal" data-bs-target="#exampleModal" data-business='${business[rng].Id}'>Eliminar</button>
          </div>
          `;
      }
    }
  }

  ShowEventsCards(events, MAX) {
    let eventContainer = document.getElementById("eventos");
    eventContainer.innerHTML = `
    <div class="container">
      <div class="row">
          <div class="col-md-12">
              <h2 class="mb-3">Eventos</h2>
          </div>
      </div>
      <div class="row d-flex justify-content-center gap-5" id="eventosDisplay">
    
      </div>
    </div>`;

    let eventsDiv = document.getElementById("eventosDisplay");
    let arrayExistent = [];
    let rng;
    if (events.length == 0) {
      let newEvent = document.createElement("div");
      newEvent.setAttribute("class", "container");
      newEvent.innerHTML = `<h3>Oops... parece que no hay ningun evento disponible</h3>
      <p>Los eventos disponibles aparecerán aquí</p>`;
      eventsDiv.appendChild(newEvent);
    } else {
      for (let index = 0; index < MAX; index++) {
        do {
          rng = Math.floor(Math.random() * (events.length));
        } while (arrayExistent.includes(rng) && arrayExistent.length != events.length);
        if (!arrayExistent.includes(rng)) {
          arrayExistent.push(rng);

          let newEvent = document.createElement("div");
          newEvent.setAttribute("class", "card mb-4 col-md-3 col-lg-3");
          newEvent.innerHTML = `
            <img src="${events[rng].Image}" class="card-img-top event-img" alt="${events[rng].Name}" width=350px height=250px/>
            <h3 class="card-title event-name">${events[rng].Name}</h3>
            <div class="card-body d-flex flex-column justify-content-between">
                <span class="card-text event-description">
                  ${events[rng].Description}
                </span>
                <a href="#EventInfo" class="btn btn-primary btn-lg showEventInfo" data-events='${events[rng].Id}'>Ver</a>
        </div>
        `;

          eventsDiv.appendChild(newEvent);
        }
      }
    }
  }

  ShowEventsCardsOfUsersInfo(events, MAX, user) {
    let eventContainer = document.getElementById("eventos");
    eventContainer.innerHTML = `
    <div class="container">
      <div class="row">
          <div class="col-md-12" id="MostrarEventos">
              <h2 class="mb-3">Eventos</h2>
          </div>
      </div>
      <div class="row d-flex justify-content-center gap-5" id="eventosDisplay">
    
      </div>
    </div>`;

    let eventsDiv = document.getElementById("eventosDisplay");
    let arrayExistent = [];
    let rng;
    if (events.length == 0) {
      let newEvent = document.createElement("div");
      newEvent.setAttribute("class", "container");
      newEvent.innerHTML = `<h3>Oops... parece que no hay ningun evento disponible</h3>
      <p>Los eventos disponibles aparecerán aquí</p>`;
      eventsDiv.appendChild(newEvent);
    } else {
      for (let index = 0; index < MAX; index++) {
        do {
          rng = Math.floor(Math.random() * (events.length));
        } while (arrayExistent.includes(rng) && arrayExistent.length != events.length);
        if (!arrayExistent.includes(rng)) {
          arrayExistent.push(rng);

          let newEvent = document.createElement("div");
          newEvent.setAttribute("class", "card mb-4 col-md-6 col-lg-4");
          newEvent.innerHTML = `
            <img src="${events[rng].Image}" class="card-img-top event-img" alt="${events[rng].Name}" width=350px height=250px/>
            <div class="card-body d-flex flex-column justify-content-between container">

        </div>
        `;
          eventsDiv.appendChild(newEvent);

          if (user[0] == "Customers") {

            let cardBody = document.getElementsByClassName("card-body");
            cardBody[index].innerHTML = `<h3 class="card-title event-name">${events[rng].Name}</h3>
          <p class="card-text event-description">
            ${events[rng].Description}
          </p>
          <button type="button" class="btn btn-danger btn-lg warningEvent" data-events='${events[rng].Id}'>Desapuntarse</button>
          `;

          } else {
            let cardBody = document.getElementsByClassName("card-body");

            cardBody[index].innerHTML = `<h3 class="card-title event-name">${events[rng].Name}</h3>
          <span class="card-text event-description">
            ${events[rng].Description}
          </span>
          <div class="d-flex justify-content-around">
          <button type="button" class="btn btn-danger btn-lg warningEvent" data-bs-toggle="modal" data-bs-target="#exampleModal" data-events='${events[rng].Id}'>Eliminar</button>
          </div>
          `;

          }
        }
      }

    }
  }

  setUpLogIn() {
    let userHeader = document.getElementById("user-header");
    let userSubMenu = document.getElementById("sub-menu");
    let infoDiv = document.getElementsByClassName("infoDiv");

    userSubMenu.classList.toggle("open-menu");
    userSubMenu.innerHTML = "";
    userHeader.parentElement.removeChild(userHeader);
    infoDiv[0].innerHTML = ` <div class="col-md-6 LogInForm">
    <!-- enctype='multipart/form-data' -->
    <form action="" role="form" name="flogIn" >
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" name="email" class="form-control" autocomplete="email" required id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
            <div class="invalid-feedback">
                Por favor introduce un correo electrónico válido.
              </div>
        </div>
        <a href="users.html" class="LogInForm-change">¿No tienes cuenta? Registrate</a>
       
        <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" name="passwd" class="form-control" autocomplete="current-password"
            required id="password"/>
            <div class="invalid-feedback">
               Por favor introduce una contraseña.
            </div>
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary">Iniciar</button>
        </div>
    </form>
</div>
<div class="col-md-6">
    <div class="card">
        <div class="card-body">
            <h3 class="card-title">Información de contacto</h3>
            <p class="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                blandit justo in tincidunt mattis. Nulla ac lorem id est
                ultricies laoreet.
            </p>
            <p class="card-text">
                <strong>Teléfono:</strong> (123) 456-7890
            </p>
            <p class="card-text">
                <strong>Email:</strong> barados@gmail.com
            </p>
            <p class="card-text">
                <strong>Dirección:</strong> 123 Fake St, Anytown USA
            </p>
        </div>
    </div>
</div>`;
  }


  showOwnerForm() {
    let userSubMenu = document.getElementById("sub-menu");
    userSubMenu.innerHTML = "";

    let placeHolder = document.getElementById("signUp");
    placeHolder.innerHTML = ` <section class="py-5 px-5 my-5 container" id="signUpContainer">
  <form class="border border-3 py-5 px-5 row justify-content-center" id="signUpForm" action="" role="form" name="fOwner">
  <span id="returnSpan">< Volver</span>
  <div class="form-group col-12">
      <h2>Nuevo Propietario</h2>
  </div>
  <div class="row justify-content-center" id="formContainer">
  <div class="form-group col-12 ">
      <label for="name">Nombre</label>
      <input type="text" name="name" class="form-control" autocomplete="name" required id="name"/>
      <div class="invalid-feedback">
      Introduce un nombre
    </div>
  </div>
 
  <div class="form-group col-6 ">
  <label for="genre">Género</label>
  <select class="form-select" name="genre" id=genre>
  <option value="No especificado" selected>Prefiero no decirlo</option>
  <option value="Hombre">Hombre</option>
  <option value="Mujer">Mujer</option>
  <option value="No binario">No binario</option>
  </select>
  </div>
  <div class="form-group col-6 ">
      <label for="birth">Nacido</label>
      <input type="date" name="birth" class="form-control" autocomplete="birth" required id="birth"/>
      <div class="invalid-feedback">
      Introduce una fecha válida
    </div>
      
  </div>
  <div class="form-group col-12 ">
      <label for="email">Email</label>
      <input type="email" name="email" class="form-control" autocomplete="email" required id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
      <div class="invalid-feedback">
        Por favor introduce un correo electrónico válido.
      </div>
  </div>
  <div class="form-group col-12 ">
      <label for="password">Contraseña</label>
      <input type="password" name="passwd" class="form-control" autocomplete="current-password"
          required id="password"  pattern=".{6,}"/>
          <div class="invalid-feedback">
          La contraseña debe tener 6 caracteres mínimo.
        </div>
  </div>
 
  <div class="form-group col-12 ">
      <label for="profilePic">Imagen de perfil</label>
      <input type="file" name="profilePic" class="form-control" id="profilePic"/>
  </div>
  <div class="form-group col-12">
      <button type="submit" class="btn btn-primary mt-3">Registrarse</button>
  </div>
  </div>
</form>
</section>`;
  }

  showBusinessForm(owner) {
    let modalPlaceHolder=document.getElementById("exampleModal");
    modalPlaceHolder.innerHTML=`
    <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="auxiliarModal">Crear Negocio</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form class="border border-3 py-5 px-5 row justify-content-center" id="BusinessForm" action="" role="form" name="fBusiness">
      <div class="row justify-content-center" id="formContainer">
 <div class="form-group col-12 ">
     <label for="businessName">Nombre</label>
     <input type="text" name="businessName" class="form-control" autocomplete="name" required id="businessName" value=""/>
 </div>

 <div class="form-group col-12 ">
 <label for="businessDesc">Descripcion</label>
 <textarea name="businessDesc" cols="55" rows="7" class="descArea form-control" id="businessDesc">
 
 </textarea>
 </div>
 <div class="form-group col-12 ">
    <label for="owner">Propietario</label>
    <select class="form-select" name="owner" id="owner">
    <option value="${owner[1]}" selected readonly>${owner[2]}</option>
    </select>
</div>

 <div class="form-group col-6 ">
     <label for="latitud">Latitud</label>
     <input type="number" name="latitud" max="90" min="-90" class="form-control" required id="latitud" value=""/>

 </div>
 <div class="form-group col-6 ">
     <label for="longitud">Longitud</label>
     <input type="number" name="longitud" max="180" min="-180" class="form-control" required id="longitud" value=""/>

 </div>

 <div class="form-group col-12 ">
     <label for="businessEmail">Email</label>
     <input type="email" name="businessEmail" class="form-control" autocomplete="email" required id="businessEmail" value=""/>
 </div>

 <div class="form-group col-12 ">
        <label for="password">Contraseña</label>
        <input type="password" name="passwd" class="form-control" autocomplete="current-password"
            required pattern=".{6,}" id="password"/>
            <div class="invalid-feedback">
            La contraseña debe tener 6 caracteres mínimo.
          </div>
    </div>

 <div class="form-group col-12 ">
     <label for="businessProfilePic">Nueva Imagen de perfil</label>
     <input type="file" name="businessProfilePic" class="form-control" id="businessProfilePic"/>
 </div>
 <div class="form-group col-12">
     <button type="submit" class="btn btn-primary mt-3">Crear</button>
 </div>
    </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
    `;

  }

  

  showUserForm() {
    let placeHolder = document.getElementById("signUp");
    placeHolder.innerHTML = ` <section class="py-5 px-5 my-5 container" id="signUpContainer">
    <form class="border border-3 py-5 px-5 row justify-content-center" id="signUpForm" action="" role="form" name="fUser">
    <span id="returnSpan">< Volver</span>
    <div class="form-group col-12">
        <h2>Nuevo Usuario</h2>
    </div>
    <div class="row justify-content-center" id="formContainer">
    <div class="form-group col-12 ">
        <label for="name">Nombre</label>
        <input type="text" name="name" class="form-control" autocomplete="name" required id="name"/>
        <div class="invalid-feedback">
        Introduce un nombre
      </div>
    </div>
   
    <div class="form-group col-6 ">
    <label for="genre">Género</label>
    <select class="form-select" name="genre" id="genre">
    <option value="No especificado" selected>Prefiero no decirlo</option>
    <option value="Hombre">Hombre</option>
    <option value="Mujer">Mujer</option>
    <option value="No binario">No binario</option>
    </select>
    </div>
    <div class="form-group col-6 ">
        <label for="birth">Nacido</label>
        <input type="date" name="birth" class="form-control" autocomplete="birth" required id="birth"/>
        <div class="invalid-feedback">
        Introduce una fecha válida
      </div>
    </div>
    <div class="form-group col-12 ">
        <label for="email">Email</label>
        <input type="email" name="email" class="form-control" autocomplete="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/ id="email"> 
        <div class="invalid-feedback">
          Por favor introduce un correo electrónico válido.
        </div>
    </div>
    <div class="form-group col-12 ">
        <label for="password">Contraseña</label>
        <input type="password" name="passwd" class="form-control" autocomplete="current-password"
            required pattern=".{6,}" id="password"/>
            <div class="invalid-feedback">
            La contraseña debe tener 6 caracteres mínimo.
          </div>
    </div>
   
    <div class="form-group col-12 ">
        <label for="profilePic">Imagen de perfil</label>
        <input type="file" name="profilePic" class="form-control" id="profilePic"/>
    </div>
    <div class="form-group col-12">
        <button type="submit" class="btn btn-primary mt-3">Registrarse</button>
    </div>
    </div>
  </form>
  </section>`;

  }

  ShowSignUpForms() {
    let placeHolder = document.getElementById("signUp");
    placeHolder.innerHTML = `<div class="container">
    <div class="row text-center">
        <h2>Registrarse Como...</h2>
    </div>
   
        <div class="row justify-content-center">
            <div class="col-md-5 col-lg-4 mt-2">
                <div class="card-header text-bg-secondary text-center">Propietario</div>
                <div class="card text-bg-secondary rounded-bottom signUpCard" id="showOwnerForm">
                    <img src="Media/owner-icon.png" class="card-img  rounded-bottom" alt="owner-icon.png">
                </div>
            </div>

            <div class="col-md-5 col-lg-4 mt-2">
                <div class="card-header text-bg-secondary text-center">Usuario</div>
                <div class="card text-bg-secondary signUpCard" id="showUserForm">
                    <img src="Media/client-icon.png" class="card-img" alt="client-icon.png">
                </div>
            </div>

        </div>`;
  }

  showOwnerInfo(user, bar) {
    let placeHolder = document.getElementById("signUp");
    placeHolder.setAttribute("class", "py-3 main d-flex justify-content-center flex-column m-auto");
    placeHolder.innerHTML = `<div class="container row border border-3">
     <div class="container col-4 d-flex justify-content-center align-items-center">
     <img src="${user[0].Image}" class="me-3 " alt="user Image" id="userInfo" >
     </div>
     <div class="container col-6">
     <form class=" py-5 px-5 row justify-content-center" id="signUpForm" action="" role="form" name="fUpdateOwner">
     <div class="form-group col-12">
     <h2>Actualizar Propietario</h2>
 </div>
 <div class="row justify-content-center" id="formContainer">
 <div class="form-group col-12 ">
     <label for="name">Nombre</label>
     <input type="text" name="name" class="form-control" autocomplete="name" required id="name" value="${user[0].Name}"/>
     <div class="invalid-feedback">
     Introduce un nombre
   </div>
 </div>

 <div class="form-group col-6 ">
 <label for="genre">Género</label>
 <select class="form-select" name="genre" id="genre">
 <option value="${user[0].Genre}" selected disabled>${user[0].Genre}</option>
 <option value="Hombre">Hombre</option>
 <option value="Mujer">Mujer</option>
 <option value="No binario">No binario</option>
 </select>
 </div>
 <div class="form-group col-6 ">
     <label for="birth">Nacido</label>
     <input type="date" name="birth" class="form-control" autocomplete="birth" required id="birth" value="${user[0].Birth_Date}" readonly/>
 </div>
 <div class="form-group col-12 ">
     <label for="email">Email</label>
     <input type="email" name="email" class="form-control" autocomplete="email" required id="email" value="${user[0].Email}" readonly/>
 </div>
 <div class="form-group col-12 ">
     <label for="profilePic">Nueva Imagen de perfil</label>
     <input type="file" name="profilePic" class="form-control" id="profilePic"/>
     <div class="invalid-feedback">
     La contraseña debe tener 6 caracteres mínimo.
   </div>
 </div>
 <div class="form-group col-12">
     <button type="submit" class="btn btn-primary mt-3">Actualizar</button>
 </div>
 </div>
     </form>
     </div>
    </div>
    <section id="bares" class="py-5 flex-column">
    
    </section>`;

    let barPlaceHolder = document.getElementById("bares");

    placeHolder.appendChild(barPlaceHolder);

    this.ShowBusinessCardsOfOwners(bar, bar.length);

    let cabecera=document.getElementById("baresCabecera");
    let boton;
    if (!document.getElementById("CreateBusiness")) boton=document.createElement("button");
    boton.setAttribute("type","button");

    boton.setAttribute("class","btn btn-success");
    boton.setAttribute("id","CreateBusiness");
    boton.setAttribute("data-bs-toggle","modal");
    boton.setAttribute("data-bs-target","#exampleModal");
    boton.innerHTML=`Crear Negocio`;

    cabecera.appendChild(boton);
  }

  showCustomerInfo(user, events,currentUser) {
    let placeHolder = document.getElementById("signUp");
    placeHolder.setAttribute("class", "py-3 main d-flex justify-content-center flex-column m-auto");
    placeHolder.innerHTML = `<div class="container row border border-3">
     <div class="container col-4 d-flex justify-content-center align-items-center">
     <img src="${user[0].Image}" class="me-3 " alt="user Image" id="userInfo">
     </div>
     <div class="container col-6">
     <form class=" py-5 px-5 row justify-content-center" id="signUpForm" action="" role="form" name="fUpdateUser">
     <div class="form-group col-12">
     <h2>Actualizar Usuario</h2>
 </div>
 <div class="row justify-content-center" id="formContainer">
 <div class="form-group col-12 ">
     <label for="name">Nombre</label>
     <input type="text" name="name" class="form-control" autocomplete="name" required id="name" value="${user[0].Name}"/>
     <div class="invalid-feedback">
     Introduce un nombre
   </div>
 </div>

 <div class="form-group col-6 ">
 <label for="genre">Género</label>
 <select class="form-select" name="genre" id="genre">
 <option value="${user[0].Genre}" selected disabled>${user[0].Genre}</option>
 <option value="Hombre">Hombre</option>
 <option value="Mujer">Mujer</option>
 <option value="No binario">No binario</option>
 </select>
 </div>
 <div class="form-group col-6 ">
     <label for="birth">Nacido</label>
     <input type="date" name="birth" class="form-control" autocomplete="birth" required id="birth" value="${user[0].Birth_Date}" readonly/>
 </div>
 <div class="form-group col-12 ">
     <label for="email">Email</label>
     <input type="email" name="email" class="form-control" autocomplete="email" required id="email" value="${user[0].Email}" readonly/>
 </div>

 <div class="form-group col-12 ">
     <label for="profilePic">Nueva Imagen de perfil</label>
     <input type="file" name="profilePic" class="form-control" id="profilePic"/>
 </div>
 <div class="form-group col-12">
     <button type="submit" class="btn btn-primary mt-3">Actualizar</button>
 </div>
 </div>
     </form>
     </div>
    </div>
    <section id="eventos" class="py-5">
    
    </section>`;

    let eventsPlaceHolder = document.getElementById("eventos");

    placeHolder.appendChild(eventsPlaceHolder);

    this.ShowEventsCardsOfUsersInfo(events, events.length, currentUser);

  }

  showBusinessInfo(business, events, user) {
    let placeHolder = document.getElementById("signUp");
    let location=business[0].Location.split(",");
    placeHolder.setAttribute("class", "py-3 main d-flex justify-content-center flex-column m-auto");
    placeHolder.innerHTML = `
    <div class="container row border border-3">
     <div class="container col-4 d-flex justify-content-center align-items-center">
     <img src="${business[0].Image}" class="me-3 " alt="user Image" id="userInfo" >
     </div>
     <div class="container col-6">
     <form class=" py-5 px-5 row justify-content-center" id="signUpForm" action="" role="form" name="fUpdateBusiness">
     <div class="form-group col-12">
     <h2>Actualizar Negocio</h2>
 </div>
 <div class="row justify-content-center" id="formContainer">
 <div class="form-group col-12 ">
     <label for="name">Nombre</label>
     <input type="text" name="name" class="form-control" autocomplete="name" required id="name" value="${business[0].Name}"/>
     <div class="invalid-feedback">
     Introduce un nombre
   </div>
 </div>

 <div class="form-group col-12 ">
 <label for="businessDesc">Descripcion</label>
 <textarea name="description" cols="55" rows="7" class="descArea form-control" id="businessDesc">
 ${business[0].Description}
 </textarea>
 </div>

 <div class="form-group col-6 ">
     <label for="latitud">Latitud</label>
     <input type="text" name="latitud" max="90" min="-90" class="form-control" required id="latitud" value="${location[0]}"/>

 </div>
 <div class="form-group col-6 ">
     <label for="longitud">Longitud</label>
     <input type="text" name="longitud" max="180" min="-180" class="form-control" required id="longitud" value="${location[1]}"/>

 </div>

 <div class="form-group col-12 ">
     <label for="email">Email</label>
     <input type="email" name="email" class="form-control" autocomplete="email" required id="email" value="${business[0].Email}" readonly/>
 </div>

 <div class="form-group col-12 ">
     <label for="profilePic">Nueva Imagen de perfil</label>
     <input type="file" name="profilePic" class="form-control" id="profilePic"/>
 </div>
 <div class="form-group col-12">
     <button type="submit" class="btn btn-primary mt-3">Actualizar</button>
 </div>
 </div>
     </form>
     </div>
    </div>
    <section id="eventos" class="py-5">
    
    </section>`


    this.ShowEventsCardsOfUsersInfo(events, events.length,user);

    let cabecera=document.getElementById("MostrarEventos");
    let boton;
    if (!document.getElementById("CreateEvent")) boton=document.createElement("button");
    boton.setAttribute("type","button");

    boton.setAttribute("class","btn btn-success");
    boton.setAttribute("id","CreateEvent");
    boton.setAttribute("data-bs-toggle","modal");
    boton.setAttribute("data-bs-target","#exampleModal");
    boton.innerHTML=`Crear Evento`;

    cabecera.appendChild(boton);
  }

  eventForm(business){
    let modalPlaceHolder=document.getElementById("exampleModal");
    modalPlaceHolder.innerHTML=`
    <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="auxiliarModal">Crear Evento</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form class="border border-3 py-5 px-5 row justify-content-center" id="EventForm" action="" role="form" name="fEvent">
      <div class="row justify-content-center" id="formContainer">
      <div class="form-group col-12 ">
          <label for="eventName">Nombre</label>
          <input type="text" name="eventName" class="form-control" autocomplete="name" required id="eventName"/>
          <div class="invalid-feedback">
          Introduce un nombre
        </div>
      </div>

      <div class="form-group col-6 ">
        <label for="Start">Inicio del Evento</label>
        <input type="date" name="Start" class="form-control" autocomplete="Start" required id="Start"/>
        <div class="invalid-feedback">
        Introduce una fecha válida
      </div>
    </div>
      <div class="form-group col-6 ">
        <label for="End">Fin del Evento</label>
        <input type="date" name="End" class="form-control" autocomplete="End" required id="End"/>
        <div class="invalid-feedback">
        Introduce una fecha válida
      </div>
    </div>

    <div class="form-group col-12 ">
      <label for="eventDesc">Descripcion</label>
      <textarea name="eventDesc" cols="55" rows="7" class="descArea form-control" id="eventDesc">
      </textarea>
    </div>

    <div class="form-group col-6 ">
    <label for="Capacity">Capacidad (1-1000)</label>
    <input type="number" name="Capacity" class="form-control" min="1" max="1000" required id="Capacity"/>
    <div class="invalid-feedback">
    Introduce un número válido
  </div>
</div>
  <div class="form-group col-6 ">
    <label for="business">Negocio</label>
    <select class="form-select" name="business" id="business">
    <option value="${business[1]}" selected readonly>${business[2]}</option>
    </select>
</div>
     
      <div class="form-group col-12 ">
          <label for="profilePic">Imagen de perfil</label>
          <input type="file" name="profilePic" class="form-control"/>
      </div>
      <div class="form-group col-12">
          <button type="submit" class="btn btn-primary mt-3">Registrarse</button>
      </div>
      </div>
    </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
    `;

  }

  showBusinessInfoToUsers(business, events) {
    let logIn = document.getElementById("contacto");
    let parent = document.getElementsByTagName("body");
    let businessContainer = document.createElement("section");
    let eventContainer = document.createElement("section");

    businessContainer.setAttribute("id", "bares");
    businessContainer.setAttribute("class", "py-5 bg-light");

    if (!document.getElementById("bares")) parent[0].insertBefore(businessContainer, logIn);

    eventContainer.setAttribute("id", "eventos");
    eventContainer.setAttribute("class", "py-5");
    if (!document.getElementById("eventos")) parent[0].insertBefore(eventContainer, logIn);

    let placeHolder = document.getElementById("bares");
    placeHolder.setAttribute("class", "py-3 main d-flex justify-content-center flex-column m-auto");
    placeHolder.innerHTML = `
    <div class="container row border border-3">
     <div class="container col-4 d-flex justify-content-center align-items-center">
     <img src="${business[0].Image}" class="me-3 " alt="user Image" id="userInfo" >
     </div>
     <div class="container col-6">
     <form class=" py-5 px-5 row justify-content-center" id="signUpForm" action="" role="form" name="fUpdateUser">
     <div class="form-group col-12">
     <h2>${business[0].Name}</h2>
 </div>
 <div class="row justify-content-center" id="formContainer">

 <div class="form-group col-12 ">
 <label for="businessDesc"><h5>Descripcion</h5></label>
 <textarea name="description" readonly="" cols="55" rows="7" class="descArea form-control" id="businessDesc">
 ${business[0].Description}
 </textarea>
 </div>

 <div class="form-group col-12 ">
     <label for="email"><h5>Email</h5></label>
     <input readonly type="email" name="email" class="form-control" autocomplete="email" required id="email" value="${business[0].Email}"/>
 </div>
 </div>
     </form>
     </div>
    </div>
    <section id="events" class="py-5">
    
    </section>`

    let eventsPlaceHolder = document.getElementById("events");

    placeHolder.appendChild(eventsPlaceHolder);

    this.ShowEventsCards(events, events.length);

  }

  showEventInfoToUsers(events, business) {
    let logIn = document.getElementById("contacto");
    let parent = document.getElementsByTagName("body");
    let eventContainer = document.createElement("section");
    let businessContainer = document.createElement("section");
    let capacity= events[0].Capacity-events[1].length;


    eventContainer.setAttribute("id", "eventos");
    eventContainer.setAttribute("class", "py-5");
    if (!document.getElementById("eventos")) parent[0].insertBefore(eventContainer, logIn);
    
    businessContainer.setAttribute("id", "bares");
    businessContainer.setAttribute("class", "py-5 bg-light");
    
    if (!document.getElementById("bares")) parent[0].insertBefore(businessContainer, logIn);
    let dateStart=events[0].Event_Start.split("T");
    let dateEnd=events[0].Event_End.split("T");
    let placeHolder = document.getElementById("eventos");
    placeHolder.setAttribute("class", "py-3 main d-flex justify-content-center m-auto");
    placeHolder.innerHTML = `
    <div class="container row border border-3 text-center">
     <div class="container col-4 d-flex justify-content-center align-items-center">
     <img src="${events[0].Image}" class="me-3 " alt="user Image" id="userInfo" >
     </div>
     <div class="container col-6">
     <form class=" py-5 px-5 row justify-content-center" id="signUpForm" action="" role="form" name="fUpdateUser">
     <div class="form-group col-12">
     <h2>${events[0].Name}</h2>
 </div>
 <div class="row" id="formContainer">

 <div class="form-group col-12 ">
 <label for="desctipcion"><h5>Descripcion</h5></label>
 <textarea name="description" readonly="" cols="55" rows="7" class="descArea form-control" id="desctipcion">
 ${business[0].Description}
 </textarea>
 
 </div>
 <div class="form-group col-6 ">
 <label for="Start"><h5>Fecha de Inicio</h5></label>
        <input type="date" name="Start" class="form-control" autocomplete="Start" value="${dateStart[0]}" id="Start" readonly/>
 </div>
 <div class="form-group col-6 ">
 <label for="End"><h5>Fecha fin evento</h5></label>
        <input type="date" name="End" class="form-control" autocomplete="End" value="${dateEnd[0]}" id="End" readonly/>

 </div>
 <div class="form-group col-12">
 <label for="Capacity"><h5>Plazas libres</h5></label>
 <input type="number" name="Capacity" class="form-control text-center" min="1" max="1000"  id="Capacity" value="${capacity}" readonly/>
 </div>
 </div>
     </form>
     </div>
     <button class="btn btn-success w-50"  data-event="${events[0].Id}" id='joinEvent'>Apuntarse
     </div>
     `

    this.ShowBusinessCards(business, business.length);
  }


showFeedback(mensaje,formIndex,type="danger"){
  let form=document.forms[formIndex];
  let errorDiv;

  if (document.getElementById("OwnFeedback")==null) {
    errorDiv=document.createElement("div") 
    errorDiv.setAttribute("class",`alert alert-${type} my-2`);
    errorDiv.setAttribute("id",`OwnFeedback`);
    errorDiv.innerHTML=`<p>${mensaje}</p>`;
  
    form.appendChild(errorDiv);

    
  }else{
    errorDiv=document.getElementById("OwnFeedback") ;
    
    errorDiv.setAttribute("class",`alert alert-${type} my-2`);
    errorDiv.setAttribute("id",`OwnFeedback`);
    errorDiv.innerHTML=`<p>${mensaje}</p>`;
  
  } 
  
}

showWarning(element,object,table){
  let modalPlaceHolder=document.getElementById("exampleModal");
  modalPlaceHolder.innerHTML=`
  <div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="auxiliarModal">Eliminar ${object}</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    <h1>Aviso: Esta operación es irreversible</h1>
    <p>¿Está seguro de que quiere eliminar el ${object} "<b>${element[0].Name}</b>" para siempre?</p>
    </div>
    <div class="text-center">
    <button type="button" class="btn btn-danger btn-lg w-50" data-object='${element[0].Id}'  data-table='${table}' id="deleteObject"'>Eliminar</button>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
  </div>
</div>
  `;
}


changeJoinButton(text,type){
  let button= document.getElementById("joinEvent");
  button.setAttribute("class",`btn btn-${type} w-50`);
  button.innerText=text;
  }

  /**
* Funcion que llama al nuevo logIn
* @param {Function} handler 
*/
  bindLogIn(handler) {
    logInValidation(handler);
  }

  bindNewOwner(handler) {
    newOwnerValidation(handler);
  }
  bindNewClient(handler) {
    newClientValidation(handler);
  }
  bindNewBusiness(handler) {
    newBusinessValidation(handler);
  }

  bindUpdateOwner(handler){
    updateOwnerValidation(handler);
  }

  bindUpdateUser(handler){
    updateUserValidation(handler);
  }

  bindUpdateBusiness(handler){
    updateBusinessValidation(handler);
  }

  bindNewEvent(handler){
    newEventValidation(handler);
  }


  bindEventForm(handler){
    document.getElementById("CreateEvent").addEventListener("click", (event) => {
      handler();
    });
  }

  bindOwnerBusinessForm(handler){
    document.getElementById("CreateBusiness").addEventListener("click", (event) => {
      handler();
    });
  }


  bindShowUserSubMenu(handler) {
    document.getElementById("user-header").addEventListener("click", (event) => {
      handler();
    });
  }

  bindShowFormReturn(handler) {
    document.getElementById("returnSpan").addEventListener("click", (event) => {
      handler();
    });
  }

  bindLogOff(handler) {
    document.getElementById("LogOff").addEventListener("click", (event) => {
      handler();
    });
  }

  bindShowOwnerForm(handler) {
    document.getElementById("showOwnerForm").addEventListener("click", (event) => {
      handler();
    });
  }

  bindShowUserForm(handler) {
    document.getElementById("showUserForm").addEventListener("click", (event) => {
      handler();
    });
  }

  bindJoinEvent(handler) {
    document.getElementById("joinEvent").addEventListener("click", (event) => {
      handler(document.getElementById("joinEvent").dataset.event);
    });
  }

  bindShowAllBusiness(handler) {
    for (let element of document.getElementsByClassName('allBusiness')) {
      element.addEventListener("click", (event) => {
        this.#excecuteHandler(handler, [], 'body', { action: 'ShowBusiness' }, '#Negocios', event);
      });

    }
  }

  bindShowAllBusinessFromUser(handler) {
    for (let element of document.getElementsByClassName('allBusiness')) {
      element.addEventListener("click", (event) => {
        handler();
      });

    }
  }

  bindShowABusiness(handler) {
    for (let element of document.getElementsByClassName('showBusinessInfo')) {

      element.addEventListener("click", (event) => {
        this.#excecuteHandler(handler, element.dataset.business, 'body', { action: 'showABusiness', shown: element.dataset.business }, '#NegocioInfo', event);
      });

    }
  }

  bindShowAEvent(handler) {
    for (let element of document.getElementsByClassName('showEventInfo')) {

      element.addEventListener("click", (event) => {  
        this.#excecuteHandler(handler, element.dataset.events, 'body', { action: 'showAEvent', shown: element.dataset.events }, '#EventoInfo', event);
      });

    }
  }

  bindShowAllEvents(handler) {
    document.getElementById("allEvents").addEventListener("click", (event) => {
      this.#excecuteHandler(handler, [], 'body', { action: 'ShowEvents' }, '#Eventos', event);
    });
  }

  bindShowAllEventsFromUser(handler) {
    document.getElementById("allEvents").addEventListener("click", (event) => {
      handler();
    });
  }

  bindWarningBusiness(handler){
    for (let element of document.getElementsByClassName('warningBusiness')) {
      
      element.addEventListener("click", (event) => {
        handler(element.dataset.business);
      });
    }
  }

  bindWarningEvent(handler){
    for (let element of document.getElementsByClassName('warningEvent')) {
      element.addEventListener("click", (event) => {
        handler(element.dataset.events);
      });
    }
  }

  bindDeleteObject(handler){
    let element=document.getElementById('deleteObject');
    element.addEventListener("click", (event) => {
        handler(element.dataset.object,element.dataset.table);
      });
    }
  

  bindShowIndex(handler) {
     document.getElementById('index').addEventListener("click", (event) => {
        this.#excecuteHandler(handler, [], 'body', { action: 'init' }, '#Inicio', event);
      });

    }

  bindShowIndexFromUser(handler) {
     document.getElementById('index').addEventListener("click", (event) => {
        handler();
      });

    }
  }



export default BaradosView;