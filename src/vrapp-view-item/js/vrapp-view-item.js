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
			// instance.publish('openitem', {
			// 	emitFacade: true,
			// 	broadcast: 1
			// });
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
				imageHtmlSrc = imageHtmlSrc + 'blocked.png" alt="">';
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

			boundingBox.on('click', function (e) {
				//e.stopPropagation();
				console.log('click en un link');
				
				e.preventDefault();
			});

			boundingBox.on('touchstart', function (e) {
				console.log('click en un link');
				e.preventDefault();
				//e.stopPropagation();
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

			// boundingBox.one('.list-group-item-heading span').set('innerHTML', instance.get('tittle'));

			// boundingBox.one('span.categories').set('innerHTML', instance.get('categories'));

			// boundingBox.one('span.distance').set('innerHTML', instance.get('distance'));

			// instance.syncRating();

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