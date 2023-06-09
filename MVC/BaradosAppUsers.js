"use strict";
import Barados from "./BaradosModel.js";
import BaradosView from "./BaradosView.js";
import BaradosControllerUsers from "./BaradosControllerUsers.js";
let baradosApp;

(function () {
	
	baradosApp = new BaradosControllerUsers(new Barados(),new BaradosView());
	// console.log(BaradosSystem.currentUserData);
})();

// const historyActions = {
// 	init: () => {
// 		baradosApp.onLoad();
// 	},
// 	ShowEvents: () => baradosApp.HandleShowEvents(),
// 	showAEvent: (event) => baradosApp.HandleShowAEvent(event.state.shown),
// 	ShowBusiness: () => baradosApp.HandleShowBusiness(),
// 	showABusiness: (event) => baradosApp.HandleShowABusiness(event.state.shown),
	// showActors: () => baradosApp.handleActors(),
	// showFavorites: () => baradosApp.HandleFavoriteProductions(),
	// showDirectors: () => baradosApp.handleDirectors(),
	// showActorCard: (event) => baradosApp.handleActorCard(event.state.picture),
	// showDirectorCard: (event) => baradosApp.handleDirectorCard(event.state.picture),
	// showProduction: (event) => baradosApp.HandleProduction(event.state.title),
// }

// window.addEventListener('popstate', function(event) {
//   if (event.state){
// 		historyActions[event.state.action](event);
//   }
// });

// history.replaceState({action: 'init'}, null);


export default baradosApp;