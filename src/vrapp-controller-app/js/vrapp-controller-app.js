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
		syncRangeSelectionAction: function(params){
			console.log('syncRangeSelectionAction');
			var data = params.data,
				selectorRange = Y.VrApp.App.View.minRangeSelector;
			// {keyIndex: 1, type: "minThumb"} 
			Y.VrApp.App.View.rangeSlider.syncThumbByValue(data.type, data.keyIndex);

			if(data.type === 'minThumb'){
				console.log('minThumb');
				Y.VrApp.App.View.maxRangeSelector.syncSelectableRange(data.keyIndex);
				$('#minThumbModal').modal('hide');
			} else {
				console.log('maxThumb');
				Y.VrApp.App.View.minRangeSelector.syncSelectableRange(data.keyIndex);
				$('#maxThumbModal').modal('hide');
			}
			//Se manda a buscar los nuevos datos
			//Cuando lleguen se actualiza
			//Y.VrApp.App.View.rangeSlider.getMinRange(), Y.VrApp.App.View.rangeSlider.getMaxRange()
			Y.VrApp.App.View.artistContainer.syncData([ ]);
		},
<<<<<<< HEAD
<<<<<<< HEAD

		openSelectorRangeAction: function(params){
			console.log('openSelectorRangeAction');
			console.log(params);
			if(params.data.type === 'minThumb'){
				//Abrir el selector de rango min
				$('#minThumbModal').modal({});
			}else {
				//Abrir el selector de rango max
				$('#maxThumbModal').modal({});
			}
		},
=======
>>>>>>> df8ef3374d4140d56d2e8ffe40c558f45eb4de7f
=======
>>>>>>> df8ef3374d4140d56d2e8ffe40c558f45eb4de7f

		openSelectorRangeAction: function(params){
			console.log('openSelectorRangeAction');
			console.log(params);
			if(params.data.type === 'minThumb'){
				//Abrir el selector de rango min
				$('#minThumbModal').modal({});
			}else {
				//Abrir el selector de rango max
				$('#maxThumbModal').modal({});
			}
		},

		//Abre el selector de rangos para el inferior
		openMinRangeSelectorHelper: function(params){

		},

		//Abre el selector de rangos para el superior
		openMaxRangeSelectorHelper: function(params){

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