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

		closeHelpAction: function(params){
			console.log('Se cierra la ayuda');
			var textNode = Y.one('.select-vocalrange-text');
			textNode.transition({
			    easing: 'ease-out',
			    duration: 0.3, // seconds
			    opacity: '1',
			}, function() {
				textNode.setStyle('visibility', 'visible');
			});
			
		},

		//Cambia los artistas que coinciden con un rango vocal
		syncRangeSelectionAction: function(params){
			console.log('syncRangeSelectionAction');
			var data = params.data,
				selectorRange = Y.VrApp.App.View.minRangeSelector;

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

			//Se limpia el container
			Y.VrApp.App.View.artistContainer.cleanData();

			//Se mandan a buscar los nuevos datos

			//Se sincronizan los nuevos datos
			Y.VrApp.App.View.artistContainer.syncData([]);
		},

		openSelectorRangeAction: function(params){
			console.log('openSelectorRangeAction');
			if(params.data.type === 'minThumb'){
				//Abrir el selector de rango min
				$('#minThumbModal').modal({});
			}else {
				//Abrir el selector de rango max
				$('#maxThumbModal').modal({});
			}
		},

		unlockAppAction: function(){
			console.log('unlockAppAction');
			$('#inAppPayModal').modal({});
			
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

		shareAction: function(params){
			var instance = this,
				action = params.data.action;

			if(action === 'twitter'){
				instance.shareTwitterHelper({});
			} else if(action === 'facebook'){
				instance.shareFacebookHelper({});
			} else if (action === 'google') {
				instance.shareGoogleHelper({});
			};
		},

		//Compartir en Twiter
		shareTwitterHelper: function(params){
			console.log('open twitter');
			$('#inAppPayModal').modal({});
		},

		//Compartir en Facebook
		shareFacebookHelper: function(params){
			console.log('open facebook');
			$('#inAppPayModal').modal({});
		},

		//Compartir en Google Plus
		shareGoogleHelper: function(params){
			console.log('open google');
			$('#inAppPayModal').modal({});
		}



	}, {
		ATTRS: {

		}

	});

Y.VrApp.AppController = MyAppController;