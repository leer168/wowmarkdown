var fs = require('fs');
var chokidar = require('chokidar');
var path    = require('path');
var log = console.log;

function watch(commander,build){
    var file = fs.readdirSync(process.cwd());

    var watcher = chokidar.watch(process.cwd()+'/md', {
        // ignored: /[^\.md]$/, //正则过滤哪些被监控
        persistent: true,
        ignoreInitial:true// 初始化不执行事件
    });

    var _root = path.normalize(process.cwd()+'/md')
    
    watcher.on('change', function(file) {
            build(commander,file);
            log(file + ' has been changed!');
            
        })
        .on('error', function(error) { log('Error happened', error); })
        .on('ready', function() {
            build(commander);
            log('Initial scan complete. Ready for changes.\n'); })
        .on('raw', function(event, file, details) { 
        });
}
module.exports = watch;