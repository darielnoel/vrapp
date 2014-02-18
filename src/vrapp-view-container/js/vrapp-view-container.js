Y.namespace('VrApp');


var IMG_WIDTH = 392;
var currentImg=0;
var maxImages=2;
var speed=500;

var imgs;

var ATTR_CONTENTBOX = 'contentBox',
	ATTR_BOUNDINGBOX = 'boundingBox',

	MyContainer = Y.Base.create('vrapp-view-container', Y.Widget, [Y.WidgetParent], {

		/**
		 * Description
		 * @method initializer
		 * @param {} config
		 * @return 
		 */
		initializer: function () {
		},
		BOUNDING_TEMPLATE: '<div id="scroll"></div>',
		CONTENT_TEMPLATE: '<ul>\
							</ul>',

		/**
		 * Description
		 * @method renderUI
		 * @return 
		 */
		renderUI: function () {
			var instance = this,
				boundingBox = instance.get(ATTR_BOUNDINGBOX);
				distanceConversionRatio = 1;

			distanceConversionRatio = boundingBox.getComputedStyle('width');
			distanceConversionRatio = 100 / parseFloat(boundingBox.getComputedStyle('width').split('px')[0]);

			instance.set('distanceConversionRatio', distanceConversionRatio);


		},

		bindTouch: function(){
			var instance = this,
				boundingBox = instance.get(ATTR_BOUNDINGBOX);


				
			var swipeOptions=
			{
				triggerOnTouchEnd : true,	
				swipeStatus : Y.bind(instance.swipeStatus,instance),
				// allowPageScroll:"vertical",
				threshold:75			
				}
			
			$(function()
			{				
				imgs = $("#scroll");
				imgs.swipe( swipeOptions );
			});

		},
		swipeStatus: function(event, phase, direction, distance){
			console.log('swipeStatus');
			var instance = this;

			//If we are moving before swipe, and we are going Lor R in X mode, or U or D in Y mode then drag.
			if( phase=="move" && (direction=="left" || direction=="right") )
			{
				var duration=0;
				
				if (direction == "left")
					instance.onLeftMove(distance,duration);
					//instance.scrollImages2(0 + distance, duration);
				
				else if (direction == "right")
					instance.onRightMove(distance,duration);
					//instance.scrollImages((IMG_WIDTH * currentImg) - distance, duration);
				
			}
			
			else if ( phase == "cancel")
			{
				console.log('cancell');
				instance.scrollImages(IMG_WIDTH * currentImg, speed);
			}
			
			else if ( phase =="end" )
			{
				console.log('end fase');
				if (direction == "right"){
					//instance.previousImage();
				}
				else if (direction == "left"){
					//instance.nextImage();
					instance.nextView();
				}			
					
			}

		},

		nextView: function(){
			var instance = this,
				activeViewIndex = instance.get('activeViewIndex'),
				viewCollection = instance.get('viewCollection'),
				translateDistance = -100,
				duration = 500,
				nextViewIndex = instance.getNextViewIndex();

			if(nextViewIndex){
				instance.scrollView(translateDistance, duration, viewCollection[activeViewIndex]);
				instance.scrollView(-108, duration, viewCollection[nextViewIndex]);
				instance.set('activeViewIndex', nextViewIndex);
			}
		},

		onLeftMove: function(distance, duration){
			var instance = this,
				activeViewIndex = instance.get('activeViewIndex'),
				viewCollection = instance.get('viewCollection'),
				nextViewIndex,
				translateDistance;

			//Para la view 0
			if(activeViewIndex === 0){
				//La distancia para la vista activa
				translateDistance = (0 - distance+8) * instance.get('distanceConversionRatio');
				instance.scrollView(translateDistance, duration, viewCollection[activeViewIndex]);

				//Pido que me den la vista siguiente
				nextViewIndex = instance.getNextViewIndex();

				if ( nextViewIndex ) {

					console.log('nextView.distance');
					console.log(distance);

					translateDistance = (0 - distance+8) * instance.get('distanceConversionRatio');

					//Pongo el nodo visible
					viewCollection[nextViewIndex].removeClass('view-hidden');

					//Muestro la vista
					instance.scrollView(translateDistance, duration, viewCollection[nextViewIndex]);
				}

			}else{ //Las restantes views

				//La distancia para la vista activa
				translateDistance = -108 - distance * instance.get('distanceConversionRatio');
				
				console.log('la distancia para la vista activa');
				console.log(distance);
				console.log(translateDistance);

				instance.scrollView(translateDistance, duration, viewCollection[activeViewIndex]);

				//Pido que me den la vista siguiente
				nextViewIndex = instance.getNextViewIndex();

				if ( nextViewIndex ) {

					console.log('nextView.distance');
					console.log(distance);

					translateDistance = (0 - distance) * instance.get('distanceConversionRatio');

					//Pongo el nodo visible
					viewCollection[nextViewIndex].removeClass('view-hidden');

					//Muestro la vista
					instance.scrollView(translateDistance, duration, viewCollection[nextViewIndex]);
				}
			}


		},

		onRightMove: function(distance, duration){
			var instance = this,
				activeViewIndex = instance.get('activeViewIndex'),
				viewCollection = instance.get('viewCollection'),
				previousViewIndex,
				translateDistance,
				nextViewIndex;

			//Para la view 0
			if(activeViewIndex === 0){
				//La distancia para la vista activa
				translateDistance = (0 + distance) * instance.get('distanceConversionRatio');
				instance.scrollView(translateDistance, duration, viewCollection[activeViewIndex]);

				//Pido que me den la vista siguiente
				previousViewIndex = instance.getPreviousView();

				if ( previousViewIndex ) {

					console.log('nextView.distance');
					console.log(distance);

					translateDistance = (0 - distance) * instance.get('distanceConversionRatio');

					//Pongo el nodo visible
					viewCollection[previousViewIndex].removeClass('view-hidden');

					//Muestro la vista
					instance.scrollView(translateDistance, duration, viewCollection[previousViewIndex]);
				}

				//Pido que me den la vista siguiente
				nextViewIndex = instance.getNextViewIndex();

				if ( nextViewIndex ) {

					console.log('nextView.distance');
					console.log(distance);

					translateDistance = distance * instance.get('distanceConversionRatio');

					//Muestro la vista
					instance.scrollView(translateDistance, duration, viewCollection[nextViewIndex]);
				}

			}else{ //Las restantes views

			}			
		},

		//Devuelve la viste siguiente de la actual
		getNextViewIndex: function(){
			var instance = this;
				activeViewIndex = instance.get('activeViewIndex'),
				viewCollection = instance.get('viewCollection'),
				viewCollectionSize = viewCollection.length,
				nextViewIndex = -1;

			if(activeViewIndex+1 < viewCollectionSize){
				nextViewIndex = activeViewIndex+1;
			}

			return nextViewIndex;

		},

		//Devuelve la viste anterior de la actual
		getPreviousView: function(){
			
		},

		previousImage: function(){
			var instance = this;
			currentImg = Math.max(currentImg-1, 0);
			instance.scrollImages( IMG_WIDTH * currentImg, speed);
		},
	
		nextImage: function(){
			var instance = this;
			currentImg = Math.min(currentImg+1, maxImages-1);
			instance.scrollImages( IMG_WIDTH * currentImg, speed);
		},

		scrollView: function(distance, duration, node){
			var instance = this;

			//distance = distance * instance.get('distanceConversionRatio');
			//TODO: Recalcular ratio cuando se haga resize
			console.log('distanceConversionRatio');
			console.log(distance);

			node.setStyle("-webkit-transition-duration", (duration/1000).toFixed(1) + "s");
			node.setStyle("-webkit-transform", "translate3d("+distance +"%,0px,0px)");
		},
			
		/**
		* Manuallt update the position of the imgs on drag
		*/
		scrollImages: function(distance, duration){
			// $(".view-active").css("-webkit-transition-duration", (duration/1000).toFixed(1) + "s");
			
			// //inverse the number we set in the css
			// var value = (distance<0 ? "" : "-") + Math.abs(distance).toString();
			// $(".view-active").css("-webkit-transform", "translate3d("+value +"%,0px,0px)");
		},

		/**
		* Manuallt update the position of the imgs on drag
		*/
		scrollImages2: function(distance, duration){
			$(".view-active").css("-webkit-transition-duration", (duration/1000).toFixed(1) + "s");
			
			console.log('distance');
			console.log(distance);
			//inverse the number we set in the css
			var value = (distance<0 ? "" : "-") + Math.abs(distance).toString();
			$(".view-active").css("-webkit-transform", "translate3d("+value +"%,0px,0px)");
			console.log(value);

			var value = 0 - distance;
			console.log(value);
			$(".view-hidden45").css("-webkit-transform", "translate3d("+value +"%,0px,0px)");
			console.log(value);

			//(distance<0 ? "" : "-") + Math.abs(distance).toString();

		},

		// swipeStatus: function(event, phase, direction, distance){
		// 	console.log('swipeStatus');
		// 	var instance = this;

		// 	//If we are moving before swipe, and we are going Lor R in X mode, or U or D in Y mode then drag.
		// 	if( phase=="move" && (direction=="left" || direction=="right") )
		// 	{
		// 		var duration=0;
				
		// 		if (direction == "left")
		// 			instance.scrollImages((IMG_WIDTH * currentImg) + distance, duration);
				
		// 		else if (direction == "right")
		// 			instance.scrollImages((IMG_WIDTH * currentImg) - distance, duration);
				
		// 	}
			
		// 	else if ( phase == "cancel")
		// 	{
		// 		instance.scrollImages(IMG_WIDTH * currentImg, speed);
		// 	}
			
		// 	else if ( phase =="end" )
		// 	{
		// 		if (direction == "right")
		// 			instance.previousImage()
		// 		else if (direction == "left")			
		// 			instance.nextImage()
		// 	}

		// },

		// previousImage: function(){
		// 	var instance = this;
		// 	currentImg = Math.max(currentImg-1, 0);
		// 	instance.scrollImages( IMG_WIDTH * currentImg, speed);
		// },
	
		// nextImage: function(){
		// 	var instance = this;
		// 	currentImg = Math.min(currentImg+1, maxImages-1);
		// 	instance.scrollImages( IMG_WIDTH * currentImg, speed);
		// },
			
		// /**
		// * Manuallt update the position of the imgs on drag
		// */
		// scrollImages: function(distance, duration){
		// 	$(".view-active").css("-webkit-transition-duration", (duration/1000).toFixed(1) + "s");
			
		// 	//inverse the number we set in the css
		// 	var value = (distance<0 ? "" : "-") + Math.abs(distance).toString();
			
		// 	$(".view-active").css("-webkit-transform", "translate3d("+value +"px,0px,0px)");
		// },

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
		 * Description
		 * @method renderChilds
		 * @param {} data
		 * @return 
		 */
		renderChilds: function (childModelCollection) {
			var instance = this,
				contentBox = instance.get(ATTR_CONTENTBOX),
				itemsContainer = contentBox,
				childWidget,
				liNode = {},
				size = childModelCollection.length,
				i = 0,
				viewId = 'view';


			liNode = itemsContainer.appendChild('<li class="view-active" id="'+ viewId +'0"></li>');
			console.log(liNode);
			instance.set('activeViewIndex', 0);
			instance.get('viewIdCollection').push(viewId+0);
			instance.get('viewCollection').push(liNode);


			Y.one('.loader').addClass('hidden');
				for (i; i < size; i++) {
					if(i !== 0 && i%6 === 0){
						console.log(i);
						liNode = itemsContainer.appendChild('<li class="view-hidden" id="'+ viewId +i +'"></li>');
						instance.get('viewIdCollection').push(viewId+i);
						instance.get('viewCollection').push(liNode);
					}
					childWidget = new Y.VrApp.Item(childModelCollection[i]).render(liNode);
					instance.get('itemCollection').push(childWidget);
					if(i == 5 || (i == size-1 && i < 6)){
						childWidget.after('render',instance.showUI, instance);
					} else if (i >=5 ){
						childWidget.get('boundingBox').setStyle('opacity',1);
						childWidget.get('boundingBox').removeClass('hidden');
					}
					
				};				

			//I d'like remove html elements that can be used after
			//itemsContainer.one('.loader').addClass('hidden');


		},

		showUI: function(e){
			console.log('After render');
			console.log(e);
			//Y.AsyncQueue.defaults.timeout = -1;
			var instance = this,
				itemCollection = instance.get('itemCollection'),
				q = new Y.AsyncQueue(),
				size = itemCollection.length;

			for (var i = 0; i < itemCollection.length; i++) {
				itemCollection[i].showUI(function(){
				});
			}

		},

		showLiUI: function (liNode,callback)  {
			var instance = this,
				boundingBox = instance.get(ATTR_BOUNDINGBOX);

			console.log('showLiUI');
			console.log(liNode);
			liNode.replaceClass('view-hidden', 'view-active');
			liNode.setStyle('display', 'block');
			liNode.transition({
			    easing: 'ease-out',
			    duration: 0.3, // seconds
			    left: 0
			}, function() {
			    //boundingBox.setStyle('display', 'block');
			    if(callback){
			    	liNode.replaceClass('view-hidden', 'view-active');
			    	callback();	
			    }
			    
			});
		},

		hideLiUI: function (liNode, callback, hideEffect) {
			var instance = this,
				boundingBox = instance.get(ATTR_BOUNDINGBOX),
				leftPosition = '-100%';

			if(hideEffect === 'slideToRight'){
				leftPosition = '100%';
			}

			liNode.transition({
			    easing: 'ease-out',
			    duration: 0.3, // seconds
			    left: leftPosition
			}, function() {
				liNode.replaceClass('view-active', 'view-hidden');
			    liNode.setStyle('display', 'none');
			    if(callback){
			    	callback();	
			    }
			    
			});
		},

		syncData: function(data){

		},

		/**
		 * Description
		 * @method filterItems
		 * @param {} query
		 * @return 
		 */
		filterItems: function (query) {
			var instance = this,
				size = instance.size(),
				i = 0;
			for (i; i < size; i++) {
				instance.item(i).applyFilter(query);
			}

		}

	}, {
		ATTRS: {
			childModelCollection:{
				value: []
			},
			itemCollection: {
				value:[]
			},
			activeViewIndex:{
				value:''
			},
			viewIdCollection:{
				value:[]
			},
			viewCollection:{
				value:[]
			},
			gestureMoveHandle:{
				value:null
			},
			distanceConversionRatio: {
				value: 1
			}
		}

	});

Y.VrApp.Container = MyContainer;