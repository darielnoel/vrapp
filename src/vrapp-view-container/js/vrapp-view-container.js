Y.namespace('VrApp');

var ATTR_CONTENTBOX = 'contentBox',
	ATTR_BOUNDINGBOX = 'boundingBox',

	MyContainer = Y.Base.create('vrapp-view-container', Y.Widget, [], {

		/**
		 * Description
		 * @method initializer
		 * @param {} config
		 * @return 
		 */
		initializer: function () {
		},
		BOUNDING_TEMPLATE: '<div></div>',

		/**
		 * Description
		 * @method renderUI
		 * @return 
		 */
		renderUI: function () {
			var instance = this,
				contentBox = instance.get(ATTR_CONTENTBOX),
				boundingBox = instance.get(ATTR_BOUNDINGBOX),
				indicatorHMTL = '',
				viewWidth = instance.get('viewWidth');

			//viewWidth se toma como referencia para trasladar la vista activa
			viewWidth = parseFloat(boundingBox.getComputedStyle('width').split('px')[0]);

			instance.set('viewWidth', viewWidth);

			//scrollNode es el cotenedor de todas las vistas
			instance.set('scrollNode', contentBox.one('.artist-scrollview-scroll'));
		},

		//Se configura la lib swipe
		//http://labs.rampinteractive.co.uk/touchSwipe/docs/symbols/%24.fn.swipe.html
		bindTouch: function(){
			var instance = this,
				boundingBox = instance.get(ATTR_BOUNDINGBOX),				
				swipeOptions = {
					triggerOnTouchEnd : true,	
					swipeStatus : Y.bind(instance.swipeStatus,instance),
					threshold:75			
				};
			
			//TODO: Deberia hacerse con YUI en un futuro
			$(function(){				
				$(".artist-scrollview-scroll").swipe( swipeOptions );
			});

		},

		//Callback que es ejecutado por Swipe ante los eventos, move,end y cancel
		swipeStatus: function(event, phase, direction, distance){
			var instance = this,
				activeViewIndex = instance.get('activeViewIndex'),
				viewWidth = instance.get('viewWidth');

			//If we are moving before swipe, and we are going Lor R in X mode, or U or D in Y mode then drag.
			if( phase=="move" && (direction=="left" || direction=="right") )
			{
				var duration=0;
				
				if (direction == "left")
					instance.scrollViews((viewWidth * activeViewIndex) + distance, duration);
				
				else if (direction == "right")
					instance.scrollViews((viewWidth * activeViewIndex) - distance, duration);
				
			}
			
			else if ( phase == "cancel")
			{
				instance.scrollViews(viewWidth * activeViewIndex, instance.get('translationSpeed'));
			}
			
			else if ( phase =="end" )
			{
				if (direction == "right")
					instance.previousView()
				else if (direction == "left")			
					instance.nextView()
			}

		},

		//La vista activa se cambia por la previa
		previousView: function(){
			var instance = this;
				activeViewIndex = instance.get('activeViewIndex'),
				contentBox = instance.get(ATTR_CONTENTBOX),
				selectorLiNodeCollection = contentBox.one('.artist-scrollview-indicator-content').get('childNodes'),
				viewWidth = instance.get('viewWidth');


			selectorLiNodeCollection.item(activeViewIndex).removeClass('active');

			activeViewIndex = Math.max(activeViewIndex-1, 0);

			instance.scrollViews( viewWidth * activeViewIndex, instance.get('translationSpeed'));

			selectorLiNodeCollection.item(activeViewIndex).addClass('active');

			instance.set('activeViewIndex', activeViewIndex);

		},
		
		//La vista activa se cambia por la siguiente
		nextView: function(){
			var instance = this;
				activeViewIndex = instance.get('activeViewIndex'),
				contentBox = instance.get(ATTR_CONTENTBOX),
				selectorLiNodeCollection = contentBox.one('.artist-scrollview-indicator-content').get('childNodes'),
				viewWidth = instance.get('viewWidth'),
				viewCollectionSize = instance.get('viewCollection').length;

			//le quito el activo a la activa
			selectorLiNodeCollection.item(activeViewIndex).removeClass('active');

			activeViewIndex = Math.min(activeViewIndex+1, viewCollectionSize-1);
			instance.scrollViews( viewWidth * activeViewIndex, instance.get('translationSpeed'));

			selectorLiNodeCollection.item(activeViewIndex).addClass('active');

			instance.set('activeViewIndex', activeViewIndex);
		},
			
		/**
		* Manuallt update the position of the imgs on drag
		*/
		scrollViews: function(distance, duration){
			var instance = this,
				scrollNode = instance.get('scrollNode');

			scrollNode.setStyle("-webkit-transition-duration", (duration/1000).toFixed(1) + "s");
			
			//inverse the number we set in the css
			var value = (distance<0 ? "" : "-") + Math.abs(distance).toString();
			
			scrollNode.setStyle("-webkit-transform", "translate3d("+value +"px,0px,0px)");
		},

		/**
		 * Description
		 * @method syncUI
		 * @return 
		 */
		syncUI: function () {
			var instance = this;
			instance.renderChilds(instance.get('childModelCollection'));
			instance.bindTouch();
		},

		/**
		 * Renderiza una collecion de modelos hijos en el widget
		 * es el responsable de crear la coleccion de vistas y los items de cada una 
		 * @method renderChilds
		 * @param {} childModelCollection
		 * @return 
		 */
		renderChilds: function (childModelCollection) {
			var instance = this,
				contentBox = instance.get(ATTR_CONTENTBOX),
				itemsContainer = contentBox.one('ul'),
				childWidget,
				liNode = {},
				size = childModelCollection.length,
				i = 0,
				viewId = 'view',
				viewCollection = instance.get('viewCollection');

			//Creo la vista activa por defecto
			liNode = itemsContainer.appendChild('<li class="view-active" id="'+ viewId +'0"></li>');
			instance.set('activeViewIndex', 0);
			viewCollection.push(liNode);

			//Se muestra una vista diferente para cuando no hay modelos que mostrar
			if(size < 1){
				instance.showEmptyResults();
			}

			//Se esconde el cargando
			contentBox.one('.artist-scrollview-loader').addClass('hidden');

				for (i; i < size; i++) {

					//Cada 6 items se crea una nueva View
					if(i !== 0 && i%6 === 0){
						liNode = itemsContainer.appendChild('<li></li>');
						viewCollection.push(liNode);
					}

					//Se crea un nuevo widget por elemento
					childWidget = new Y.VrApp.Item(childModelCollection[i]).render(liNode);

					//Si el behavior Agrego que el router escuche los eventos del item
					if(childWidget.get('behavior') === 'blocked'){
						childWidget.addTarget(Y.VrApp.App.Util.Router);
					}

					instance.get('itemCollection').push(childWidget);

					//Cuando se tienen los items de la primera pantalla se muestran
					//con una animacion
					if(i == 5 || (i == size-1 && i < 6)){
						childWidget.after('render',instance.showUI, instance);
					} else if (i >=5 ){
						//No es necesaria una animacion para los que no se encuentran en la primera view
						childWidget.get('boundingBox').setStyle('opacity',1);
						childWidget.get('boundingBox').removeClass('hidden');
					}
					
				};

			//Se muestra el indicador
			instance.renderIndicator();		

			//Se actualiza el tamanno de la View para el translate
			viewWidth = parseFloat(liNode.getComputedStyle('width').split('px')[0]);
			instance.set('viewWidth', viewWidth);
		},

		//Muestra un mensaje de resultado vacio en la pantalla activa
		showEmptyResults: function(){
			var instance = this,
				contentBox = instance.get(ATTR_CONTENTBOX),
				viewCollection = instance.get('viewCollection'),
				activeViewIndex = instance.get('activeViewIndex'),
				activeViewNode = viewCollection[activeViewIndex],
				messageHTML = '<div class="empty-results">\
									<img src="assets/images/notresults.png" class="empty" alt="">\
							   		<span class="normal-text">\
										It\'s a shame, there are not results.\
									</span>\
								</div>';



			//TODO: Disennar que cartel se va a poner
			activeViewNode.set('innerHTML', messageHTML);
		},

		//Muestra el indicador en dependencia de la cantidad de vistas
		renderIndicator: function(){
			var instance = this,
				contentBox = instance.get(ATTR_CONTENTBOX),
				viewCollection = instance.get('viewCollection'),
				activeViewIndex = instance.get('activeViewIndex'),
				size = viewCollection.length,
				i = 0,
				indicatorHTMLContent = '';

			for (i; i < size; i++) {

				indicatorHTMLContent += '<li ';
				//Se marca como activo
				if(i == activeViewIndex){
					indicatorHTMLContent += 'class="active"';
				}

				indicatorHTMLContent += '></li>';
			}

			contentBox.one('ul.artist-scrollview-indicator-content').set('innerHTML', indicatorHTMLContent);
			contentBox.one('.artist-scrollview-indicator-nav').removeClass('hidden');
		},

		//Se usa para que los items aparezcan con una animacion
		showUI: function(e){
			var instance = this,
				itemCollection = instance.get('itemCollection'),
				size = itemCollection.length;

			for (var i = 0; i < size; i++) {
					itemCollection[i].showUI(function(){
				});
			}

		},

		//Recibe un itemCollectionModel y sincroniza la interfaz con respecto a este
		syncData: function(data){
			var instance = this;

			//Muestro las nuevas vistas
			instance.renderChilds(data);

		},

		cleanData: function(){
			var instance = this,
				contentBox = instance.get(ATTR_CONTENTBOX),
				itemCollection = instance.get('itemCollection'),
				viewCollection = instance.get('viewCollection'),
				scrollNode = instance.get('scrollNode'),
				selectorLiNodeCollection = contentBox.one('.artist-scrollview-indicator-content').get('childNodes');

			console.log('syncData');

			//Muestro el cargando
			contentBox.one('.artist-scrollview-loader').removeClass('hidden');

			//Escondo el indicador
			contentBox.one('.artist-scrollview-indicator-nav').addClass('hidden');

			//Limpio el indicador
			selectorLiNodeCollection.each(function(item){
				item.purge();
				item.remove();
			});

			//Limpio los itemCollection y quito
			for (var i = 0; i < itemCollection.length; i++) {
				console
				itemCollection[i].detachAll();
				itemCollection[i].remove();
			};

			instance.set('itemCollection', []);

			//Limpio las vistas
			for (var i = 0; i < viewCollection.length; i++) {
				viewCollection[i].purge();
				viewCollection[i].remove();
			};

			instance.set('viewCollection', []);

			//Pongo en su lugar el scroll
			scrollNode.setStyle("-webkit-transform", "translate3d(0px,0px,0px)");
		},

		showLoader: function(){
			var instance = this,
				contentBox = instance.get(ATTR_CONTENTBOX);
			
			contentBox.one('.artist-scrollview-loader').removeClass('hidden');
		}

	}, {
		ATTRS: {
			//Lista de Modelos
			childModelCollection:{
				value: []
			},

			//Lista de widgets tipo item
			itemCollection: {
				value:[]
			},

			//Indice de la vista que se encuentra activa
			activeViewIndex:{
				value:0
			},

			//Lista de vistas del widget(li)
			viewCollection:{
				value:[]
			},

			//Tamanno de una vista, se usa para trasladar
			viewWidth:{
				value:392
			},

			//Velocidad de la traslacion
			translationSpeed: {
				value:500
			},

			//Es el nodo que contiene las vistas y es usado para los eventos touch
			scrollNode:{
				value:{}
			}
		}

	});

Y.VrApp.Container = MyContainer;