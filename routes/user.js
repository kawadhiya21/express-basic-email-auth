var express = require('express');
var router = express.Router();

var util = require('../models/util');
var userModel = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/user/login')
});

router.get('/login', function(req, res, next) {
  res.render('index/login', { title: 'Login', email: '' });
});

router.post('/login', function(req, res, next) {
  var validation = util.param_validation(req.body, { email : { required: true}, password: { required: true, min_length: 5}});
  if (!validation.success) {
    return res.render('index/login', { title: 'Login', email: req.body.email, msgs: validation.errors, type: 'error' });
  }
  var email = req.body.email;
  userModel.getUserByEmail(email, function(err, user) {
    if (user.length) {
      userModel.authenticate(req.body.email, req.body.password, function(err, result) {
        if (result) {
          req.session.user = user[0];
          return res.redirect('/dashboard');
        }
        return res.render('index/login', { title: 'Login', email: email, msgs: ['Email password combination is wrong.'], type: 'error' });
      });
    } else {
      return res.render('index/login', { title: 'Login', email: email, msgs: ['Please signup to continue'], type: 'error' });
    }
  });
});

router.get('/signup', function(req, res, next) {
  res.render('index/signup', { title: 'Signup', email: '' });
});

router.post('/signup', function(req, res, next) {
  var validation = util.param_validation(req.body, { email : { required: true}, password: { required: true, min_length: 5, equals: req.body.confirm_password }}, ['confirm_password']);
  if (!validation.success) {
    return res.render('index/signup', { title: 'Signup', email: req.body.email, msgs: validation.errors, type: 'error' });
  }
  var email = req.body.email;
  userModel.getUserByEmail(email, function(err, result) {
    if (!result.length) {
      userModel.saveUser(req.body.email, req.body.password, function(err, result) {
        if (result) {
          return res.render('index/login', { title: 'Login', email: email, msgs: ['Signup successful, please login using the credentials used for signup.'], type: 'success' });
        }
        return res.render('index/signup', { title: 'Signup', email: email, msgs: ['Signup not successful, please contact us.'], type: 'error' });
      });
    } else {
      return res.render('index/signup', { title: 'Signup', email: email, msgs: ['User already exists.'], type: 'error' });
    }
  });
});

module.exports = router;
