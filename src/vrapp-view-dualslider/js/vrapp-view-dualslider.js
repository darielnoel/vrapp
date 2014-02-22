Y.namespace('VrApp');

//TODO: Optimizar esta clase string, logicas repetidas, etc

var MyDualSlider = Y.Base.create('vrapp-view-dualslider', Y.Base, [], {

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
			instance.publish('valueChange', {
				emitFacade: true,
				broadcast: 1
			});

			instance.publish('selectHandle', {
				emitFacade: true,
				broadcast: 1
			});
		},

		/**
		 * La misma logica del render de los widgets de YUI
		 * @method render
		 * @return 
		 */
		render: function(){
			var instance = this;
			instance.renderUI();
			instance.bindUI();
			instance.syncUI();
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
				minThumb = instance.get('minThumb'),
				maxThumb = instance.get('maxThumb'),
				selectorHandleNode,
				keyCollection = instance.get('keyCollection');


			//TODO: Debe ser optimizado hay codigo repetido aqui
			selectorHandleNode = minThumb.node.one('.key-selector-arm');
			selectorHandleNode.setAttribute('data-key', keyCollection[minThumb.value].pitchName);
			selectorHandleNode.on('gesturemovestart', instance.gesturemovestartHandle,{},instance,'minThumb');

			selectorHandleNode = maxThumb.node.one('.key-selector-arm');
			selectorHandleNode.setAttribute('data-key', keyCollection[maxThumb.value].pitchName);
			selectorHandleNode.on('gesturemovestart', instance.gesturemovestartHandle,{},instance, 'maxThumb');


		},

		/**
		 * Description
		 * @method syncUI
		 * @return 
		 */
		syncUI: function () {
		},

		/**
		 * Sincroniza la pocision del thumb
		 * @method syncThumbByValue
		 * @param {} thumbKey
		 * @param {} value
		 * @return 
		 */
		syncThumbByValue: function(thumbKey, value){
			var instance = this,
				key = instance.get('keyCollection')[value],
				thumb = instance.get(thumbKey),
				thumbValue = thumb.value;

			if(thumbValue === value){
				//No se hace nada si son iguales
			} else {
				//Desmarco todas las teclas con una animacion suave
				instance.selectingKeysBehavior([0,41], 'deselect');

				//Quito el thumb de su pocision actual
				//Pongo el thumb en la nueva posicion
				instance.syncThumbNode(thumb, key);

				thumb.value = value;

				instance.set(thumbKey,thumb);

				//marco todas las teclas con una animacion suave 
				instance.selectingKeysBehavior([instance.get('minThumb').value,instance.get('maxThumb').value], 'select');

				//Se dispara un evento de que el valor ha cambiado
				//pitchName
				instance.fire('vrapp-view-dualslider:valueChange', {
					data: value
				});
			}


		},

		/**
		 * Sincroniza el nodo del thumb
		 * @method syncThumbNode
		 * @param {} thumb
		 * @param {} key
		 * @return 
		 */
		syncThumbNode: function(thumb, key){
			var instance = this,
				thumbNode = thumb.node,
				clone,
				newThumbNodeHTML,
				trackNode = instance.get('track').node,
				keyNode,
				actualKeyId = instance.get('keyCollection')[thumb.value],
				actualKeyBehavior,
				selectorHandleNode;

			//Oculto el nodo para ganar tiempo
			thumbNode.hide(true);

			//Quito el thumb de su pocision actual
			thumbNode.purge();
			thumbNode.remove();

			//Restauro la tecla como estaba
			actualKeyBehavior = instance.get('blackBehaviorRenderCollection')[actualKeyId.pitchName[0]];

			trackNode.one('.' + actualKeyId.pitchName).set('innerHTML', instance.get('thumbNodeRenderBehaviorHtml')[actualKeyBehavior]);

			//create Selector Node
			newThumbNodeHTML = instance.createHTMLThumbNode(key,thumb);

			//Pongo el thumb en la nueva posicion
			keyNode = trackNode.one('.' + key.pitchName);
			keyNode.set('innerHTML', newThumbNodeHTML);

			//Pongo oyentes a los handle
			selectorHandleNode = keyNode.one('.key-selector-arm');

			selectorHandleNode.setAttribute('data-key', key.pitchName);

			selectorHandleNode.purge();
			selectorHandleNode.on('gesturemovestart', instance.gesturemovestartHandle, {}, instance, thumb.type);

			keyNode.one('.key-selector-arm').transition({
			    easing: 'ease-out',
			    duration: 0.3, // seconds
			    opacity: '1',
			}, function() {
				console.log('termino la animacion');
			});
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
		},

		/**
		 * Se crea el nodo del Thumb
		 * @method createHTMLThumbNode
		 * @param {} key
		 * @param {} thumb
		 * @return nodeHTML
		 */
		createHTMLThumbNode: function(key,thumb){
			var instance = this,
				thumbNodeRenderBehavior = instance.get('blackBehaviorRenderCollection')[key.pitchName[0]],
				thumbType = thumb.type,
				thumbNode,
				nodeHTML,
				typeSelectorClass = 'key-selector-max',
				thumbNodeRenderBehaviorHtml = instance.get('thumbNodeRenderBehaviorHtml')[thumbNodeRenderBehavior],
				selectorHandleCaption = key.pitchName,
				selectorHandleTittle = 'Higher';

			if(thumb.type === 'minThumb'){
				typeSelectorClass = 'key-selector-min';
				selectorHandleTittle = 'Lower&nbsp;';
			}

			nodeHTML =  '<div class="key-selector ' + typeSelectorClass + '">' + 
							'<div class="key-selector-keycover">'+
								thumbNodeRenderBehaviorHtml +
							'</div>' +
							'<div class="key-selector-arm" style="opacity:0">' +
								'<div class="key-selector-handle-container">'+
									'<div class="selector-handle">'+
										'<div class="selector-handle-caption">' + selectorHandleCaption + '</div>' +
									'</div>' + 
									'<div class="selector-handle-tittle">' + selectorHandleTittle + '</div>' +
								'</div>' +
							'</div>' +
						'</div>';

			return nodeHTML;
			//veo que tipo de nodo tengo que crear
		},

		/**
		 * Se marcan como seleccionadas las teclas que coincidan con un rango
		 * @method selectingKeysBehavior
		 * @param {} range
		 * @param {} behavior
		 * @return 
		 */
		selectingKeysBehavior: function(range, behavior){
			var instance = this,
				track = instance.get('track').node,
				keyCollection = instance.get('keyCollection'),
				minRange = range[0],
				maxRange = range[1],
				i = minRange,
				keyNode,
				color;

			for (i; i <= maxRange; i++) {
				keyNode = track.one('.'+ keyCollection[i].pitchName);
				if(keyNode){
					if(behavior === 'deselect'){
						color = 'white';
					}else {
						color = '#edeff1';
					}
					instance.selectingKeyAnimationBehavior(keyNode, color);
				}								
			};
		},

		/**
		 * La animacion que se le aplica a las teclas cuando son seleccionadas o desel
		 * @method selectingKeyAnimationBehavior
		 * @param {} node
		 * @param {} color
		 * @return 
		 */
		selectingKeyAnimationBehavior: function(node, color){
			var instance = this;

			node.transition({
			    easing: 'ease-out',
			    duration: 0.3, // seconds
			    backgroundColor: color,
			}, function() {
				console.log('termino la animacion');
			});
		},

		getMaxRange: function(){
			var instance = this;
			return instance.get('minThumb').value;
		},

		getMinRange: function(){
			var instance = this;
			return instance.get('maxThumb').value;
		},



	}, {
		ATTRS: {
			track: {
				value: {
					node: {}
				}
			},
			minThumb: {
				value: {
					value:30,
					type:'minThumb',
					node:{}
				}
			},
			maxThumb: {
				value: {
					value:100,
					type:'maxThumb',
					node:{}
				}
			},
			keyCollection:{
				value:[]
			},
			//existen 3 comportamientos basicos de visualizacion
			blackBehaviorRenderCollection:{
				value:{}
			},
			thumbNodeRenderBehaviorHtml:{
				value:{
					left: '<div class="black pull-left"></div>',
					right: '<div class="black pull-right"></div>',
					complex: '<div class="black pull-left"></div><div class="black pull-right"></div>'
				}
			}
		}

	});

Y.VrApp.DualSlider = MyDualSlider;
