Y.namespace('VrApp');

var ATTR_BOUNDINGBOX = 'boundingBox',

	MyControllerView = Y.Base.create('vrapp-controller-view', Y.Base, [], {

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
		 * Agrega un vista a las existentes
		 * @method addView
		 * @param {} view
		 * @return 
		 */
		addView: function (view) {
			var instance = this;
			instance.get('views').push(view);
		},

		/**
		 * Retorna la vista activa
		 * @method activeView
		 * @return activeView
		 */
		activeView: function () {
			var instance = this,
				views = instance.get('views'),
				activeViewIndex = instance.get('activeViewIndex'),
				activeView;
			if( views.length > 0 && activeViewIndex >= 0 &&  activeViewIndex < views.length){
				activeView = views[activeViewIndex];
			}

			return activeView;
		},

		/**
		 * Cambia la vista activa al index
		 * @method setActiveView
		 * @param {} index
		 * @return 
		 */
		setActiveView: function (index) {
			var instance = this;
			if(instance.get('views')[index]){
				instance.set('activeViewIndex', index);
			}
		},

		/**
		 * Cambia a la vista siguiente
		 * @method changeToNextView
		 * @param {} config
		 * @return 
		 */
		changeToNextView: function (config) {
			var instance = this,
				nextViewIndex = instance.activeViewSiblingIndex('next');

			if(nextViewIndex) {
				instance.activeView().hideUI(function(){
					instance.setActiveView(nextViewIndex);
					instance.activeView().showUI();
				});


			} else {
				//no se hace nada
			}
		},

		/**
		 * Cambia a la vista anterior
		 * @method changeToPreviousView
		 * @param {} config
		 * @return 
		 */
		changeToPreviousView: function (config) {
			var instance = this,
				previousViewIndex = instance.activeViewSiblingIndex('previous');

			if(previousViewIndex >= 0) {
				instance.activeView().hideUI(function(){
					instance.setActiveView(previousViewIndex);
					instance.activeView().showUI();					
				},'slideToRight');


			} else {
				//no se hace nada
			}
		},

		/**
		 * Devuelve una vista hermana de la activa
		 * @method activeViewSiblingIndex
		 * @param {} siblingPlace   'previous' | 'next'
		 * @return siblingIndex
		 */
		activeViewSiblingIndex: function (siblingPlace) {
			var instance = this,
				activeViewIndex = instance.get('activeViewIndex'),
				siblingIndex = -1;   //Don't Know sibling index
			if(activeViewIndex != -1){
				if(siblingPlace === 'next'){
					siblingIndex = activeViewIndex + 1;
				} else {
					siblingIndex = activeViewIndex - 1;
				}

				if(siblingIndex >= instance.get('views').length){
					siblingIndex = -1;
				}
			}

			return siblingIndex;
		},

	}, {
		ATTRS: {
			views: {
				value:[]
			},
			activeViewIndex: {
				value:-1
			}
		}

	});

Y.VrApp.ControllerView = MyControllerView;