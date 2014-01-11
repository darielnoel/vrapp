Y.namespace('VrApp');

var ATTR_BOUNDINGBOX = 'boundingBox',

	MyTransShortCut = Y.Base.create('vrapp-util-transhortcut', Y.Base, [], {

		/**
		 * Description
		 * @method initializer
		 * @param {} config
		 * @return 
		 */
		initializer: function (config) {
			var instance = this;
		},

		/**
		 * Description
		 * @method runTransition
		 * @param {} target
		 * @param {} hideEffect
		 * @param {} callback
		 * @return 
		 */
		runTransition: function (target, hideEffect, callback) {
			var instance = this,
				leftPosition = '-100%';

			if(hideEffect === 'slideToRight'){
				leftPosition = '100%';
			}

			console.log(target);

			target.transition({
			    easing: 'ease-out',
			    duration: 0.3, // seconds
			    left: leftPosition
			}, function() {
			    target.setStyle('display', 'none');
			    callback();
			});
		}

	}, {
		ATTRS: {

		}

	});

Y.VrApp.TransShortCut = MyTransShortCut;