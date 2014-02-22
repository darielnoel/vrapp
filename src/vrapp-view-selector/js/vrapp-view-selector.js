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
			instance.publish('syncRangeSelection', {
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
			var instance = this,
				boundingBox = instance.get(ATTR_BOUNDINGBOX),
				selectorBodyNode = boundingBox.one('.selector-body');
			// 	selectorHandleNode,
			// 	keyCollection = instance.get('keyCollection');

			selectorBodyNode.delegate('click', instance.gesturemovestartHandle,'li', instance, {});
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
		gesturemovestartHandle: function(e){
			var instance = this,
				keyIndex = parseInt(e.target.getAttribute('data-key')),
				boundingBox = instance.get(ATTR_BOUNDINGBOX),
				selectorBodyNode = boundingBox.one('.selector-body');

			if (!e.target.hasClass('disabled')) {
				selectorBodyNode.one('.selected').removeClass('selected');
				instance.set('selectedItemIndex', keyIndex);
				e.target.addClass('selected');

				instance.fire('syncRangeSelection', {
					data: {
						keyIndex: keyIndex,
						type: instance.get('type')
					}
				});
			};

		},

		syncSelectableRange: function(keyIndex){
			var instance = this,
				type = instance.get('type'),
				boundingBox = instance.get(ATTR_BOUNDINGBOX),
				selectorBodyNode = boundingBox.one('.selector-body'),
				liNodeItemCollection = selectorBodyNode.all('li');

			if(type  === 'minThumb'){
				liNodeItemCollection.each(function(value,key){
					console.log(key);
					if(key < keyIndex){
						value.removeClass('disabled');
					} else {
						value.addClass('disabled');
					}
				});
			} else {
					var minRange = instance.get('minRange');
					liNodeItemCollection.each(function(value,key){
						console.log(key);
						if(key + minRange > keyIndex){
							value.removeClass('disabled');
						} else {
							value.addClass('disabled');
						}
					});
			}
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> df8ef3374d4140d56d2e8ffe40c558f45eb4de7f
=======

>>>>>>> df8ef3374d4140d56d2e8ffe40c558f45eb4de7f
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
				value: 'minThumb'
			}
		}

	});

Y.VrApp.Selector = MySelector;
