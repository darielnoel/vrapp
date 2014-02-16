Y.namespace('VrApp');

var ATTR_CONTENTBOX = 'contentBox',

	MyContainer = Y.Base.create('vrapp-view-container', Y.Widget, [Y.WidgetParent], {

		/**
		 * Description
		 * @method initializer
		 * @param {} config
		 * @return 
		 */
		initializer: function () {
		},
		BOUNDING_TEMPLATE: '<div id="scroll"></div>',
		CONTENT_TEMPLATE: '<ul>\
							</ul>',

		/**
		 * Description
		 * @method renderUI
		 * @return 
		 */
		renderUI: function () {
			var instance = this,
				contentBox = instance.get(ATTR_CONTENTBOX);
		},

		/**
		 * Description
		 * @method syncUI
		 * @return 
		 */
		syncUI: function () {
			var instance = this;
			instance.renderChilds(instance.get('childModelCollection'));
		},

		/**
		 * Description
		 * @method renderChilds
		 * @param {} data
		 * @return 
		 */
		renderChilds: function (childModelCollection) {
			var instance = this,
				contentBox = instance.get(ATTR_CONTENTBOX),
				itemsContainer = contentBox,
				childWidget,
				liNode = {},
				size = childModelCollection.length,
				i = 0;

			liNode = itemsContainer.appendChild('<li></li>');
			Y.one('.loader').addClass('hidden');
				for (i; i < size; i++) {
					if(i !== 0 && i%6 === 0){
						console.log(i);
						liNode = itemsContainer.appendChild('<li></li>');
					}
					childWidget = new Y.VrApp.Item(childModelCollection[i]).render(liNode);
					instance.get('itemCollection').push(childWidget);
					if(i == 5 || (i == size-1 && i < 6)){
						childWidget.after('render',instance.showUI, instance);
					} else if (i >=5 ){
						childWidget.get('boundingBox').setStyle('opacity',1);
						childWidget.get('boundingBox').removeClass('hidden');
					}
					
				};				

			//I d'like remove html elements that can be used after
			//itemsContainer.one('.loader').addClass('hidden');


		},

		showUI: function(e){
			console.log('After render');
			console.log(e);
			//Y.AsyncQueue.defaults.timeout = -1;
			var instance = this,
				itemCollection = instance.get('itemCollection'),
				q = new Y.AsyncQueue(),
				size = itemCollection.length;

			for (var i = 0; i < itemCollection.length; i++) {
				itemCollection[i].showUI(function(){
				});
			}

		},

		syncData: function(data){

		},

		/**
		 * Description
		 * @method filterItems
		 * @param {} query
		 * @return 
		 */
		filterItems: function (query) {
			var instance = this,
				size = instance.size(),
				i = 0;
			for (i; i < size; i++) {
				instance.item(i).applyFilter(query);
			}

		}

	}, {
		ATTRS: {
			childModelCollection:{
				value: []
			},
			itemCollection: {
				value:[]
			}
		}

	});

Y.VrApp.Container = MyContainer;