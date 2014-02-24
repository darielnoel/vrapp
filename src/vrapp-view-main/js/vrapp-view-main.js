Y.namespace('VrApp');

var ATTR_BOUNDINGBOX = 'boundingBox',

	MyMainView = Y.Base.create('vrapp-view-main', Y.Widget, [Y.VrApp.ViewView], {

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

			instance.publish('previousview', {
				emitFacade: true,
				broadcast: 1
			});
		},


		/**
		 * Description
		 * @method bindUI
		 * @return 
		 */
		bindUI: function () {
			var instance = this,
				boundingBox = instance.get(ATTR_BOUNDINGBOX);

			// boundingBox.one('#finish').on('click', function (e) {
			// 	instance.fire('previousview', {});
			// 	e.stopPropagation();
			// });
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
				value:0
			}
		}

	});

Y.VrApp.MainView = MyMainView;
