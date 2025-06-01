import { WebSocketServer } from "ws";
const server = new WebSocketServer({
    port:8081
});

/*
    const message = event.toString(); 
       console.log(event);
        if(message.includes("chipId")){
            const words = message.split("-");
            const canvas = "<canvas id="+words[1]+"' width='200' height='100' style='border:1px solid black;'>Sorry, your browser does not support canvas.</canvas><br/><button onclick=resetRoom("+words[1]+")>Reset Room</button>";
            socket.send(canvas);
            console.log("Got Message "+message);
        }

         //server.clients.forEach((client) => {
        //    if (client.readyState === WebSocket.OPEN) {
        //        client.send(`Broadcast: ${message}`);
        //        console.log(`Broadcast : ${message}`);
        //    }
        //});
        //socket.send(`Server: ${message}`);
*/

server.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received:', message.toString());

    // Broadcast message to all clients (including sender)
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        //client.send(`Broadcast: ${message}`);
        const messageStr = message.toString(); 
        console.log(messageStr);
        const words = messageStr.split("-");
        if(messageStr.includes("chipId")){
            //const canvas = "<canvas id="+words[1]+"' width='200' height='100' style='border:1px solid black;'>Sorry, your browser does not support canvas.</canvas><br/><button onclick=resetRoom("+words[1]+")>Reset Room</button>";
            client.send("create-"+words[1]);
            console.log("Got Message "+message);
        }else if(messageStr.includes("updateRoom")){
            client.send("updateRoom-"+words[1]);
        }
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.send('Welcome client!');
});


console.log('WebSocket server is running on ws://192.168.100.113:8081');
