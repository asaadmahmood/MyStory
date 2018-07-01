// TODO service
const Message = require('./message.model');

let MessageService = {

  createMessage: (newMessage, callback) => {
    let messageItem = new Message(newMessage);
    messageItem.save((err, savedMessage) => {
      callback(err, savedMessage);
    });
  },

  updateMessage: (newMessage, callback) => {
    Message.findOne({
      msgId: newMessage.msgId
    }, (err, updatedMessage) => {
      if (updatedMessage) {
        Message.findByIdAndUpdate(updatedMessage._id, {
          message: newMessage.message
        }, {
          new: true
        },
        (err, updatedMessage) => {
          callback(err, updatedMessage);
        });
      } else {
        console.log('Message not found');
      }
    });
  },

  getMessageById: (id, callback) => {
    Message.findById(id, (err, message) => {
      callback(err, message);
    })
  },

  getMessages: (userId, callback) => {
    Message.find({createdBy: userId}, (err, messages) => {
      callback(err, messages);
    })
  },

  deleteMessage: (newMessage, callback) => {
    Message.findOne({
      msgId: newMessage.msgId
    }, (err, updatedMessage) => {
      if (updatedMessage) {
        Message.findByIdAndUpdate(updatedMessage._id, {
          deleted: newMessage.deleted
        }, {
          new: true
        },
        (err, updatedMessage) => {
          callback(err, updatedMessage);
        });
      } else {
        console.log('Message not found');
      }
    });
  },
};

module.exports = MessageService;