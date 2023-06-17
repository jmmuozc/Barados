
"use strict";
import Barados from "./BaradosModel.js";
import BaradosView from "./BaradosView.js";
import BaradosController from "./BaradosController.js";
let baradosApp;

(function () {
	baradosApp = new BaradosController(new Barados(),new BaradosView());

})();

const historyActions = {
	init: () => {
		baradosApp.HandleShowIndex();
	},
	ShowEvents: () => baradosApp.HandleShowEvents(),
	showAEvent: (event) => baradosApp.HandleShowAEvent(event.state.shown),
	ShowBusiness: () => baradosApp.HandleShowBusiness(),
	showABusiness: (event) => baradosApp.HandleShowABusiness(event.state.shown),

}

window.addEventListener('popstate', function(event) {
  if (event.state){
		historyActions[event.state.action](event);
  }
});

history.replaceState({action: 'init'}, null);

export default baradosApp;