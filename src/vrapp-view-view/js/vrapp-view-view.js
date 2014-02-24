Y.namespace('VrApp');

var ATTR_BOUNDINGBOX = 'boundingBox',
	ATTR_CONTENTBOX = 'contentBox',

	MyViewView = Y.Base.create('vrapp-view-view', Y.Widget, [], {

		/**
		 * Description
		 * @method initializer
		 * @param {} config
		 * @return 
		 */
		initializer: function (config) {
			var instance = this;
			instance._publishEvents();
		},

		BOUNDING_TEMPLATE: '<div></div>',
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
			var instance = this;
			// instance.get('contentBox').removeClass('view-hidden');
		
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

		},

		/**
		 * Description
		 * @method showUI
		 * @param {} callback
		 * @return 
		 */
		showUI: function (callback)  {
			var instance = this,
				boundingBox = instance.get(ATTR_BOUNDINGBOX),
				contentBox = instance.get(ATTR_CONTENTBOX);

			console.log('le hago show');
			console.log(boundingBox);
			boundingBox.setStyle('display', 'block');
			boundingBox.replaceClass('view-hidden', 'view-active');
			contentBox.replaceClass('view-hidden', 'view-active');
			boundingBox.transition({
			    easing: 'ease-out',
			    duration: 0.2, // seconds
			    left: 0
			}, function() {
			    //boundingBox.setStyle('display', 'block');

			    console.log('le estoy reemplazando la clase ahora');
			    boundingBox.replaceClass('view-hidden', 'view-active');
			    if(callback){
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
			    duration: 0.2, // seconds
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
			isChildsRender: {
				value:0
			}
		}

	});

Y.VrApp.ViewView = MyViewView;