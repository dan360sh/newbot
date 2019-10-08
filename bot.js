const https = require('https');
const http = require('http');
const server = http.createServer();
var WebSocket = require('ws');
const wserver =  new WebSocket.Server({port:800}); 
const nodeStatic = require('node-static');
const file = new nodeStatic.Server('.', {
  cache: 0
});
function get(url){
return new Promise((resolve,reject)=>{	
	 https.get(url, (res)=>{
	 	var body = "";
	 	 res.on('data', (chunk) => { 
	 	 	body += chunk;
	 	 });
	 	 res.on('end', () => {
	 	 	//body = JSON.parse(body);
	 	 	resolve(body);
	 	 	// for(var i = 0;i<body.response.items.length;i++){
	 	 	// 	console.log(body.response.items[i].id);
	 	 	// }
	 	 	
	 	 });
	 });
 });
}
var grup_t = "e38b03803f094aed985270939bc5c699c576d006b8e54295d2813bc362721b683f53d427bf88417152372";
var token = "eea3e246d807d31b75657d5835f11e4ace97c2c294bdebec8e5ff99cad7230ba8c65077e361ab422b3048"
var mass_ws = [];
wserver.on('connection', ws=>{
	ws.on('message',message=>{
		main();
	})
	mass_ws.push(ws);
});
server.on('request',(req,res)=>{

	 file.serve(req, res);
	 console.log(req.url);
	 var body = "";
	 req.on('data', function(chunk) {
	 	body+=chunk;
	 }).on("end",function(){
	 	console.log(body);
	 });
	 
	  //res.end( req.url);
});
server.listen(3000,()=> console.log("сервер запущен"));

function send(e){
	for(var i in mass_ws){
		mass_ws[i].send(e);
	}
}
function a(metod,mass){	 
 	var str = "https://api.vk.com/method/"+metod+"?"+"access_token=e38b03803f094aed985270939bc5c699c576d006b8e54295d2813bc362721b683f53d427bf88417152372&v=5.101";
	for(var i in mass){
		str = str+"&";
		str = str+i+"="+mass[i];
	}
	send(str);
	return str;
}
function responsemax(mass,body,e2,e){
	var mass2 = [];
	var str =""
	for(var i = 0;i<body.response.items.length;i++){
		mass[e2] = body.response.items[i][e];
		str = JSON.stringify(mass);
		mass2.push(JSON.parse(str));
	}
	return mass2
}
async function main(){
	//var mass = {q:"данил шитов",id:""};
	var m = {user_id:551904267,message:'привет даш',random_id:26}
	var m2 = {user_id:185014513}
	var m3 = {count:200}
	//"messages.send" сообщения
	//"friends.add" / друганы
	var b2 = await get(a("messages.getConversations",m3));
	send(b2);
	//a.response.items[0].conversation.peer.id
   // a.response.items[0].last_message.text
	//console.log(b2.error);
	//var b = await get(a("users.search",mass));
	//console.log(b);
	//responsemax(mass,b,"id","id");
}

var os = require( 'os' );
var networkInterfaces = os.networkInterfaces( );
console.log( networkInterfaces );