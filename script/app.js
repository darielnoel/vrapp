YUI().use(
	'base',
	'node',
	'transition',
	'vrapp-view-view',
	'vrapp-view-landing',
	'vrapp-view-main',
	'vrapp-controller-view',
function(Y){
	//http://tympanus.net/Blueprints/SlidePushMenus/
	console.log('Hello world');

	Y.namespace('VrApp');

	var App = {
			AppController:{},
			View:{},
			Controller: {

			}
		},
		AppController = App.AppController,
		controllerView;

	/**
	 * Initializing Controllers
	 * @method initializeControllers
	 * @return 
	 */
	App.initializeControllers = function(){
		controllerView = new Y.VrApp.ControllerView();
	}

	/**
	 * Initializing Views
	 * @method initializeViews
	 * @return 
	 */
	App.initializeViews = function(){
		// App.View.LandingView = new Y.VrApp.LandingView({
		// 	srcNode:'#landing-view'
		// }).render();

		// App.View.MainView = new Y.VrApp.MainView({
		// 	srcNode:'#main-view'
		// }).render();

		//Agregando las vistas que se van creando
		controllerView.addView(App.View.LandingView);
		controllerView.addView(App.View.MainView);

		//Estableciendo como activa la vista App.View.LandingView
		controllerView.setActiveView(0);
	},

	App.initializeControllers();
	App.initializeViews();


	//Se escucha el evento de proxima vista de la landing page
	Y.on('vrapp-view-landing:nextview', function(){
		controllerView.changeToNextView();
	});

	//Se escucha el evento de ir atras de la barra
	Y.one('.header').on('click', function(e){
		controllerView.changeToPreviousView();
	});	

});