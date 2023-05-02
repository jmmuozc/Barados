
"use strict";
import Barados from "./BaradosModel.js";
import BaradosView from "./BaradosView.js";
import BaradosController from "./BaradosControler.js";
let baradosApp;

(function () {
	baradosApp = new BaradosController(new Barados(),new BaradosView());
})();

export default baradosApp;