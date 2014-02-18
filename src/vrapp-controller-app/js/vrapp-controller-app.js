Y.namespace('VrApp');

var ATTR_CONTENTBOX = 'contentBox',

	MyAppController = Y.Base.create('vrapp-controller-app', Y.Base, [], {

		/**
		 * Description
		 * @method initializer
		 * @param {} config
		 * @return 
		 */
		initializer: function (config) {
			console.log('Hello World I am controller');
		},

		//Cambia los artistas que coinciden con un rango vocal
		changeRangeSelectionAction: function(params){
			console.log('changeRangeSelectionAction');

		},

		//Abre el selector de rangos para el inferior
		openMinRangeSelectorAction: function(params){

		},

		//Abre el selector de rangos para el superior
		openMaxRangeSelectorAction: function(params){

		},

		//Muestra la vista inicial
		showInitViewAction: function(params){

		},

		//Muestra la vista principal
		showMainViewAction: function(params){

		},

		//Muestra la vista de ayuda
		showHelpViewAction: function(params){

		},

		//Muestra el video de Ayuda
		showHelpVideoAction: function(params){

		},

		//Compartir en Twiter
		shareTwitterAction: function(params){

		},

		//Compartir en Facebook
		shareFacebookAction: function(params){

		},

		//Compartir en Google Plus
		shareFacebookAction: function(params){

		},
		//Cerrar la parte de compartir
		closeShareAction: function(params){

		}



	}, {
		ATTRS: {

		}

	});

Y.VrApp.AppController = MyAppController;