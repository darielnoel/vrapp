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
			var instance = this;

			console.log('showMainViewAction');

			App.Controller.controllerView.setActiveView(1);

	
			if(App.View.MainView.get('isChildsRender')){
				App.View.LandingView.hideUI(function(){
					App.View.MainView.showUI();
				});
			} else {
				App.View.LandingView.hideUI(function(){
					
					App.View.MainView.showUI(function(){
						Y.one('#main-view .main-view-container').setStyle('opacity','1');					
					});
					instance.showMainViewArtistContainerHelper();
				});

				instance.showMainViewHelpViewHelper();

				instance.showMainViewRangeSliderHelper();

				instance.showMainViewSelectorHelper();

				instance.showMainViewShareBarHelper();

				App.View.MainView.set('isChildsRender', 1)		
			}

			

			
		},

		showMainViewArtistContainerHelper: function(){
			var artistModelCollection = APP_CONFIG.tests.artistModelCollection,
				artistContainer;

			artistContainer = new Y.VrApp.Container({
				childModelCollection: artistModelCollection,
				srcNode: Y.one('.artist-scrollview-container')
			});

			Y.VrApp.App.View.artistContainer = artistContainer;
			Y.VrApp.App.View.artistContainer.render();			
		},

		showMainViewHelpViewHelper: function(){
			//Help View
			var helpView = new Y.VrApp.HelpView({
				srcNode: Y.one('.help-container')
			}).render();

			helpView.addTarget(App.Util.Router);
			Y.VrApp.App.View.helpView = helpView;
		},

		showMainViewRangeSliderHelper: function(){
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
		},

		showMainViewSelectorHelper: function(){
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
		},

		showMainViewShareBarHelper: function(){
			//Share View
			var shareBar = new Y.VrApp.ShareBar({
				srcNode: Y.one('.share')
			}).render();

			shareBar.addTarget(App.Util.Router);
			Y.VrApp.App.View.shareBar = shareBar;
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
			var instance = this;
				message = instance.getSocialMessageHelper();

			if(typeof Android != "undefined") {
				Android.shareTwitter(message);	
			} else {
				$('#inAppPayModal').modal({});
			}
			
			
		},

		//Compartir en Facebook
		shareFacebookHelper: function(params){
			console.log('open facebook');
			var instance = this;
				message = instance.getSocialMessageHelper();

			if(typeof Android != "undefined") {
				Android.shareFacebook(message);	
			} else {
				$('#inAppPayModal').modal({});
			}
		},

		//Compartir en Google Plus
		shareGoogleHelper: function(params){
			console.log('open google');
			var instance = this;
				message = instance.getSocialMessageHelper();

			if(typeof Android != "undefined") {
				Android.shareGoogle(message);	
			} else {
				$('#inAppPayModal').modal({});
			}
			
		},

		getSocialMessageHelper: function(){
			var childModelCollection = Y.VrApp.App.View.artistContainer.get('childModelCollection'), 
			 	message = 'Hey friends, I can sing like ',
			 	childModelCollectionSize = childModelCollection.length,
			 	chartsNamesCounter = 0,
			 	namesCounter = 0,
			 	artistName,
			 	artistNameSize,
			 	i = 0;

			//Recorro los artistas
			for (var i = 0; i < childModelCollectionSize; i++) {
				if(childModelCollection[i].behavior !== 'blocked'){
					artistName = childModelCollection[i].name;
					artistNameSize = artistName.length;
					
					if(artistNameSize + chartsNamesCounter < 58){
						message += artistName + ',';
						chartsNamesCounter += artistNameSize;
						namesCounter++;
					} else {
						break;
					}
				}
			};

			namesCounter = childModelCollectionSize - namesCounter;
			message += ' and others ' + namesCounter + ' great singers. And You?? Find out in ' + APP_CONFIG.playStore.link;
			console.log(message);
			return message;
		}



	}, {
		ATTRS: {

		}

	});

Y.VrApp.AppController = MyAppController;