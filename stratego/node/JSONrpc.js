//Dit is een JSON-RPC bibliotheek.

//importeer bibliotheken
const http = require('http');
const querystring=require('querystring');

//Variabelen aan het begin
let PORT = 8080;
let allowCors="*";
let server;
let serverStarted=false;

//Het object waar alle methodes in komen
rpcMethods={}

//Dit parset de JSON data
async function JSONrpc(JSONInput){
  //maak een object van de JSON
  let jsonObject;
  try{
    jsonObject=await JSON.parse(JSONInput);
    console.log(jsonObject);
  }
  catch(err){
    console.log("error");
    return new Promise(resolve => resolve({result: "", jsonrpc: "2.0", error: {code: -32700, error: "Parse error"}, id: null}));
  }
  //method en params
  let method=jsonObject.method;
  let params=jsonObject.params;
  if (method==undefined || params==undefined || jsonObject.jsonrpc!="2.0"){
    return new Promise(resolve => resolve({methodExists: "parseError", id: jsonObject.id}));
  }
  //Het kan zijn dat de methode niet bestaat
  if (!(method in rpcMethods)){
    return new Promise(resolve => resolve({methodExists: false, id: jsonObject.id}));
  }
  //Anders wordt de methode uitgevoerd en het resultaat teruggestuurd.
  let retVal={methodExists: true, result: await rpcMethods[method](params)};
  retVal.id=jsonObject.id;
  if (retVal.result=="error: invalid params"){
    retVal.error={code: -32602, message: "Invalid Params"};
    delete retVal.result;
  }
  return new Promise(resolve => resolve(retVal));
}

function start(port=PORT){
    //Als de functie start met een andere poort dan de standaard poort, wordt de standaardpoort automatisch geupdatet.
    PORT=port;
    if (server!=undefined){
        if (server.listening){
            server.close();
        }
    }
    //De server
    server = http.createServer((req, res) => {
        //drie headers waarvan in elk geval de bovenste van belang is om dit aan te kunnen roepen vanuit een ander programma.
        id=1;
        try{
            res.setHeader("Access-Control-Allow-Origin", allowCors);
            res.setHeader('Access-Control-Allow-Methods', 'POST');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            //Als er post data gestuurd wordt (hoewel er alleen post data binnen kan komen vanwege de header 'Access-Control-Allow-Methods')
            if (req.method == "POST") {
                //req.on ('data') gaat net zo lang door totdat alle data die meegestuurd is gelezen is.
                let data = '';
                req.on('data', chunk => {
                    //De data wordt gelezen per chunk. Die chunk komt bij de gelezen data op.
                    data += chunk.toString();
                });
                //Daarna wordt dit uitgevoerd.
                req.on('end', async () => {
                    console.log(data);
                    //De data komt binnen in de vorm JSON={"jsonrpc": 2.0, "method": enz.
                    let q;
                    try{
                        q = querystring.parse(data);
                    }
                    catch(err){
                        res.end(JSON.stringify({jsonrpc: "2.0", error: {code: "-32600", message: "Invalid Request"}, id: null}));
                        return;
                    }
                    //De JSON wordt gevoerd aan de goede methode door de functie jsonrpc.
                    let r;
                    console.log(r);
                    r=await JSONrpc(q.JSON)
                    console.log(r);  
                    //Als er een error is, moet de bijbehorende code gestuurd worden.
                    //ParaseError als de JSON niet goed gestuurd is
                    if (r.methodExists=="parseError"){
                        res.end(JSON.stringify({jsonrpc: "2.0", error: {code: -32700, message: "Parse error"}, id: r.id}));
                        return;
                    }
                    //Als de methode niet gevonden is error code -32601
                    if (r.methodExists==false) {
                        r.error = { code: -32601, message: "Method not found" };
                    }
                    //jsonrpc is altijd "2.0".
                    r.jsonrpc = "2.0";
                    //Dit is om de volgorde mooi te maken, maar verder niet nodig.
                    let rResult = r.result;
                    delete r.result;
                    //Als de methode niet bestaat, mag er geen resultaat worden opgestuurd.
                    if (r.methodExists) {
                        r.result = rResult;
                    }
                    //methodExists is allen voor hier, moet niet worden opgestuurd.
                    delete r.methodExists;
                    //Even de ID op een mooie plek achteraan zetten, hoeft niet.
                    let rID = r.id;
                    delete r.id;
                    r.id = rID;
                    //Als er een error is, en r.result is er nog, moet dat verwijderd worden.
                    if (r.error!=undefined){
                        if (r.error.code==-32602 || r.error.code==-32700){
                            delete r.result;
                        }
                    }
                    //Statuscode 200 betekent dat de request goed afgehandeld is.
                    res.status = 200;
                    //Alles opsturen
                    try{
                        res.end(JSON.stringify(r));
                    }
                    catch(err){
                        res.end(JSON.stringify({"json-rpc": "2.0", "error": {"code": -32000, "message": "server error", "data": err}, "id": r.id}));
                    }
                })
                //res.end(JSON.stringify(data));
            }
            else {
                //Niets doen, alleen terugsturen.
                res.end();
            }
        }
        //Als er een error optreedt in bovenstaande code, wordt de code -32000 gegeven.
        catch(err){
            res.end(JSON.stringify({jsonrpc: "2.0", error: {code: "-32000", message: "Server error", "data": err}, id: null}));
        }
  });
  //De server moet wachten op requests
  serverStarted=true;
  server.listen(PORT);
}

// Als het portnummer gewijzigd wordt, moet de server even stoppen en opnieuw opstarten.

function updatePort(nr){
    server.close();
    serverStarted=false;
    PORT=nr;
    server.listen(PORT);
}

//Je moet de server wel kunnen laten stoppen als je de bibliotheek gebruikt.
function close(){
    server.close();
    serverStarted=false;
}

//Alle methodes en variabelen van de bibliotheek exporteren.
exports.start=start;
exports.rpcMethods=rpcMethods;
exports.updatePort=updatePort;
exports.port=function(){return PORT};
exports.close = close;
exports.allowCors=allowCors;
exports.JSONrpc=JSONrpc;