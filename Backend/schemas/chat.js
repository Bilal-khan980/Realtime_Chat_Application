const mongoose = require('mongoose');

const chatsschema = mongoose.Schema({
    members: {
        type: Array,
        required: true
    },


});


const chats = mongoose.model("chats", chatsschema);
module.exports = chats;


