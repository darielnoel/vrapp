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

		//Muestra la vista principal
		showMainViewAction: function(){

		},

		//cambia los artistas dado un vocal range
		updateArtistAction: function (vocalRange){

		},

		//devuelve los artista que coinciden con un rango vocal
		getArtistByRange: function(vocalRange){

		},


	}, {
		ATTRS: {

		}

	});

Y.VrApp.AppController = MyAppController;