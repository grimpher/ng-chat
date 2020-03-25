const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const port = 3000;

let messages = [
  {
    id: 1,
    content: 'hello world',
    author: 'Bot',
    timestamp: new Date().getTime()
  }
]
 
io.on('connection', socket => {
  socket.emit('initial messages', messages);

  socket.on('message', messageData => {
    const { content, author } = messageData;
    const newMessage = {
      id: messages.length + 1,
      content: content,
      author: author,
      timestamp: new Date().getTime()
    }

    messages.push(newMessage);
    io.emit('message', [ { ...newMessage } ]);
  })
})

server.listen(port, () => {
  console.log(`server is up and running at port ${port}`)
})








// copied

// app.get('/messages', (req, res) => {
//   const since = req.query.since || 0; //get time
//   const filteredMessages = messages.filter(message => {
//     return message.timestamp > since;
//   })
//   res.send({
//     messages: filteredMessages
//   });
// })

// app.post('/messages', (req, res) => {
//   const timestamp = new Date().getTime();

//   const {
//     content,
//     author
//   } = req.body;

//   if (!content || !author) {
//     return res.sendStatus(400);
//   }

  
//   const newMessage = {
//     id: messages.length + 1,
//     author,
//     content,
//     timestamp
//   }
  
//   const newMessageResponse = {
//     messages: [
//       {
//         ...newMessage
//       }
//     ]
//   }

//   messages.push(newMessage)
//   res.status(200).send(newMessageResponse);
// })