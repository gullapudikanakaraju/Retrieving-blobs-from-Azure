var express = require('express');
var azure = require('azure-storage');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get('/dat',function(request, response){
  //console.log("request came");
   var blobSvc = azure.createBlobService('DefaultEndpointsProtocol=https;AccountName=sanketblob;AccountKey=5Vdyu/qQPpawaQfPzLCzbM0wgHKUz6FPpQ1kWaVzN24RBDHgjQt5r2nxQwVjpI1xjQDnjrbiSAYgOCLMHN/b9g==;EndpointSuffix=core.windows.net');
   var id = request.query.id;
  //console.log(id);
   blobSvc.listBlobsSegmented(id, null, function(error, result, respons){
  if(!error){
      var arr=[];
      // result.entries contains the entries
      // If not all blobs were returned, result.continuationToken has the continuation token.
      for(x in result.entries)
      {
      	//console.log(result.entries[x]);
      	//console.log(result.entries[x].name);
        arr.push(result.entries[x].name);
      }
      //console.log(JSON.stringify({data:arr, success: true}));
      
     response.header('Content-type','application/json');
     response.header('Charset','utf8');
     response.send(request.query.callback + '('+ JSON.stringify({data:arr, success: true}) + ');');
  }
  else
   {
   	console.log("error occurred "+error);
    response.send(JSON.stringify({success: false}));
   }
});
});

app.get('/',function(request,response){
  response.sendFile(path.join(__dirname,'first.html'));
});
app.listen(1235);
console.log("the server is listening !");