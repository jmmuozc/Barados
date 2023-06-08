
"use strict";
import Barados from "./BaradosModel.js";
import BaradosView from "./BaradosView.js";
import BaradosController from "./BaradosController.js";
let baradosApp;

(function () {
	baradosApp = new BaradosController(new Barados(),new BaradosView());
	// console.log(BaradosSystem.currentUserData);
})();

const historyActions = {
	init: () => {
		baradosApp.handleInit();
	},
	showCategories: (event) => baradosApp.handleCategory(event.state.name),
	showSeries: () => baradosApp.handleSeries(),
	showMovies: () => baradosApp.handleMovies(),
	showActors: () => baradosApp.handleActors(),
	showFavorites: () => baradosApp.HandleFavoriteProductions(),
	showDirectors: () => baradosApp.handleDirectors(),
	showCategory: (event) => baradosApp.handleCategory(event.state.category),
	showActorCard: (event) => baradosApp.handleActorCard(event.state.picture),
	showDirectorCard: (event) => baradosApp.handleDirectorCard(event.state.picture),
	showProduction: (event) => baradosApp.HandleProduction(event.state.title),
}

window.addEventListener('popstate', function(event) {
  if (event.state){
		historyActions[event.state.action](event);
  }
});

history.replaceState({action: 'init'}, null);

export default baradosApp;