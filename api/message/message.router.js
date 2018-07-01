const messageRouter = require('express').Router();
const messageService = require('./message.service');
const { check, validationResult } = require('express-validator/check');

messageRouter.post('/', [
    check('message.message').not().isEmpty()
  ], (req, res, next) => {
  const newMessage = req.body.message;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  newMessage.ownerId = req.user._id;

  messageService.createMessage(newMessage, (err, message) => {
    if (!err) {
      res.json({
        item: message,
        message: "Message added successfully"
      });
    } else {
      next(err);
    }
  });
});

messageRouter.post('/update', [
  check('message.message', 'Message is required').not().isEmpty()
], (req, res, next) => {

  const updatedMessage = req.body.message;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  messageService.updateMessage(updatedMessage, (err, message) => {
    if (!err) {
      res.json({
        item: message,
        message: 'Message updated successfully'
      });
    } else {
      next({
        message: err.message
      });
    }
  });
});

messageRouter.post('/delete', (req, res, next) => {

  const updatedMessage = req.body.message;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  messageService.deleteMessage(updatedMessage, (err, message) => {
    if (!err) {
      res.json({
        item: message,
        message: 'Message deleted successfully'
      });
    } else {
      next({
        message: err.message
      });
    }
  });
});

messageRouter.get('/', (req, res, next) => {
  messageService.getTodos(req.userId, (err, messages) => {
    if (!err) {
      res.json({
        item: messages,
        message: "All Messages"
      });
    } else {
      next(err);
    }
  });
});

messageRouter.get('/:id', [
    check('id').not().isEmpty()
  ], (req, res, next) => {
  messageService.getTodoById(req.params.id, (err, message) => {
    if (!err) {
      res.json({
        item: message,
        message: "Message record found"
      });
    } else {
      next(err);
    }
  });
});


messageRouter.put('/:id', [
    check('id').not().isEmpty()
  ], (req, res, next) => {
  messageService.updateMessage(req.params.id, req.body,
    (err, updatedMessage) => {
      if (!err) {
        res.json({
          item: updatedMessage,
          message: "Message record updated"
        });
      } else {
        next(err);
      }
    });
});

messageRouter.delete('/:id', [
    check('id').not().isEmpty()
  ], (req, res, next) => {
  messageService.deleteMessage(req.params.id, (err, message, next) => {
    if (!err) {
      res.json({
        item: message,
        message: "Message Deleted!"
      });
    } else {
      next(err);
    }
  });
});

module.exports = messageRouter;

