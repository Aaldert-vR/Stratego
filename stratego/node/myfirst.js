//using node
let http = require('http');

rpcMethods={}



function JSONrpc(JSONInput){
  let jsonObject=JSON.parse(JSONInput);
  let method=jsonObject.method;
  let params=jsonObject.params;
  let retVal={response: rpcMethods[method](params)};
  retVal.id=jsonObject.id;
  return retVal;
}


const server=http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html',
                      'Access-Control-Allow-Origin': '*',
  });
  console.log(global['abc']);
  res.end(req);
  var r=JSONrpc('JSON={"JSONrpc": "2.0", "method": "f1", "params": {"token": "123456", "a": "b"}, "id": "1"}');
  console.log(r);
  res.end(JSON.stringify(r));
}).listen(8080);

//methods
rpcMethods.f1 =function(params){
  console.log("hoi");
  return "Hoi client "+params.token+ " a="+params.a;
}
