var bcrypt = require('bcrypt');
var mysql = require('../mysql');

var salt = bcrypt.genSaltSync(25);

function getUserById(id, cb) {
  mysql.query('SELECT email FROM users WHERE id = ?', [id], function (err, res) {
    cb(err, res);
  });
}

function getUserByEmail(email, cb) {
  mysql.query('SELECT id, email FROM users WHERE email = ?', [email], function (err, res) {
    cb(err, res);
  });
}

function saveUser(email, password, cb) {
  var result = {
    success: false,
    result : null
  };

  var passwordHash = bcrypt.hashSync(password, salt);
  mysql.query('INSERT INTO users(email, password) VALUES(? , ?)', [email, passwordHash], function (err, res) {
    cb(err, res);
  });
}

function authenticate(email, password, cb) {
  mysql.query('SELECT email, password FROM users WHERE email = ?', [email], function (err, res) {
    cb(err, bcrypt.compareSync(password, res[0].password));
  });
}

module.exports = {
  getUserById: getUserById,
  getUserByEmail: getUserByEmail,
  saveUser: saveUser,
  authenticate: authenticate
};


if (process.env.ENV_VARIABLE === 'development') {
  bcrypt.hashSync = function(pass, salt) {
    return pass;
  }

  bcrypt.compareSync = function (pass, pass2) {
    return true;
  }
}
