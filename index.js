const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('./config/db'); 
const User = require('./models/User');
const Conversation = require('./models/Conversation');
const Message = require('./models/Message');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/conversation/title', (req, res) => {
try{
  const conversa = Conversation.find({title:req.params.title});
  res.send(conversa)
} catch(e) {
  throw e;
}
  
})
app.get('/conversation/', (req, res) => {
  try{
    const conversas = Conversation.find();
    res.send(conversas)
  } catch(e) {
    throw e;
  }
    
  })

app.put('/conversation/:id/users/:idUser', (req, res) => {
  try{
      User.findByIdAndUpdate(req.params.idUser,{$set:{
        conversations:req.params.id
      }});

      Conversation.findByIdAndUpdate(req.params.id,
        { $set:{users:[req.params.idUser],
                messages:[{messageBody : req.body.messages[0].messageBody,
                             user:req.params.idUser}]
               }});

    const conversationFind = Conversation.findById(req.params.id);
    res.json().status(200)
  } catch(e) {
    throw e;
  }
  })
  
  app.post('/conversation/', (req, res) => {
    try{
      const conversaCreated = Conversation.create({
        title: req.body.title,
        author: req.body.author,
        users:req.body.users,
        messages: req.body.messages,
        dataEnv:req.body.dataEnv
      });
      res.send(conversaCreated).status(201);
    } catch(e) {
      throw e;
    }
    })

    app.post('/user/', (req, res) => {
      try{
        const userCreated = User.create({
          name: req.body.name,
          subName: req.body.subName,
          email: req.body.email,
          password:req.body.password,
          conversations: req.body.conversations,
          messages:req.body.messages,
          dataEnv:req.body.dataEnv
        });
        res.send(userCreated).status(201);
      } catch(e) {
        throw e;
      }
      })
    


app.listen(port, () => {
  console.log(`ruining na porta ${port}`)
})