"use strict";

import { logInValidation } from "./validation.js";

class BaradosView {

  constructor() {
    // Recogemos el main
    this.main = document.getElementsByTagName("main")[0];
    
  }

  infoUserHeader(name,image="/Media/default-user-icon.jpg"){
    let header=document.getElementById("headerContent");
    let userIl=document.createElement("div");
    userIl.setAttribute("class", "col-md-2")
    userIl.innerHTML=`<div class="d-flex justify-content-md-end align-items-center">
    <div>
    <a href="" class="nav-link align-middle">${name}</a>
    </div>
    <div">
    <img src="${image}" class="img-thumbnail" alt="user Image" />
    </div>
    </div>`;
    header.appendChild(userIl);
    // class="img-thumbnail"
    // class="col-md-8"
    // class="col-md-4
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