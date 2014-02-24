var ROUTES_CONFIG = {
	
    "openSelectorRangeAction": {
        path: '',
        event_prefix: 'vrapp-view-dualslider:selectHandle',
        controller: 'AppController',
        action: 'openSelectorRangeAction'
    },

    "syncRangeSelectionAction": {
        path: '',
        event_prefix: 'vrapp-view-selector:syncRangeSelection',
        controller: 'AppController',
        action: 'syncRangeSelectionAction'
    },

    "unlockAppAction": {
        path: '',
        event_prefix: 'vrapp-view-item:unlockApp',
        controller: 'AppController',
        action: 'unlockAppAction'
    },
    "shareAction": {
        path: '',
        event_prefix: 'vrapp-view-sharebar:shareAction',
        controller: 'AppController',
        action: 'shareAction'
    },
    "closeHelpAction": {
        path: '',
        event_prefix: 'vrapp-view-help:closeHelpAction',
        controller: 'AppController',
        action: 'closeHelpAction'
    }
    

    
};

