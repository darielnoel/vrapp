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
	'vrapp-view-sharebar',
	'vrapp-view-help',
	'vrapp-util-router',
function(Y){
	console.log('Hello world');

	//Y.log(Y.Env._loader.data);
	Y.one('#help').on('gesturemovestart',function(e){
		Android.showHelp();
		//Android.shareTwitter();
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
		App.View.LandingView = new Y.VrApp.LandingView({
			srcNode:'#landing-view'
		}).render();

		App.View.MainView = new Y.VrApp.MainView({
			srcNode:'#main-view'
		}).render();

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
		//App.Controller.controllerView.changeToNextView();
		App.Controller.AppController.showMainViewAction();

	});

	//Se escucha el evento de ir atras de la barra
	Y.one('.header-back').on('click', function(e){
		console.log('El tap se escucha');
		App.Controller.controllerView.changeToPreviousView();
	});


	var height = Y.one('body').get('clientHeight'),
		ratio = window.devicePixelRatio,
		html = 'Altura: ' +  height + '- deviceP: ' + ratio;

	console.log(Y.one('body'));





	Y.one('.hero-slogan').set('innerHTML',html);


//Fast click example
	// var helpButtonDOMNode = Y.one('#help').getDOMNode();
	// FastClick.attach(helpButtonDOMNode);


	// helpButtonDOMNode.addEventListener('click', function(event) {
	// 	cTime = Date.now();
	// 	$('#myModal').modal({});
	// 	//document.getElementById('c-time').value = cTime;
	// 	helpButtonDOMNode.style.backgroundColor = helpButtonDOMNode.style.backgroundColor ? '' : 'YellowGreen';
	// }, false);


});