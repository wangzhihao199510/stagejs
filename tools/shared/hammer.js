/**
 * This is the structure hammer that is shared between tools to create folder structures
 * according to a js object as structure blueprint.
 *
 * @author Tim.Liu
 * @created 2013.09.25
 */

var buildify = require('buildify'),
_ = require('underscore'),
path = require('path'),
rimraf = require('rimraf'), //rm -rf;
mkdirp = require('mkdirp'),
ncp = require('ncp').ncp,
gzip = require('../shared/gzip');

ncp.limit = 16; //ncp concurrency limit

module.exports = {

	//create structure with pre-processed in memory files.
	createFolderStructure: function(name, options, done) {
		console.log('Creating Folders & Files...'.yellow);

		options = _.extend({
			structure: {}, //see config
			cachedFiles: {}
		}, options);

		var targets = [];
		var baseDir = path.join(options.distFolder, name);
		//clear base dir
		rimraf.sync(baseDir);
		//prepare the structure description map
		_.each(options.structure, function(content, key){
			targets.push({
				path: path.join(baseDir, key),
				content: content,
				key: key
			});
		});
		//use iteration - bfs to create/copy/dump the files/folders
		function iterator(done){
			if(targets.length > 0) {
				var currentTarget = targets.shift();
				if(_.isString(currentTarget.content)){
					//path string - copy
					var srcPath = path.join(options.clientBase, currentTarget.content);
					ncp(srcPath, currentTarget.path, function(error){
						if(!error) console.log(srcPath, '==>'.grey, currentTarget.path, '[OK]'.green);
						else console.log(srcPath, '==>'.grey, currentTarget.path, '[ERROR:'.red, error, ']'.red);
						iterator(done);
					});
				}else if(_.isBoolean(currentTarget.content)){
					//true/false - dump from cached files
					if(options.cachedFiles[currentTarget.key]){
						buildify().setContent(options.cachedFiles[currentTarget.key]).save(currentTarget.path);
						if(currentTarget.content) //if boolean says true, we gzip it.
							gzip.compress(currentTarget.path);
					}else {
						console.log(currentTarget.key, 'not found in cache'.red);
					}
					iterator(done);
				}else if(_.isObject(currentTarget.content)){
					//{} and {...} create folder and keep the bfs going
					mkdirp(currentTarget.path, function(error){
						if(!error) {
							console.log(currentTarget.path, '{+}'.grey, '[OK]'.green);
							_.each(currentTarget.content, function(subContent, subKey){
								targets.push({
									path: path.join(currentTarget.path, subKey),
									content: subContent,
									key: subKey
								});
							});						
						}
						else console.log(currentTarget.path, '{+}'.grey, '[ERROR:'.red, error,']'.red);
						iterator(done);
					});
				}
			}else 
				done();
		};
		iterator(done);
	}	

}