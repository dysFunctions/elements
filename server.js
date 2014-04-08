var http = require('http');
var fs = require('fs');
var url = require('url');
var mime = require('mime');
var path = require('path');
var db = require('orchestrate')('insert key here');

http.createServer(function(req, res){
	var pathname = url.parse(req.url, true).pathname;

	if (pathname === '/api/data'){
		apiHandler(req, res);
	} else if (pathname === '/api/scores'){
		scoresData(req,res);
	} else if (pathname === '/api/scores/:id'){
		scoresData(req,res);
	} else {
			if (pathname === '/'){
				pathname +='index.html';
			}
			staticFileHandler(pathname, res);
		}

}).listen(8080);



function staticFileHandler(pathname, res){
	fs.readFile(__dirname + '/public' + pathname,{encoding: 'utf-8'}, function(err, data){
		if (err) return err;
		res.setHeader('Content-Type', mime.lookup(path.extname(pathname)));
		res.end(data);
	});
}

function apiHandler(req, res) {
	fs.readFile ('data/data.json', {encoding: 'utf8'}, function(err,data){
		if (err) return err;
		data = JSON.stringify(JSON.parse(data));
		res.setHeader('Content-Type', mime.lookup('json'));
		res.end(data);
	})
}

function scoresData(req, res){
		if(req.method === "GET"){
		db.get('topTen','scoresArray').then(function(result){
			res.setHeader('Content-Type', mime.lookup('json'));
		 console.log(result.body);
			res.end(JSON.stringify(result.body));
		}).fail(function (err){
			console.log(err);
		});
	} else if (req.method === "POST" || req.method === "PUT"){
		var body ='';
		req.on('data', function(chunk){
			body += chunk;
		});
		req.on('end', function(){
			db.put('topTen','scoresArray', JSON.parse(body))
			.then(function(results){
				console.log("Data successfully pushed to DB.");
			}).fail(function(err){ console.log("error");});
			res.end();
		});

	}

}
