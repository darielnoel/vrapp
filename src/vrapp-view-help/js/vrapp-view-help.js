Y.namespace('VrApp');

var ATTR_BOUNDINGBOX = 'boundingBox',
	ATTR_CONTENTBOX = 'contentBox',

	MyHelpView = Y.Base.create('vrapp-view-help', Y.Widget, [], {

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

		// BOUNDING_TEMPLATE: '<div class="view-hidden"></div>',

		/**
		 * Description
		 * @method _publishEvents
		 * @return 
		 */
		_publishEvents: function () {
			var instance = this;
			instance.publish('closeHelpAction', {
				emitFacade: true,
				broadcast: 1
			});
		},

		/**
		 * Description
		 * @method renderUI
		 * @return 
		 */
		renderUI: function () {
			var instance = this,
				boundingBox = instance.get(ATTR_BOUNDINGBOX);
		},

		/**
		 * Description
		 * @method bindUI
		 * @return 
		 */
		bindUI: function () {
			var instance = this,
				boundingBox = instance.get(ATTR_BOUNDINGBOX),
				container = boundingBox.one('.help-container');
			// 	selectorHandleNode,
			// 	keyCollection = instance.get('keyCollection');

			container.on('gesturemovestart', instance.tapWidgetHandle,{}, instance);
		},

		/**
		 * Description
		 * @method syncUI
		 * @return 
		 */
		syncUI: function () {
			var instance = this,
				autoCloseHandle;

			autoCloseHandle = Y.later(5000, Y, function(){
				instance.tapWidgetHandle();
			},true);

			instance.set('autoCloseHandle', autoCloseHandle);
		},

		tapWidgetHandle: function(e){
			var instance = this,
				boundingBox = instance.get(ATTR_BOUNDINGBOX);

			if(e){
				e.stopPropagation();
				e.halt();			
			}

			if(instance.get('autoCloseHandle')){
				instance.get('autoCloseHandle').cancel();
			}

			boundingBox.transition({
			    easing: 'ease-out',
			    duration: 0.2, // seconds
			    opacity: '0',
			}, function() {
				boundingBox.addClass('hidden');
			});		

			instance.fire('closeHelpAction', {});


		}


	}, {
		ATTRS: {
			autoCloseHandle:{
				value:null
			}
		}

	});

Y.VrApp.HelpView = MyHelpView;
