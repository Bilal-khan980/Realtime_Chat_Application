const mongoose = require('mongoose');

const messageschema = mongoose.Schema({
    chatId: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },

});

const Message = mongoose.model("Message", messageschema);
module.exports = Message;