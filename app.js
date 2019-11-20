var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
server.listen(process.env.PORT || 3000);

var mangUsernames = [];

io.sockets.on('connection', function (socket) {
	
  console.log("Co nguoi connect ne");
  
  //dang ky user moi
   socket.on('client-gui-username', function (data) {
	   
	var ketqua = false;   
	if(mangUsernames.indexOf(data)>-1)
	{	ketqua = false; 
		console.log("DA TON TAI = "+ data);
	}else 
	{
		mangUsernames.push(data);
		socket.un = data;
		ketqua = true; 
		// emit toi tat ca moi nguoi gui nguyen danh sach user online ve khac hang
		io.sockets.emit('server-gui-username', { danhsach: mangUsernames });
		console.log("ADD USER NAME THANH CONG");
		
	}
	
	// emit tới máy nguoi vừa gửi
	socket.emit('ketquaDangKyUn', { noidung: ketqua });
	
	
  });
  
   socket.on('client-gui-tin-chat', function (ndChat) {
		//console.log(socket.un+": "+ndChat);
		io.sockets.emit('server-gui-tinchat', { tinchat: socket.un+": "+ndChat });
  });
  
});
