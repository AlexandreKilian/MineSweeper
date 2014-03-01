require.config({
	// alias libraries paths
	paths : {
		'domReady' : '/vendor/requirejs-domready/domReady',
		'angular' : '/vendor/angular/angular'
	},

	// angular does not support AMD out of the box, put it in a shim
	shim : {
		'angular' : {
			exports : 'angular'
		}
	},

	// kick start application
	deps : ['./bootstrap']
}); 