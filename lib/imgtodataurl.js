var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var log = console.log;

module.exports = imgDataUrl

function imgDataUrl(str,_path){
    
    var $ = cheerio.load(str),
        imgsrc = '';

    $('img').each(function(i, e) {
        imgsrc = $(e).attr('src');
        if(!/^(http:\/\/|https:\/\/)/.test(imgsrc)) {
          var relative_path = path.relative(_path, process.cwd() + imgsrc).replace(/\\/g,'/').replace(/\.\.$/g,'');
          real_path = path.resolve(relative_path);
          var image_data = fs.readFileSync(real_path);
           base64 = new Buffer(image_data).toString('base64');
           base64 = 'data:image/png;base64,' + base64;
           $(e).attr('src',base64);
        }
    });

    return $.html();
}
