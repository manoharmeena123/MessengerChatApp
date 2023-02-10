const io = require("socket.io")(8000)
// const http = require('http');
// const express = require('express');
// const app = express();
// // const cors = require('cors')
// const server = http.createServer(app);

// const port = process.env.PORT || 3000



// aap.get('/',(req,res)=>{
      
// res.send("Api based Url")
// })
// aap.use(cors({
//     origin:"*"
// }))
const users ={}

io.on("connection",socket =>{
socket.on('new-user-joined',name =>{
    console.log("New user",name)
    users[socket.id]= name
    socket.broadcast.emit('user-joined',name);
})

socket.on('send',message=>{
    socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
});


socket.on('disconnect',message=>{
    socket.broadcast.emit('left',users[socket.id]);
    delete users[socket.id]
});

})
// server.listen(3000,()=>{
//     console.log("Listning to [port 3000]")
// })