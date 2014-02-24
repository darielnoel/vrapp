Y.namespace('VrApp');

var ATTR_BOUNDINGBOX = 'boundingBox',
	ATTR_CONTENTBOX = 'contentBox',

	MyItem = Y.Base.create('vrapp-view-item', Y.Widget, [Y.WidgetChild], {

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
			instance.publish('unlockApp', {
				emitFacade: true,
				broadcast: 1
			});
		},

		BOUNDING_TEMPLATE: '<div class="hidden opacity-hidden scroll-element"></div>',
		CONTENT_TEMPLATE: null,


		/**
		 * Description
		 * @method renderUI
		 * @return 
		 */
		renderUI: function () {
			var instance = this,
				contentBox = instance.get(ATTR_CONTENTBOX),
				imageHtmlSrc = '<img src="assets/images/',
				tittleHtml = instance.get('name'),
				html = '';

			if(instance.get('behavior') === 'blocked'){
				imageHtmlSrc = imageHtmlSrc + 'gift.png" alt="">';
				tittleHtml = instance.hiddeCharts(tittleHtml);
			} else {
				imageHtmlSrc = imageHtmlSrc + instance.get('picture') + '" alt="">';
			}

			tittleHtml = '<span>' + tittleHtml + '</span>';
			html = imageHtmlSrc + tittleHtml;

			contentBox.set('innerHTML', html);
		},

		/**
		 * Description
		 * @method bindUI
		 * @return 
		 */
		bindUI: function () {
			var instance = this,
				boundingBox = instance.get(ATTR_BOUNDINGBOX);

			// boundingBox.one('img').on('click', function (e) {
			// 	console.log('click en un link');
			// 	if(instance.get('behavior') === 'blocked'){
			// 		console.log('es un item blocked');
			// 		instance.fire('vrapp-view-item:unlockApp', {});
			// 	}
			// 	e.preventDefault();
			// });

			boundingBox.on('tap', function (e) {
				console.log('touchstart en un link');
				if(instance.get('behavior') === 'blocked'){
					console.log('es un item blocked');
					instance.fire('vrapp-view-item:unlockApp', {});
				}
				e.preventDefault();
			});
		},

		/**
		 * Description
		 * @method syncUI
		 * @return 
		 */
		syncUI: function () {
			var instance = this,
				boundingBox = instance.get(ATTR_BOUNDINGBOX);

		},

		showUI: function(callback,context){
			var instance = this,
				boundingBox = instance.get(ATTR_BOUNDINGBOX);

			boundingBox.removeClass('hidden');
			boundingBox.transition({
			    easing: 'ease-out',
			    duration: 0.3, // seconds
			    opacity: '1',
			}, function() {
				callback.call(context);
			});			
		},
		//En caso de que un artista este bloqueado muestra el nombre oculto
		hiddeCharts: function(charts){
			var instance = this,
				result = charts[0];

			for (var i = 1; i < charts.length; i++) {
				if(charts[i] === ' '){
					result+=' ';
				}else{
					result+='*';
				}
			};

			return result;

		}

	}, {
		ATTRS: {
			behavior: {
				value: ''
			},
			name: {
				value:''
			},
			picture:{
				value:''
			}

		}

	});

Y.VrApp.Item = MyItem;