"use strict";

import { logInValidation } from "./validation.js";

class BaradosView {

  constructor() {
    // Recogemos el main
    this.main = document.getElementsByTagName("main")[0];
    
  }

  infoUserHeader(name,image="/Media/default-user-icon.jpg"){
    let header=document.getElementById("headerContent");
    let userIl=document.createElement("li");
    userIl.setAttribute("class", "list-unstyled mb-0")
    userIl.innerHTML=`<div class="container">
    <img src="${image}" class="img-thumbnail" alt="user Image" />
    <a href="" class="nav-link">${name}</a>
    </div>`;
    header.appendChild(userIl);
  }

  /**
* Funcion que llama al nuevo logIn
* @param {Function} handler 
*/
  bindLogIn(handler) {
    console.log("Vinculado");
    logInValidation(handler);
  }

}

export default BaradosView;