var fs      = require("fs");
var path    = require('path')
var marked  = require('marked');
var imgdata = require('./imgtodataurl');
var log     = console.log;

var template = ''

function build(commander,changeFile){

    var root_dir = process.cwd() + '/';
    var html = '';
    var markedstr; 
    var _path;
    var md_file = fs.readFileSync(root_dir + 'md/writing.md', 'utf8');
    log(md_file);
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false,
        highlight: function (code, lang, callback) {
            return require('highlight.js').highlightAuto(code).value;
        }
    });
    markedstr = marked(md_file);

    markedstr  = imgdata(markedstr,root_dir);

    var header = '<!DOCTYPE html>'+
        '<html lang="zh-CN">'+
        '<head>'+
        '<title>Marked Demo</title>'+
        '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'+
        // '<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.2/css/bootstrap.min.css">'+
        '</head><body>';
    // var footer = '<script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>'+
    //     '<script src="http://cdn.bootcss.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>'+
     var footer = '</body></html>';

    html = header + markedstr + footer;
    // html = markedstr;
    var out_dir = root_dir + '/out/';
    fs.writeFileSync(out_dir + 'index.html', html, 'utf-8');
}


module.exports = build;
