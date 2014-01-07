YUI_config = {
    useBrowserConsole: true,
    filter: 'min',
    logExclude: {
    },
    debug: true,
    groups:{ 
        xstorm: {
                
        	filter:'debug',
            combine: false,
            ext: false,
            base: 'build/',
            patterns: {
                'vrapp-': {}
            },
            logInclude: {
            }
        }
        
    },
    lang: 'es-VE',
};