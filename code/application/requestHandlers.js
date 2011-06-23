var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable"),
	sys = require("sys");

function start(response, postData) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData, request) {
  console.log("Request handler 'upload' was called.");

   var form = new formidable.IncomingForm();
	console.log("about to parse");
    form.parse(request, function(err, fields, files) {
      console.log("parsing done");
      response.writeHead(200, {'content-type': 'text/plain'});
      response.write('received upload:\n\n');
      response.end(sys.inspect({fields: fields, files: files}));
    });
}

function show(response, postData) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(err + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
