// User service
const User = require('./user.model');
const uuidv1 = require('uuid/v1');

let UserService = {

  signup: (newUser, callback) => {
    let user = new User(newUser);
    user.save((err, savedUser) => {
      /** Generate Unique token */
      let uuid = uuidv1();
      User.findByIdAndUpdate(user._id, {
          token: uuid
        }, {
          new: true
        },
        (err, updatedUser) => {
          callback(err, updatedUser);
        });
    });
  },

  login: (userInfo, callback) => {
    User.findOne({
      email: userInfo.email
    }, (err, user) => {
      if (user) {
        if (user.active) {
          let match = user.comparePassword(userInfo.password);
          if (match) {
            /** Generate Unique token */
            let uuid = uuidv1();
            User.findByIdAndUpdate(user._id, {
                token: uuid
              }, {
                new: true
              },
              (err, updatedUser) => {
                callback(err, updatedUser);
              });
          } else {
            callback(new Error('Invalid Password'));
          }
        } else {
          callback(new Error('Your account was deleted.'));
        }
      } else {
        callback(new Error('Invalid Email address.'))
      }
    });
  },

  updateUser: (userInfo, callback) => {
    User.findOne({
      _id: userInfo._id
    }, (err, user) => {
      let uuid = uuidv1();
      console.log(user);
      User.findByIdAndUpdate(user._id, {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          username: userInfo.username
        }, {
          new: true
        },
        (err, updatedUser) => {
          callback(err, updatedUser);
        });
    });
  },

  getUserById: (id, callback) => {
    User.findById(id, (err, user) => {
      callback(err, user);
    })
  },

  getUser: (userId, callback) => {
    User.find({
      createdBy: userId
    }, (err, users) => {
      callback(err, users);
    })
  },

  getUsers: (callback) => {
    User.find({}, function (err, users) {
      callback(err, users);
    });
  },

  deleteUser: (userInfo, callback) => {
    console.log(userInfo);
    User.findOne({
      email: userInfo.email
    }, (err, user) => {
      User.findByIdAndUpdate(user._id, {
          active: userInfo.active
        }, {
          new: true
        },
        (err, updatedUser) => {
          callback(err, updatedUser);
        });
    });
  }
};

module.exports = UserService;
