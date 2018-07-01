const mongoose = require('mongoose');

/** Message model schema */
const messageSchema = new mongoose.Schema({
    msgId: { type: Number, required: true},
    user: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    public: { type: Boolean, required: true },
    message: { type: String, required: true },
    date: { type: String, required: true},
    editing: { type: Boolean, required: true },
    deleted: Boolean,
    ownerId: { type: mongoose.Schema.Types.ObjectId, required: true }
});

// Creating the Todo model using schema here
const Message = mongoose.model('message', messageSchema);

module.exports = Message;
