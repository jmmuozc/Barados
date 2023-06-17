"use strict";
import Barados from "./BaradosModel.js";
import BaradosView from "./BaradosView.js";
import BaradosControllerUsers from "./BaradosControllerUsers.js";
let baradosApp;

(function () {
	
	baradosApp = new BaradosControllerUsers(new Barados(),new BaradosView());

})();




export default baradosApp;