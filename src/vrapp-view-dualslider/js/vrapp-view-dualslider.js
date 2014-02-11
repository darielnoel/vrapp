Y.namespace('VrApp');

var ATTR_BOUNDINGBOX = 'boundingBox',
	ATTR_CONTENTBOX = 'contentBox',

	MyDualSlider = Y.Base.create('vrapp-view-dualslider', Y.Base, [], {

		/**
		 * Description
		 * @method initializer
		 * @param {} config
		 * @return 
		 */
		initializer: function (config) {
			var instance = this;
			instance._publishEvents();
			console.log('Hello DualSlider');
		},

		/**
		 * Description
		 * @method _publishEvents
		 * @return 
		 */
		_publishEvents: function () {
			var instance = this;
			instance.publish('valueChange', {
				emitFacade: true,
				broadcast: 1
			});
		},

		render: function(){
			var instance = this;
			instance.renderUI();
			instance.bindUI();
			instance.syncUI();
		},

		/**
		 * Description
		 * @method renderUI
		 * @return 
		 */
		renderUI: function () {
			var instance = this,
				trackNode = instance.get('track').node,
				minThumbNode = instance.get('minThumb').node,
				maxThumbNode = instance.get('maxThumb').node,
				thumbTrackNode = instance.get('thumbTrack').node,
				thumbTrackDelay,
				nodeLength;

			//Inicializando el tamanno en pixeles del node traking
			nodeLength = instance.get('track').node.get('offsetWidth');

			console.log('renderUI.nodeLength');
			console.log(nodeLength);


			// //Pivote central de los thumbs
			// var minSelectorArm = minThumbNode.one('.selector-arm').get('offsetWidth')/2,
			// 	maxSelectorArm = maxThumbNode.one('.selector-arm').get('offsetWidth')/2;

			// instance.get('minThumb').middlePivot = minThumbNode.get('offsetWidth')/2 + minSelectorArm;
			// instance.get('maxThumb').middlePivot = maxThumbNode.get('offsetWidth')/2 + maxSelectorArm;

			//Pivote central de los thumbs
			var minSelectorArm = minThumbNode.one('.selector-arm').getX(),
				maxSelectorArm = maxThumbNode.one('.selector-arm').getX();



			instance.get('minThumb').middlePivot = minSelectorArm - minThumbNode.getX();
			instance.get('maxThumb').middlePivot = maxSelectorArm - maxThumbNode.getX();

			console.log('minThumb.middlePivot');
			console.log(instance.get('minThumb').middlePivot);

			console.log('maxThumb.middlePivot');
			console.log(instance.get('maxThumb').middlePivot);







			//Delay entre el track general y el track de los thumbs
			thumbTrackDelay = trackNode.getX() - thumbTrackNode.getX();
			instance.get('thumbTrack').delay = thumbTrackDelay;

			console.log('YUI3.trackNode Position');
			console.log(trackNode.getX());

			console.log('YUI3.thumbTrackNode Position');
			console.log(thumbTrackNode.getX());


			console.log('renderUI.thumbTrackDelay.YUI');
			console.log(thumbTrackDelay);

			



			instance.set('nodeLength', nodeLength);

		},

		/**
		 * Description
		 * @method bindUI
		 * @return 
		 */
		bindUI: function () {
			// var instance = this,
			// 	contentBox = instance.get(ATTR_CONTENTBOX),
			// 	minThumbDOMNode = instance.get('minThumb').node.getDOMNode(),
			// 	maxThumbDOMNode = instance.get('maxThumb').node.getDOMNode();

			

			// //TODO: touchstart Event
			// minThumbDOMNode.addEventListener('touchstart', function(e){
			// 	instance.syncThumbOnStart(e, instance.get('minThumb'));
			// 	e.preventDefault(); // prevent default click behavior
			// });

			// maxThumbDOMNode.addEventListener('touchstart', function(e){

			// });

			// //TODO: touchmove Event
			// minThumbDOMNode.addEventListener('touchmove', function(e){
			// 	instance.syncThumbOnMove(e, instance.get('minThumb'));
			// 	e.preventDefault();				
			// });
			// maxThumbDOMNode.addEventListener('touchmove', instance.maxThumbNodeMoveHandle);

		},

		syncThumbOnStart: function(e, thumb){
			var instance = this,
				touchobj = e.changedTouches[0], // reference first touch point
				boxleft =  thumb.node.getX() + thumb.middlePivot,//parseInt(box2.style.left) // get left position of box
				startx = parseInt(touchobj.clientX); // get x coord of touch point

				thumb.startx = startx;
				thumb.boxleft = boxleft;
		},

		syncThumbOnMove: function(e, thumb){
			var instance = this;
				var touchobj = e.changedTouches[0], // reference first touch point for this event
					dist = parseInt(touchobj.clientX) - thumb.startx, // calculate dist traveled by touch point
					boxleft = thumb.boxleft,
					positionNodeValue = 0,
					positionValue;

				//Dar una mayor sensacion de movimiento
				dist = dist * 1.2;
				positionNodeValue = boxleft + dist;

				positionValue = positionNodeValue / instance.get('conversionRatio');


				instance.syncThumbByValue(thumb, positionValue);
				// move box according to starting pos plus dist
				// with lower limit 0 and upper limit 380 so it doesn't move outside track:
				//thumb.node.setStyle('left', ( (boxleft + dist < 0)? 0 : boxleft + dist ) + 'px');
		},

		/**
		 * Description
		 * @method syncUI
		 * @return 
		 */
		syncUI: function () {
			var instance = this,
				contentBox = instance.get('ATTR_CONTENTBOX'),
				minThumb = instance.get('minThumb'),
				maxThumb = instance.get('maxThumb'),
				range = instance.get('range'),
				conversionRatio;

			conversionRatio = instance.get('nodeLength') / range;
			instance.set('conversionRatio', conversionRatio);

			console.log('syncUI.conversionRatio');
			console.log(conversionRatio);

			instance.syncThumbByValue(minThumb, minThumb.value);
			instance.syncThumbByValue(maxThumb, maxThumb.value);



		},

		minThumbNodeMoveStartHandle: function(e){
			touchobj = e.changedTouches[0] // reference first touch point
			boxleft = parseInt(box2.style.left) // get left position of box
			startx = parseInt(touchobj.clientX) // get x coord of touch point
			e.preventDefault() // prevent default click behavior

			console.log(touchobj);
		},

		minThumbNodeMoveHandle: function(e){

		},

		maxThumbNodeMoveStartHandle: function(e){
			var touchobj = e.changedTouches[0];
			console.log(touchobj);
		},

		maxThumbNodeMoveHandle: function(e){

		},

		//Dado un valor sincroniza la pocision del thumb
		syncThumbByValue: function(thumb, value){
			var instance = this,
				contentBox = instance.get('ATTR_CONTENTBOX'),
				valuePixel,
				conversionRatio = instance.get('conversionRatio'),
				middlePivot = thumb.middlePivot;

			valuePixel = value * conversionRatio;

			//Pivote central
			valuePixel = valuePixel - middlePivot; //instance.get('thumbTrack').delay;

			console.log('middlePivot');
			console.log(middlePivot);


			//TODO: Ver prk pasa esto?
			if(thumb.type === 'minThumb'){
				valuePixel = valuePixel + instance.get('thumbTrack').delay;
			} else {
				// valuePixel = (value+1) * conversionRatio;
				// valuePixel = valuePixel - middlePivot;
			}
			
			console.log('syncThumbByValue.valuePixel del pivote central');
			console.log(valuePixel);
			thumb.node.setStyle('left',valuePixel +'px');

			instance.fire('vrapp-view-dualslider:valueChange', {
				data: value
			});
		},

		syncData: function(data){
			var instance = this;
		},
		//pos.left pos.top
		syncIndicator: function(pos){
			var instance = this,
				contentBox = instance.get(ATTR_CONTENTBOX);

		}


	}, {
		ATTRS: {
			track: {
				value: {
					node: {}
				}
			},
			thumbTrack:{
				value: {
					node: {},
					delay: 0
				}
			},
			minThumb: {
				value: {
					value:30,
					type:'minThumb',
					node:{},
					middlePivot: 0,
					startx:0,
					boxleft:0
				}
			},
			maxThumb: {
				value: {
					value:100,
					type:'maxThumb',
					node:{},
					middlePivot: 0,
					startx:0,
					boxleft:0,
				}
			},
			range:{
				value:100
			},
			nodeLength:{
				value:100
			},
			conversionRatio: {
				value: 1
			}
		}

	});

Y.VrApp.DualSlider = MyDualSlider;
