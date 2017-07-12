var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.session.user);
  res.render('dashboard/home', { title: 'Dashboard' });
});

module.exports = router;
