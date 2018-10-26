const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
 
    conversation: {type: Schema.ObjectId, ref: 'Conservation'}
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;