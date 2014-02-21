Y.namespace('VrApp');

var ATTR_BOUNDINGBOX = 'boundingBox',
	ATTR_CONTENTBOX = 'contentBox',

	MySelector = Y.Base.create('vrapp-view-selector', Y.Widget, [], {

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
			instance.publish('selectHandle', {
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
				boundingBox = instance.get(ATTR_BOUNDINGBOX),
				selectorBodyNode = boundingBox.one('.selector-body'),
				itemModelCollection  = instance.get('itemModelCollection'),
				selectedItem  = instance.get('selectedItemIndex'),
				i = instance.get('minRange'),
				size = instance.get('maxRange'),
				innerHTMLContent = '',
				ulTempHtml = '<ul>',
				selectedClass = 'class="selected"';


			for (i; i <= size; i++) {
				if(i === selectedItem){
					selectedClass = 'class="selected" ';
				}else{
					selectedClass = '';
				}
				ulTempHtml += '<li data-key="' + i + '" ' + selectedClass + '>' + itemModelCollection[i].pitchName + '</li>';
				if(i !== 0 && (i+1)%7===0){
					ulTempHtml  += '</ul><ul>'; 
				}
			};

			selectorBodyNode.set('innerHTML',ulTempHtml);


		},

		/**
		 * Description
		 * @method bindUI
		 * @return 
		 */
		bindUI: function () {
			// var instance = this,
			// 	minThumb = instance.get('minThumb'),
			// 	maxThumb = instance.get('maxThumb'),
			// 	selectorHandleNode,
			// 	keyCollection = instance.get('keyCollection');


			// //TODO: Debe ser optimizado hay codigo repetido aqui
			// selectorHandleNode = minThumb.node.one('.key-selector-arm');
			// selectorHandleNode.setAttribute('data-key', keyCollection[minThumb.value].pitchName);
			// selectorHandleNode.on('gesturemovestart', instance.gesturemovestartHandle,{},instance,'minThumb');

			// selectorHandleNode = maxThumb.node.one('.key-selector-arm');
			// selectorHandleNode.setAttribute('data-key', keyCollection[maxThumb.value].pitchName);
			// selectorHandleNode.on('gesturemovestart', instance.gesturemovestartHandle,{},instance, 'maxThumb');


		},

		/**
		 * Description
		 * @method syncUI
		 * @return 
		 */
		syncUI: function () {
		},

		/**
		 * Cuando se presiona algun handle
		 * @method gesturemovestartHandle
		 * @param {} e
		 * @return 
		 */
		gesturemovestartHandle: function(e, extra){
			var instance = this;
			console.log('gesturemovestartHandle');
			console.log(e);
			console.log(extra);
			instance.fire('selectHandle', {
				data: {
					event: e,
					key: e.currentTarget.getAttribute('data-key') ,
					type: extra
				}
			});
		}



	}, {
		ATTRS: {
			itemModelCollection: {
				value: []
			},
			minRange: {
				value:0
			},
			maxRange: {
				value:21
			},
			selectedItemIndex: {
				value:13
			},
			type: {
				value: 'min'
			}
		}

	});

Y.VrApp.Selector = MySelector;
