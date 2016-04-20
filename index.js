var build   = require('./lib/build');
var watch   = require('./lib/watch');
var path    = require('path');
var commander = require('commander');

module.exports = function(commander){

    if(commander.build){
        return build(commander);
    }
    if(commander.watch){
        return watch(commander,build);
    }
}
