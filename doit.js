var Q = require("q"),
	rmdir = Q.denodeify(require('rimraf')),
	path = require('path');

function eventualAdd(a, b) {
    console.log('INSIDE: eventualAdd');
    return Q.spread([a, b], function (a, b) {
        throw new Error('Failing on purpose.');
        return a + b;
    });
}

module.exports = function(thing1, thing2){
	return Q.all([eventualAdd(3,4), eventualAdd(1,2)]).catch(function(err){
    console.log('INSIDE: Q.all');
		return Q.Promise(function(resolve,reject){
			Q.fcall(function(){
        var rmpath = path.join(__dirname,"withsubdirs");
        console.log('GOING TO REMOVE', rmpath);
				return rmdir(rmpath).then(function(){
					console.log('SUCCESS removing the dir.');
				}, function(rmerr) {
					console.log('FAILED to remove dir with subdirs ->', rmerr);
				}).then(function(){
				});
			}).then(function(){
				console.log('REJECT err ->', err);
				reject(err);
			}, function(err2){
				console.log('REJECT err2');
				reject({ originalError: err, cleanupError: err2 });
			});
		});
	});
};
