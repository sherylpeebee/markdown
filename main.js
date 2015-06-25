var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    marked = require('marked');
var server = http.createServer(function(req, res) {
  if(req.url.match("favicon")){
    res.end("");
    return;
  }
  if (req.url.match("/markdown")) {
    // setTimeout(function(){
      var path = url.parse(req.url).pathname;
      var text = path.match(/\/markdown\/(.*)/i)[1];
      var decodedText = decodeURIComponent(text);
    // }, 5000);
    res.write(marked(decodedText));
    res.end("");
  }
  else {
    fs.readFile("index.html", 'utf8', function(err, data){
      // console.log(data);
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end(data);
    });
  }

}).listen(process.env.PORT || 8000);
