/*jslint devel: true,  undef: true, newcap: true, strict: true, maxerr: 50 */
/*global YUI*/

/**
 * The xstorm-util-router module allow to route events, and urls state and execute
 * some actions 
 * @module xstorm-util-router
 * @beta
 */

/**
 * The xstorm-util-router class allow to route events, and urls state and execute
 * some actions
 * @class xstorm-util-router
 * @extends Router
 * @param config {Object} Configuration object
 * @uses Router
 * @constructor
 * @author darielnoel 
 */

Y.namespace('VrApp');

"use strict";

// shorthands

Router =  Y.Base.create("vrapp-util-router", Y.Router, [], {
	
	initializer : function(config) {
		Y.log('Hello I am a Router object');
		this.bindEvents();
	},

    bindEvents: function(){
        var instance = this;
    },

	/**
   	 * @method createRoutes
     * @description Conected routes and event with Controllers actions
     * @param routes
     * @return 
    */		
	createRoutes: function() {
		var instance = this,
			Controller = Y.VrApp.App.Controller,
			path,
			routes = instance.get('routes_own'),
			controller_action,
			code_actions = instance.get('code_actions');

		Y.each(routes, function(item){

			try{
				controller_action = Controller[item.controller][item.action];
			}catch(err){
				Y.log('La ruta no existe');
				//aqui hay que enviar un codigo de error en router
			}
			
			if (controller_action) {
				if(item.event_prefix != ''){
					if(item.path != ''){
						instance.route(item.path, controller_action);
						instance.on(item.event_prefix, function(e){
							//hay que ver como convertir los parametros del evento en una url
							//o sea lo que viene en un path
							path = instance.createPath(e, item.path);
							instance.save(path);
						});	
					} else {
						instance.on(item.event_prefix, controller_action, Controller[item.controller]);	
					}
					 
				} else if(item.path != ''){
						instance.route(item.path, controller_action, Controller[item.controller]);	
				}
			}
			
		});
	},

	/**
   	 * @method createPath
     * @description Convert events in paths routes
     * @param events
     * @param routes
     * @return 
    */	
	createPath: function (e, path) {
		var params = e.params,
			path_format = path.split(':'),
			size = path_format.length,
			param,
			result_path = '',
			i = 1;

		if(size > 1) {
			result_path = path_format[0];
			for ( i; i < size; i++) {
				param = path_format[i];

				param = param.split('/');
				param = param[0];

				if(params[param]){
					result_path += params[param] + '/' ;
				} else {
					result_path += 'empty/';
				}
			};
			return result_path;
		} else {
			return path;			
		}

	}
},{
	ATTRS: {

	    html5: {
	      value: false
	    },

	    routes_own: {
	    	value: {}
	    },

	    code_actions: {
			value: {}	    	
	    }

	}

});

Y.VrApp.Router = Router;