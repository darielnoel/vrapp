Y.namespace('VrApp');

var ATTR_BOUNDINGBOX = 'boundingBox',
	ATTR_CONTENTBOX = 'contentBox',

	MyShareBar = Y.Base.create('vrapp-view-sharebar', Y.Widget, [], {

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
			instance.publish('shareAction', {
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
				shareNode = boundingBox.one('.share');
			// 	selectorHandleNode,
			// 	keyCollection = instance.get('keyCollection');

			shareNode.delegate('tap', instance.itemClickHandle,'li', instance, {});
		},

		/**
		 * Description
		 * @method syncUI
		 * @return 
		 */
		syncUI: function () {
			var instance = this,
				boundingBox = instance.get(ATTR_BOUNDINGBOX),
				shareNode = boundingBox.one('.share');
			// Y.later(5000, Y, function(){
			// 	shareNode.one('img').setStyle();
			// },true);
		},

		itemClickHandle: function(e){
			var instance = this,
				action = e.currentTarget.getAttribute('data-action');
			instance.fire('shareAction', {
				data: {
					action: action
				}
			});			
		}


	}, {
		ATTRS: {
		}

	});

Y.VrApp.ShareBar = MyShareBar;
