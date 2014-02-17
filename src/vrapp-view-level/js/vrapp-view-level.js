Y.namespace('VrApp');

var ATTR_BOUNDINGBOX = 'boundingBox',
	ATTR_CONTENTBOX = 'contentBox',

	MyLevelView = Y.Base.create('vrapp-view-level', Y.Widget, [], {

		/**
		 * Description
		 * @method initializer
		 * @param {} config
		 * @return 
		 */
		initializer: function (config) {
			var instance = this;
			instance._publishEvents();
			console.log('Hello LevelView');
		},

		//BOUNDING_TEMPLATE: '<div class="view-hidden"></div>',
		/**
		 * Description
		 * @method _publishEvents
		 * @return 
		 */
		_publishEvents: function () {
			var instance = this;
		},

		/**
		 * Description
		 * @method renderUI
		 * @return 
		 */
		renderUI: function () {
			var instance = this,
				contentBox = instance.get('ATTR_CONTENTBOX');
		},

		/**
		 * Description
		 * @method bindUI
		 * @return 
		 */
		bindUI: function () {
			var instance = this,
				boundingBox = instance.get('contentBox'); 
		},

		/**
		 * Description
		 * @method syncUI
		 * @return 
		 */
		syncUI: function () {
			var instance = this,
				contentBox = instance.get('ATTR_CONTENTBOX'),
				//TODO: Deberia ser dinamico
				pixelSize = instance.get('pixelSize'),
				maxValue =  instance.get('maxValue');

			ratio = pixelSize/maxValue;
			instance.set('ratio', ratio);
		},

		syncData: function(data){
			var instance = this,
				ratio = instance.get('ratio'),
				indicatorValue;

			if(data == instance.get('umbral')){
				indicatorValue = 125;
			} else {
				indicatorValue = instance.get('pixelSize') - (data * ratio);
				//TODO: Esta cableado al duro, esto deberia hacerse dinamico
				if(indicatorValue >= 214){
					indicatorValue = 214;
				}

     		}

			instance.syncIndicator(indicatorValue);
		},
		//pos.left pos.top
		syncIndicator: function(pos){
			var instance = this,
				contentBox = instance.get(ATTR_CONTENTBOX),
				node = contentBox.one('.frequency-level-indicator');
			console.log(pos);

			node.transition({
			    easing: 'ease-in-out',
			    duration: 0.3, // seconds
			    top: pos+'px'
			}, function() {
			    //boundingBox.setStyle('display', 'block');
			    // if(callback){
			    // 	boundingBox.replaceClass('view-hidden', 'view-active');
			    // 	callback();	
			    // }
			    
			});

		},

		setUmbral: function(umbral){
			instance.set('umbral',umbral);
		},

		/**
		 * Description
		 * @method showUI
		 * @param {} callback
		 * @return 
		 */
		showUI: function (callback)  {
			var instance = this,
				boundingBox = instance.get(ATTR_BOUNDINGBOX);

			boundingBox.setStyle('display', 'block');
			boundingBox.transition({
			    easing: 'ease-out',
			    duration: 0.3, // seconds
			    left: 0
			}, function() {
			    //boundingBox.setStyle('display', 'block');
			    if(callback){
			    	boundingBox.replaceClass('view-hidden', 'view-active');
			    	callback();	
			    }
			    
			});
		},

		/**
		 * Description
		 * @method hideUI
		 * @param {} callback
		 * @param {} hideEffect
		 * @return 
		 */
		hideUI: function (callback, hideEffect) {
			var instance = this,
				boundingBox = instance.get(ATTR_BOUNDINGBOX),
				leftPosition = '-100%';

			if(hideEffect === 'slideToRight'){
				leftPosition = '100%';
			}

			boundingBox.transition({
			    easing: 'ease-out',
			    duration: 0.3, // seconds
			    left: leftPosition
			}, function() {
				boundingBox.replaceClass('view-active', 'view-hidden');
			    boundingBox.setStyle('display', 'none');
			    if(callback){
			    	callback();	
			    }
			    
			});
		}

	}, {
		ATTRS: {
			pixelSize: {
				value: 250
			},
			maxValue: {
				value: 540
			},
			minValue: {
				value: 0
			},
			ratio: {
				value: 1
			},
			umbral: {
				value: 0
			},
			umbralRepresentation: {
				value: 125
			}
		}

	});

Y.VrApp.LevelView = MyLevelView;