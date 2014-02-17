YUI().use(
	'base',
	'node',
	'transition',
	'event',
	'event-move',
	'scrollview',
	'dd-constrain',
	'vrapp-view-view',
	'vrapp-view-landing',
	'vrapp-view-main',
	'vrapp-controller-view',
	// 'vrapp-view-level',
	'vrapp-view-dualslider',
	'vrapp-view-container',
	'async-queue',
	'event-move',
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

//---Dual slider 1----------------------------------------------------------------------
	Y.on('vrapp-view-dualslider:selectHandle',function(e){
		console.log('Se escucha el evento en el main');
		console.log(e.data);
	});

	var dualSlider = new Y.VrApp.DualSlider({
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

	dualSlider.render();

	dualSlider.syncThumbByValue('minThumb',10);
	dualSlider.syncThumbByValue('maxThumb',21);

//--------------------------------------------------------------
var artist = {
	id: 20,
	vocalRange:{
		min: 20,//de 0 a 41
		max: 26
	},
	name:"Adelle",
	score: 3,//De 0 a 10 indica relevancia
	picture: 'adelle.jpg',//"Path de la imagen asociada"
	twitter: '@adelle'
};

var artistModelCollection = [
	{
		vocalRange:{
			min: 20,//de 0 a 41
			max: 26
		},
		name:"Bruno Mars",
		score: 3,//De 0 a 10 indica relevancia
		picture: 'bruno.png',//"Path de la imagen asociada"
		twitter: '@bruno',
		behavior:'blocked4'
	},
	{
		vocalRange:{
			min: 20,//de 0 a 41
			max: 26
		},
		name:"Adelle",
		score: 3,//De 0 a 10 indica relevancia
		picture: 'adele.png',//"Path de la imagen asociada"
		twitter: '@adelle',
		behavior:'blocked'
	},
	{
		vocalRange:{
			min: 20,//de 0 a 41
			max: 26
		},
		name:"Luciano Pavarotti",
		score: 3,//De 0 a 10 indica relevancia
		picture: 'luciano.png',//"Path de la imagen asociada"
		twitter: '@pavarotti',
		behavior:'blocked'
	},
	{
		vocalRange:{
			min: 20,//de 0 a 41
			max: 26
		},
		name:"Bruno Mars",
		score: 3,//De 0 a 10 indica relevancia
		picture: 'bruno.png',//"Path de la imagen asociada"
		twitter: '@bruno',
		behavior:'blocked4'
	},
	{
		vocalRange:{
			min: 20,//de 0 a 41
			max: 26
		},
		name:"Adelle",
		score: 3,//De 0 a 10 indica relevancia
		picture: 'adele.png',//"Path de la imagen asociada"
		twitter: '@adelle',
		behavior:'blocked'
	},
	{
		vocalRange:{
			min: 20,//de 0 a 41
			max: 26
		},
		name:"Luciano Pavarotti",
		score: 3,//De 0 a 10 indica relevancia
		picture: 'luciano.png',//"Path de la imagen asociada"
		twitter: '@pavarotti',
		behavior:'blocked'
	},
	{
		vocalRange:{
			min: 20,//de 0 a 41
			max: 26
		},
		name:"Bruno Mars",
		score: 3,//De 0 a 10 indica relevancia
		picture: 'bruno.png',//"Path de la imagen asociada"
		twitter: '@bruno',
		behavior:'blocked4'
	},
	{
		vocalRange:{
			min: 20,//de 0 a 41
			max: 26
		},
		name:"Adelle",
		score: 3,//De 0 a 10 indica relevancia
		picture: 'adele.png',//"Path de la imagen asociada"
		twitter: '@adelle',
		behavior:'blocked'
	},
	{   
		minVR: 20,
		maxVR: 26,
		name:"Luciano Pavarotti",
		score: 3,//De 0 a 10 indica relevancia
		picture: 'luciano.png',//"Path de la imagen asociada"
		twitter: '@pavarotti',
		behavior:'blocked'
	}
];



var artistModelCollection = new Y.VrApp.Container({
	childModelCollection: artistModelCollection
}).render('.artist-container');


artistModelCollection.after('render',function(){
	console.log('after render');
	var scroller = document.getElementById('scroll');
	console.log(scroller);
	//scroller.scrollLeft += 100;
	console.log(scroller.scrollLeft);
    // Y.later(200, Y, function(e){
    //     console.log(scroller.scrollLeft);
    //     //scroller.scrollLeft += '100';
    // },{},true);
});
var scroller = document.getElementById('scroll');



var myScroll;

// function loaded() {
// 	myScroll = new iScroll('wrapper', {
// 		snap: true,
// 		momentum: false,
// 		hScrollbar: false,
// 		onScrollEnd: function () {
// 			document.querySelector('#indicator > li.active').className = '';
// 			document.querySelector('#indicator > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
// 		}
// 	 });
// }

// loaded();






//-----------------------------------------------------------------------------------------
// Constraining the width, instead of the height for horizontal scrolling
    // var scrollView = new Y.ScrollView({
    //     id: 'scrollview',
    //     srcNode: '#scrollview-content',
    //     width: '100%',
    //     flick: {
    //         minDistance:10,
    //         minVelocity:0.3,
    //         axis: "x"
    //     }
    // });

    // scrollView.render();

    // // Prevent default image drag behavior
    // scrollView.get("contentBox").delegate("mousedown", function(e) {
    //     e.preventDefault();
    // }, "img");



});