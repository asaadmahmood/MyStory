const userRouter = require('express').Router();
const userService = require('./user.service');
const { check, validationResult } = require('express-validator/check');
const Auth = require('../utility/auth');

userRouter.post('/signup', [
  check('user.firstName', 'First Name is required').not().isEmpty(),
  check('user.lastName', 'Last Name is required').not().isEmpty(),
  check('user.email', 'Email is required').isEmail(),
  check('user.password', 'Password is Required and should have more than 4 characters.').isLength({ min: 5 })
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = req.body.user;

  userService.signup(user, (err, user) => {
    if (!err) {
      res.json({
        user: user,
        message: "User added successfully"
      });
    } else {
      next(err);
    }
  })
});


userRouter.post('/update', [
  check('user.firstName', 'First Name is required').not().isEmpty(),
  check('user.lastName', 'Last Name is required').not().isEmpty(),
  check('user.email', 'Email is required').isEmail(),
  check('user.password', 'Password is Required and should have more than 4 characters.').isLength({ min: 5 })
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = req.body.user;

  userService.updateUser(user, (err, user) => {
    if (!err) {
      res.json({
        user: user,
        message: 'User updated successful'
      });
    } else {
      next({
        message: err.message
      });
    }
  });
});


userRouter.post('/delete', (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = req.body.user;

  userService.deleteUser(user, (err, user) => {
    if (!err) {
      res.json({
        user: user,
        message: 'User deleted successful'
      });
    } else {
      next({
        message: err.message
      });
    }
  });
});


userRouter.post('/login', [
  check('user.email', 'Email is required').isEmail(),
  check('user.password', 'Password is Required and should have more than 4 characters.').isLength({ min: 5 })
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = req.body.user;

  userService.login(user, (err, user) => {
    if (!err) {
      res.json({
        user: user,
        message: 'Login successful'
      });
    } else {
      next({
        message: err.message
      });
    }
  });
});

userRouter.get("/users", function (req, res) {
  userService.getUsers((err, users) => {
    if (users) {
      res.json(users);
    } else {
      next({
        message: err.message
      });
    }
  });
})

userRouter.get('/:id', Auth, (req, res, next) => {
  userService.getUserById(req.params.id, (err, user) => {
    if (user) {
      res.json({
        user: user,
        message: "User found with the given id"
      });
    } else {
      next({
        message: err.message
      });
    }
  });
})




module.exports = userRouter;