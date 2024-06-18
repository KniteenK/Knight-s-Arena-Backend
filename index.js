const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');
const { stringify } = require('querystring');

const app=express();
app.use(cors());
app.use(bodyParser.json());
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });



const port = 8000;

var waiting = null;


let clients = [];
let clickCount = 0;


wss.on('connection', (ws) => {
  clients.push(ws);
  ws.on('message', (message) => {
    if (message.toString() === 'buttonClicked') {
          clickCount++;
          if (clickCount == 2) {
                const ID = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                var cur = ID.charAt(Math.random()*25);
                
                cur += ID.charAt(Math.random()*25);
                cur += ID.charAt(Math.random()*25);
                cur += ID.charAt(Math.random()*25);
                console.log(cur);
                clients[0].send(cur);
                
                clients[1].send(cur);
              
              clickCount = 0; // Reset the counter after alerting both clients
          }
      }else{
        // console.log(message.toString());
        clients[0].send(message.toString());
        clients[1].send(message.toString());
              
      }
  });

  ws.on('close', () => {
      clients = clients.filter(client => client !== ws);
  });
});



server.listen(port,()=> {console.log("listening");})