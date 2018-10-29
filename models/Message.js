const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    bodyMessage: {type:String, required:true },
    user: {type: Schema.ObjectId, ref: 'User'},
    conversation: {type: Schema.ObjectId, ref: 'Conservation'}
});

const Message = mongoose.model('Message', messageSchema, 'Message');
module.exports = Message;