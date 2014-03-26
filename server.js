var http = require('http');
var fs = require('fs');
var url = require('url');
var mime = require('mime');
var path = require('path');

http.createServer(function(req, res){
	var pathname = url.parse(req.url, true).pathname;
	if (pathname === '/'){
		pathname +='index.html';
	}
	fs.readFile(__dirname + '/public' + pathname,{encoding: 'utf-8'}, function(err, data){
		if (err) return err;
		res.setHeader('Content-Type', mime.lookup(path.extname(pathname)));
    	res.end(data);
	});
}).listen(8080);