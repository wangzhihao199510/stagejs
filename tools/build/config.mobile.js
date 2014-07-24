/**
 * This is the Application Build Config.
 * The build tool simply loads in an index.html file (or any .html file) process it and combine all the js.
 * After processing, 'all.js', 'all.min.js' and 'index.html' will be in buffer, 
 * output them to desired location together with a wanted folder structure using this config file.
 * 
 * Config/Structure
 * ----------------
 * {} - create folder
 * 'string' - copy file or folder
 * 'all.js', 'all.min.js' and 'index.html' are predefined file placeholder, use 'true'/'false' to choose whether to gzip them.
 *
 * Note: you can change all.js into your-name.js by using the js:{ name : 'you-name' } config block, this will also change the .min.js version.
 * 
 * @author Tim.Liu
 * @created 2013.09.25
 * @updated 2014.03.04 (minimum output)
 */

module.exports = {
	src: {
		root: '../../implementation', //path relative to this config.js
		index: 'index.html', //path relative to root
	},
	js: {
		name: 'app'
	},
	structure : { //path are relative to the distFolder and src.root above

		www: {
			js: {
				'app.js': false, //for debugging purposes
				'app.min.js': false, //'app' is the name you set using js:{name: 'app'} above.
			},
			static: {
				template: {
					'all.json': ''
				},
				resource: {}
			},
			themes: {
				'default': {
					css: {},
					fonts: ['themes/default/fonts', 'bower_components/ratchet/dist/fonts'],
					img: {},
					icons: {},
					less: 'themes/mobile/less'
				}
			},
			'bower.json': 'starter-kit.bower.json'

		},
		devtools: {
			themeprep: '../tools/themeprep',
			devserver: '../tools/devserver',
			shared: '../tools/shared',
			'package.json': '../tools/package.json'
		}


	}
};