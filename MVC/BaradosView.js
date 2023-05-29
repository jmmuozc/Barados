"use strict";

import { logInValidation, newBusinessValidation, newOwnerValidation, newClientValidation } from "./validation.js";

class BaradosView {

  constructor() {
    // Recogemos el main
    this.main = document.getElementsByTagName("main")[0];

  }

  infoUserHeader(name, image) {
    // console.log(document.getElementById("LogInForm"));

    // for (let child of document.getElementsByClassName("LogInForm")) {
    //   console.log("Parent");
    //   console.log(child.parentElement);
    //   console.log("child");
    //   console.log(child);
    //   child.parentElement.removeChild(child);
    // }
    this.removeLogInForm();
    // if (document.getElementById("LogInForm")) logInDiv.removeChild(document.getElementById("LogInForm"));
    if (document.getElementById("user-header") == null) {
      let header = document.getElementById("navbarSupportedContent");
      let userSubMenu = document.getElementById("sub-menu");
      let userDiv = document.createElement("div");
      userDiv.setAttribute("class", "d-flex align-items-center ms-3 me-3");
      userDiv.setAttribute("id", "user-header");
      userDiv.innerHTML = `
      <div>
      <img src="${image}" class="me-3 user-image" alt="user Image" width=50px height=50px />
      </div>
      <div">
      <a href="" class="nav-link align-middle ">${name}</a>
      </div>`;
      header.appendChild(userDiv);

      userSubMenu.innerHTML = `<div class="sub-menu">
      <div class="user-info">
          <img src="${image}" class="me-3 user-image" alt="user Image" />
          <h3>${name}</h3>
      </div>
      <hr/>
      <a href="#" class="sub-menu-link">
          <img src="/Media/edit-user-icon.png">
          <p>Editar Perfil</p>
          <span>></span>
      </a>
      <a href="#" class="sub-menu-link" id="LogOff">
          <img src="/Media/logout-icon.png">
          <p>Cerrar Sesión</p>
          <span>></span>
      </a>
  </div>`;

    }
    // class="img-thumbnail"
    // class="col-md-8"
    // class="col-md-4
  }


  removeLogInForm() {
    if (document.getElementsByClassName("LogInForm")) {
      let logInElements = Array.from(document.getElementsByClassName("LogInForm"));

      logInElements.forEach(element => {
        element.parentElement.removeChild(element);
      });
    }
  }

  ShowBusinessCards(business) {
    let barImg = Array.from(document.getElementsByClassName("bar-img"));
    let barTitle = Array.from(document.getElementsByClassName("bar-title"));
    let barDescription = Array.from(document.getElementsByClassName("bar-description"));
    let arrayExistent = [];
    let rng;
    for (let index = 0; index < barImg.length; index++) {
      do {
        rng = Math.floor(Math.random() * (business.length));
      } while (arrayExistent.includes(rng));
      arrayExistent.push(rng);

      // barImg[index].innerHTML=`${business[rng].image}`;
      barTitle[index].innerHTML = `${business[rng].Name}`;
      barDescription[index].innerHTML = `${business[rng].Description}`;

    }
  }

  ShowEventsCards(events) {
    let eventImg = Array.from(document.getElementsByClassName("event-img"));
    let eventTitle = Array.from(document.getElementsByClassName("event-title"));
    let eventDescription = Array.from(document.getElementsByClassName("event-description"));
    let arrayExistent = [];
    let rng;
    for (let index = 0; index < eventImg.length; index++) {
      do {
        rng = Math.floor(Math.random() * (events.length));
      } while (arrayExistent.includes(rng));
      arrayExistent.push(rng);

      // eventImg[index].innerHTML=`${events[rng].image}`;
      eventTitle[index].innerHTML = `${events[rng].Name}`;
      eventDescription[index].innerHTML = `${events[rng].Description}`;

    }
  }

  ShowUserSubMenu() {


    console.log("Prueba");
  }

  setUpLogIn() {
    let userHeader = document.getElementById("user-header");
    let userSubMenu = document.getElementById("sub-menu");
    let infoDiv = document.getElementsByClassName("infoDiv");

    userSubMenu.classList.toggle("open-menu");
    userSubMenu.innerHTML = "";
    userHeader.parentElement.removeChild(userHeader);
    infoDiv[0].innerHTML = `                <div class="col-md-6 LogInForm">
  <form action="" role="form" name="flogIn">
      <div class="form-group">
          <label for="email">Email</label>
          <input type="email" name="email" class="form-control" autocomplete="email" required />
      </div>
      <a href="users.html" class="LogInForm-change">¿No tienes cuenta? Registrate</a>
      <div class="form-group">
          <label for="password">Contraseña</label>
          <input type="password" name="passwd" class="form-control" autocomplete="current-password"
              required />
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

  // Users functions

  showOwnerForm() {
    let placeHolder = document.getElementById("signUp");
    placeHolder.innerHTML = ` <section class="py-5 px-5 my-5 container" id="signUpContainer">
  <form class="border border-3 py-5 px-5 row justify-content-center" id="signUpForm" action="" role="form" name="fOwner">
  <div class="form-group col-12">
      <h2>Nuevo Propietario</h2>
  </div>
  <div class="row justify-content-center" id="formContainer">
  <div class="form-group col-12 ">
      <label for="name">Nombre</label>
      <input type="text" name="name" class="form-control" autocomplete="name" required />
  </div>
 
  <div class="form-group col-6 ">
  <label for="genre">Género</label>
  <select class="form-select" name="genre">
  <option value="Hombre">Hombre</option>
  <option value="Mujer">Mujer</option>
  <option value="N/A">No binario</option>
  </select>
  </div>
  <div class="form-group col-6 ">
      <label for="birth">Nacido</label>
      <input type="date" name="birth" class="form-control" autocomplete="birth" required />
  </div>
  <div class="form-group col-12 ">
      <label for="email">Email</label>
      <input type="email" name="email" class="form-control" autocomplete="email" required />
  </div>
  <div class="form-group col-12 ">
      <label for="password">Contraseña</label>
      <input type="password" name="passwd" class="form-control" autocomplete="current-password"
          required />
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
</section>`;
  }

  showBusinessForm() {
    let placeHolder = document.getElementById("signUp");
    placeHolder.innerHTML = ` <section class="py-5 px-5 my-5 container" id="signUpContainer">
    <form class="border border-3 py-5 px-5 row justify-content-center" id="signUpForm" action="" role="form" name="fOwner">
    <div class="form-group col-12">
        <h2>Nuevo Negocio</h2>
    </div>
    <div class="row justify-content-center" id="formContainer">
    <div class="form-group col-12 ">
        <label for="name">Nombre</label>
        <input type="text" name="name" class="form-control" autocomplete="name" required />
    </div>
   
    <div class="form-group col-6 ">
    <label for="genre">Género</label>
    <select class="form-select" name="genre">
    <option value="Hombre">Hombre</option>
    <option value="Mujer">Mujer</option>
    <option value="N/A">No binario</option>
    </select>
    </div>
    <div class="form-group col-6 ">
        <label for="birth">Nacido</label>
        <input type="date" name="birth" class="form-control" autocomplete="birth" required />
    </div>
    <div class="form-group col-12 ">
        <label for="email">Email</label>
        <input type="email" name="email" class="form-control" autocomplete="email" required />
    </div>
    <div class="form-group col-12 ">
        <label for="password">Contraseña</label>
        <input type="password" name="passwd" class="form-control" autocomplete="current-password"
            required />
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
  </section>`;

  }

  showUserForm() {
    let placeHolder = document.getElementById("signUp");
    placeHolder.innerHTML = ` <section class="py-5 px-5 my-5 container" id="signUpContainer">
    <form class="border border-3 py-5 px-5 row justify-content-center" id="signUpForm" action="" role="form" name="fUser">
    <div class="form-group col-12">
        <h2>Nuevo Usuario</h2>
    </div>
    <div class="row justify-content-center" id="formContainer">
    <div class="form-group col-12 ">
        <label for="name">Nombre</label>
        <input type="text" name="name" class="form-control" autocomplete="name" required />
    </div>
   
    <div class="form-group col-6 ">
    <label for="genre">Género</label>
    <select class="form-select" name="genre">
    <option value="Hombre">Hombre</option>
    <option value="Mujer">Mujer</option>
    <option value="N/A">No binario</option>
    </select>
    </div>
    <div class="form-group col-6 ">
        <label for="birth">Nacido</label>
        <input type="date" name="birth" class="form-control" autocomplete="birth" required />
    </div>
    <div class="form-group col-12 ">
        <label for="email">Email</label>
        <input type="email" name="email" class="form-control" autocomplete="email" required />
    </div>
    <div class="form-group col-12 ">
        <label for="password">Contraseña</label>
        <input type="password" name="passwd" class="form-control" autocomplete="current-password"
            required />
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
  </section>`;

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

  bindShowUserSubMenu(handler) {
    document.getElementById("user-header").addEventListener("click", (event) => {
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

  // bindShowBusinessForm(handler) {
  //   document.getElementById("showBusinessForm").addEventListener("click", (event) => {
  //     handler();
  //   });
  // }

  bindShowUserForm(handler) {
    document.getElementById("showUserForm").addEventListener("click", (event) => {
      handler();
    });
  }

}

export default BaradosView;