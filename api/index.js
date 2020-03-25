const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

let messages = [
]

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.get('/messages', (req, res) => {
  const since = req.query.since || 0; //get time
  const filteredMessages = messages.filter(message => {
    return message.timestamp > since;
  })
  res.send({
    messages: filteredMessages
  });
})

app.post('/messages', (req, res) => {
  const timestamp = new Date().getTime();

  const {
    content,
    author
  } = req.body;

  if (!content || !author) {
    return res.sendStatus(400);
  }

  
  const newMessage = {
    id: messages.length + 1,
    author,
    content,
    timestamp
  }
  
  const newMessageResponse = {
    messages: [
      {
        ...newMessage
      }
    ]
  }

  messages.push(newMessage)
  res.status(200).send(newMessageResponse);
})

app.listen(port, () => {
  console.log(`server is up and running at port ${port}`)
})
