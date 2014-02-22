YUI().use(
	'base',
	'node',
	'transition',
	'event',
	'event-move',
	'event-touch',
	'event-tap',
	'event-flick',
	'scrollview',
	'vrapp-controller-view',
	'vrapp-controller-app',
	'vrapp-view-view',
	'vrapp-view-landing',
	'vrapp-view-main',
	'vrapp-view-dualslider',
	'vrapp-view-selector',
	'vrapp-view-container',
	'vrapp-util-router',
function(Y){
	console.log('Hello world');

	//Y.log(Y.Env._loader.data);
	Y.one('#help').on('gesturemovestart',function(e){
		Android.showHelp();
	});

	function showAndroidToast(message) {
	   var result = Android.showToast(message);
	   var el = document.getElementById("writer");
	   el.innerHTML = result;
	}

	Y.namespace('VrApp');

	Y.VrApp.App = { 
					Controller: {
						controllerView: {}
					},
					View: {},
					Util: {} 
				};

	App = Y.VrApp.App;


	/**
	 * Initializing Controllers
	 * @method initializeControllers
	 * @return 
	 */
	App.initializeControllers = function(){
		App.Controller.controllerView = new Y.VrApp.ControllerView();
		App.Controller.AppController = new Y.VrApp.AppController();
	}

	App.initializeUtils = function(){
		App.Util.Router = new Y.VrApp.Router({routes_own: APP_CONFIG.routes});
		App.Util.Router.createRoutes();
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
		App.Controller.controllerView.addView(App.View.LandingView);
		App.Controller.controllerView.addView(App.View.MainView);

		//Estableciendo como activa la vista App.View.LandingView
		App.Controller.controllerView.setActiveView(0);

	},

	 
	App.initializeControllers();
	App.initializeUtils();
	App.initializeViews();



	//Se escucha el evento de proxima vista de la landing page
	Y.on('vrapp-view-landing:nextview', function(){
		App.Controller.controllerView.changeToNextView();
	});

	//Se escucha el evento de ir atras de la barra
	Y.one('.header').on('click', function(e){
		App.Controller.controllerView.changeToPreviousView();
	});

//---Seleccionador de Rangos----------------------------------------------------------------------
	// Y.on('vrapp-view-dualslider:selectHandle',function(e){
	// 	console.log('Se escucha el evento en el main');
	// 	console.log(e.data);
	// });

	var rangeSlider = new Y.VrApp.DualSlider({
		track: {
			node: Y.one('.track')
		},
		minThumb:{
			value:10,
			node: Y.one('.track .key-selector-min'),
			type:'minThumb',
		},
		maxThumb:{
			value:21,
			node: Y.one('.track .key-selector-max'),
			type:'maxThumb',
		},
		keyCollection: APP_CONFIG.keyCollection,
		blackBehaviorRenderCollection: APP_CONFIG.blackBehaviorRenderCollection
	});

	rangeSlider.addTarget(App.Util.Router);

	rangeSlider.render();

	rangeSlider.syncThumbByValue('minThumb',10);
	rangeSlider.syncThumbByValue('maxThumb',21);

	Y.VrApp.App.View.rangeSlider = rangeSlider;

<<<<<<< HEAD
=======
//Seleccionador de rangos widget
>>>>>>> df8ef3374d4140d56d2e8ffe40c558f45eb4de7f
	var minRangeSelector = new Y.VrApp.Selector({
		srcNode: Y.one('#minThumbModal'),
		itemModelCollection: APP_CONFIG.keyCollection,
		minRange: 0,
		maxRange: 18,
		selectedItemIndex: 10,
		type: 'minThumb'
	});

	minRangeSelector.addTarget(App.Util.Router);
	minRangeSelector.render();
	Y.VrApp.App.View.minRangeSelector = minRangeSelector;


	var maxRangeSelector = new Y.VrApp.Selector({
		srcNode: Y.one('#maxThumbModal'),
		itemModelCollection: APP_CONFIG.keyCollection,
		minRange: 14,
		maxRange: 41,
		selectedItemIndex: 21,
		type: 'maxThumb'
	});

	maxRangeSelector.addTarget(App.Util.Router);
	maxRangeSelector.render();
	Y.VrApp.App.View.maxRangeSelector = maxRangeSelector;


<<<<<<< HEAD

=======
>>>>>>> df8ef3374d4140d56d2e8ffe40c558f45eb4de7f
//--------------------------------------------------------------
	var artistModelCollection = APP_CONFIG.tests.artistModelCollection,
		artistContainer;

	artistContainer = new Y.VrApp.Container({
		childModelCollection: artistModelCollection,
		srcNode: Y.one('.artist-scrollview-container')
	}).render();

	Y.VrApp.App.View.artistContainer = artistContainer;

	//Se le pasa un colleccion de modelos de artistas
	//artistContainer.syncData([]);

//---------------------------------------------------------------
//Fast click
	// var helpButtonDOMNode = Y.one('#help').getDOMNode();
	// FastClick.attach(helpButtonDOMNode);


	// helpButtonDOMNode.addEventListener('click', function(event) {
	// 	cTime = Date.now();
	// 	$('#myModal').modal({});
	// 	//document.getElementById('c-time').value = cTime;
	// 	helpButtonDOMNode.style.backgroundColor = helpButtonDOMNode.style.backgroundColor ? '' : 'YellowGreen';
	// }, false);


});