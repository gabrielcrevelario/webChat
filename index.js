const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const http = require('http').Server(app);
const io = require('socket.io')(http);
const User = require('./models/User');
const Conversation = require('./models/Conversation');
const Message = require('./models/Message');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/conversation/title', async (req, res) => {
try{
  const conversa = await Conversation.find({title:req.params.title});
  res.send(conversa)
} catch(e) {
  throw e;
}
  
})
app.get('/conversation/', async (req, res) => {
  try{
    const conversas = await Conversation.find();
    res.send(conversas)
  } catch(e) {
    throw e;
  }
    
  })

app.post('/conversation/:id/users/:idUser', async (req, res) => {
  try{
    await User.findByIdAndUpdate(req.params.idUser,{$set:{
        conversations:req.params.id
      }});

      await User.find({_id:req.params.idUser});
   const msn = await Message.create({bodyMessage: req.body.bodyMessage, user:req.params.idUser, conversation:req.params.id});
    await Conversation.findByIdAndUpdate(req.params.id, {$push: {
      users:req.params.idUser,
      messages:msn.id
    }});
    const findMessagesById = await Message.find({conversation:req.params.id});
    res.json(findMessagesById).status(200)
  } catch(e) {
    throw e;
  }
  
  });
  
  app.post('/conversation/', async (req, res) => {
    try{
       await Conversation.create({
        title: req.body.title,
        author: req.body.author,
        users:req.body.users,
        messages: req.body.messages.bodyMessege
      });
      res.status(201);
    } catch(e) {
      throw e;
    }
    })

    app.post('/user/', async (req, res) => {
      try{
        const userCreated = User.create({
          name: req.body.name,
          subName: req.body.subName,
          email: req.body.email,
          password:req.body.password,
          conversations: req.body.conversations,
          messages:req.body.messages
        });
        res.send(userCreated).status(201);
      } catch(e) {
        throw e;
      }
      })
    


const server = http.listen(port, () => {
  console.log('ruining na porta',server.address().port)
})