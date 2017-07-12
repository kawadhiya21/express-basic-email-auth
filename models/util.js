var user = require('./user');

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

function param_validation(params, validation, ignore_list) {
  ignore_list = ignore_list || [];
  var errors = [];
  Object.keys(params).forEach(function (key) {
    if (!(ignore_list.indexOf(key) > -1)) {
      if (!params[key] && validation[key].required) {
        errors.push("Params: {0} not present".format(key));
      }

      if (params[key] && validation[key].min_length && params[key].length < validation[key].min_length) {
        errors.push("{0} should have {1} min characters".format(key, validation[key].min_length));
      }

      if (params[key] && validation[key].max_length && params[key].length > validation[key].max_length) {
        errors.push("{0} should have {1} max characters".format(key, validation[key].max_length));
      }

      if (params[key] && validation[key].equals && params[key] > validation[key].equals) {
        errors.push("{0} should have must match".format(key));
      }
    }
  });

  return {
    success: errors.length == 0,
    errors : errors
  };
}

function check_logged_in(session, cb) {
  if (session && session.user) {
    user.getUserById(session.user.id, function (err, result) {
      if (session.user.email == result[0].email) {
        return cb(true);
      } else {
        return cb(false);
      }
    });
  } else {
    return cb(false);
  }
}

module.exports = {
  param_validation: param_validation,
  check_logged_in: check_logged_in
}
