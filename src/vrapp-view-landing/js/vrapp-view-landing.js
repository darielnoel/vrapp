Y.namespace('VrApp');

var ATTR_BOUNDINGBOX = 'boundingBox',

	MyLandingView = Y.Base.create('vrapp-view-landing', Y.Widget, [Y.VrApp.ViewView], {

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

		BOUNDING_TEMPLATE: '<div class="view-active"></div>',

		/**
		 * Description
		 * @method _publishEvents
		 * @return 
		 */
		_publishEvents: function () {
			var instance = this;
			instance.publish('nextview', {
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

		},

		/**
		 * Description
		 * @method bindUI
		 * @return 
		 */
		bindUI: function () {
			var instance = this,
				boundingBox = instance.get('contentBox');

			boundingBox.one('#find-out').on('click', function (e) {
				instance.fire('nextview', {});
				e.stopPropagation();
			});
		},

		/**
		 * Description
		 * @method syncUI
		 * @return 
		 */
		syncUI: function () {

		}

	}, {
		ATTRS: {
			active:{
				value:1
			}
		}

	});

Y.VrApp.LandingView = MyLandingView;