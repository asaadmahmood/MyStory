const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

UserSchema = new mongoose.Schema({
  userId: {type: Number, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  username: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  status: {type: Boolean, required: true},
  publicCount: {type: Number, required: true},
  privateCount: {type: Number, required: true},
  profilePic: {type: String, required: true},
  active: {type: Boolean, required: true},
  token: {type: String}
}, {timestamps: true});

/** Before saving, encrypt if password is modified */
UserSchema.pre('save', function(next) {
  let user = this;
  if (!user.isModified('password')) {
      return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, null, (err, hash) => {
          user.password = hash;
          next();
      });
  });
});


UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);