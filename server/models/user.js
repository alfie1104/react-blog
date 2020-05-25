const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

//role : 0 (Normal User), 1 (Admin User)
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

//Encrypting password before saving
userSchema.pre("save", function (next) {
  var user = this;

  // only commit below process when password is modified
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);

    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  let user = this;

  /*
    user의 _id 값은 mongo db에서 자동적으로 생성됨.
    두번째로 인자로 주어지는 secret 키는 원하는 값을 입력하면 됨
  */
  let token = jwt.sign(user._id.toHexString(), "secret");

  user.token = token;
  user.save((err, user) => {
    if (err) return cb(err);

    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  let user = this;

  jwt.verify(token, "secret", (err, decoded) => {
    /*
      generateToken에서 토큰을 생성할때 정보로 id를 넣었기 때문에,
      token을 decode하면 id값이 나옴. 즉 decoded가 정상적으로 decode된 결과라면 id와 동일함
    */

    user.findOne(
      {
        _id: decoded,
        token,
      },
      (err, user) => {
        if (err) return cb(err);

        cb(null, user);
      }
    );
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
