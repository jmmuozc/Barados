"use strict";

import { logInValidation } from "./validation.js";

class BaradosView {

  constructor() {
    // Recogemos el main
    this.main = document.getElementsByTagName("main")[0];
    
  }

  infoUserHeader(name,image){
    // console.log(document.getElementById("LogInForm"));
    if (document.getElementsByClassName("LogInForm")) {
      let logInElements=Array.from(document.getElementsByClassName("LogInForm"));

      logInElements.forEach(element => {
        element.parentElement.removeChild(element);
      });
      // for (let child of document.getElementsByClassName("LogInForm")) {
      //   console.log("Parent");
      //   console.log(child.parentElement);
      //   console.log("child");
      //   console.log(child);
      //   child.parentElement.removeChild(child);
      // }
      }
    // if (document.getElementById("LogInForm")) logInDiv.removeChild(document.getElementById("LogInForm"));
    if (document.getElementById("user-header")==null) {
      let header=document.getElementById("navbarSupportedContent");
      let userDiv=document.createElement("div");
      userDiv.setAttribute("class", "d-flex align-items-center ms-3 me-3");
      userDiv.setAttribute("id", "user-header");
      userDiv.innerHTML=`
      <div>
      <img src="${image}" class="me-3" alt="user Image" width=50px height=50px />
      </div>
      <div">
      <a href="" class="nav-link align-middle ">${name}</a>
      </div>`;
      header.appendChild(userDiv);
      
    }
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