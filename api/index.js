let messageRouter = require('./message/message.router');
let userRouter = require('./user/user.router');
let Auth = require('./utility/auth');

module.exports = function (app) {
  app.use('/message', Auth, messageRouter);
  app.use('/user', userRouter);
}
