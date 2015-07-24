var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    host = '127.0.0.1',
    port = '9000';

var mimes = {
    ".html" : "text/html",
    ".css" : "text/css",
    ".js" : "text/javascript",
    ".gif" : "image/gif",
    ".jpg" : "image/jpeg",
    ".png" : "image/png"
};

var server  = http.createServer(function(req, res) {
    var filepath = (req.url === '/') ? ('./index.html') : ('.' + req.url);
    var contentType = mimes[path.extname(filepath)];
    // Checking to see if the file exists
    fs.exists(filepath, function(f_exists) {
        if (f_exists) {
            //read and sever
            fs.readFile(filepath, function(error, content) {
                if(error) {
                    res.writeHead(500);
                    res.end();
                } else {
                    res.writeHead(200, {"Content-Type": contentType});
                    res.end(content, "utf-8");
                }
            })
        } else {
            res.writeHead(404);
            res.end("Sorry, error!");
        }
    })
}).listen(port, host, function() {
    console.log("server is runnig");
});