
"use strict";
import Barados from "./BaradosModel.js";
import BaradosView from "./BaradosView.js";
import BaradosController from "./BaradosController.js";
let baradosApp;

(function () {
	baradosApp = new BaradosController(new Barados(),new BaradosView());
	// console.log(BaradosSystem.currentUserData);
})();

export default baradosApp;