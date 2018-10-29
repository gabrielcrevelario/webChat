const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema ({
    title: {type: String, required:true},
    author:{type: Schema.ObjectId, ref:'User'},
    users: [{type: Schema.ObjectId, ref:'User'}],
    messages: [{type: Schema.ObjectId, ref: 'Message'}]
})
module.exports = mongoose.model('Conversation', conversationSchema, 'Conversation');