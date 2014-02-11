YUI().use(
	'base',
	'node',
	'transition',
	'event-move',
	'dd-constrain',
	'vrapp-view-view',
	'vrapp-view-landing',
	'vrapp-view-main',
	'vrapp-controller-view',
	// 'vrapp-view-level',
	'vrapp-view-dualslider',
	'event-touch',
function(Y){
	console.log('Hello world');

	//Y.log(Y.Env._loader.data);
	Y.one('#help').on('click',function(e){
		console.log('joder');
		Android.showHelp();
	})



	function showAndroidToast(message) {
	   var result = Android.showToast(message);
	   var el = document.getElementById("writer");
	   el.innerHTML = result;
	}

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


		// App.View.LevelView = new Y.VrApp.LevelView({
		// 	srcNode:'.frequency-level'
		// }).render();
	},

	App.initializeControllers();
	App.initializeViews();


	//Pruebas
	// Y.one('#testInputButton').on('click',function(e){

	// });


	//Se escucha el evento de proxima vista de la landing page
	Y.on('vrapp-view-landing:nextview', function(){
		controllerView.changeToNextView();
	});

	//Se escucha el evento de ir atras de la barra
	Y.one('.header').on('click', function(e){
		controllerView.changeToPreviousView();
	});


	document.getElementById();
	console.log(Y.one('#path3566-1-7-26-7-0-3'));

	// Y.one('#path3566-1-7-26-7-0-3').setStyle('fill','#3498db');
	




//---Dual slider 1----------------------------------------------------------------------

	var dualSlider = new Y.VrApp.DualSlider({
		track: {
			node: Y.one('.track')
		},
		thumbTrack:{
			node: Y.one('.thumbTrack'),
			delay: 0
		},
		minThumb:{
			value:3,
			node: Y.one('.minThumb'),
			type:'minThumb',
		},
		maxThumb:{
			value:41,
			node: Y.one('.maxThumb')
		},
		range:42,
	}).render();



//---Dual slider----------------------------------------------------------------------

	// var dualSlider = new Y.VrApp.DualSlider({
	// 	minThumb:{
	// 		value:0
	// 	},
	// 	maxThumb:{
	// 		value:60
	// 	},
	// 	range:42,
	// 	srcNode:Y.one('#track')
	// }).render();

	// Y.on('vrapp-view-dualslider:valueChange', function(e){
	// 	console.log(e.data);
	// 	Y.one('#testInput').set('value',e.data);
	// });

	// minThumb = dualSlider.get('minThumb');

	// maxThumb = dualSlider.get('maxThumb');

	// dualSlider.syncThumbByValue(minThumb, 20);






});