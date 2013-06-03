
/**
 * Module dependencies.
 */

var request = require('superagent');
var debug = require('debug')('mandrill');

/**
 * Module exports.
 */

module.exports = exports = create;

/**
 * Make transport overrideable.
 */

exports.request = request;

/**
 * Create client.
 *
 * @param {String} api key
 * @return {Function} sender function
 * @api public
 */

function create(key){
  /**
   * For options see:
   * https://mandrillapp.com/api/docs/messages.html
   *
   * Special options:
   *   - `from` can be "a b <c@d.com>", and it gets converted into
   *   `from_email` and `from_name`.
   *   - `to` can be a string like `from` or an array of strings.
   *
   * @param {Object} options
   * @param {Function} callback
   * @api public
   */

  function email(opts, fn){
    // use a placeholder callback if none present
    fn = fn || empty;

    // process `from`
    if (opts.from) {
      var from = parse(opts.from);
      delete opts.from;
      opts.from_email = from.email;
      opts.from_name = from.name;
    }

    // process `to`
    if (!Array.isArray(opts.to)) opts.to = [opts.to];
    if (opts.to) opts.to = opts.to.map(parse);

    send(key, opts, fn);
  }

  return email;
}

/**
 * Sends a message through the mandrill API.
 *
 * @param {String} api key
 * @param {Object} email message
 * @api private
 */

function send(key, message, fn){
  debug('sending message %j with api key "%s"', message, key);
  var url = 'https://mandrillapp.com/api/1.0/messages/send.json';
  exports.request
  .post(url)
  .send({ key: key, message: message })
  .end(function(err, res){
    if (err) return fn(err);
    if (res.ok) {
      fn(null, res.body.return);
    } else {
      var err = new Error('Mandrill response status ' + res.status);
      err.data = res.body;
      fn(err);
    }
  });
}

/**
 * Parses "A B <c@d.com>" into mandrill {email,name} format.
 *
 * @param {Object|String} email
 * @return {Object}
 * @api private
 */

function parse(email){
  if ('object' == typeof email) {
    return email;
  } else if (~email.indexOf('<')) {
    var match = email.match(/(.*) <([^>]+)>/);
    return { name: match[1], email: match[2] };
  } else {
    return { email: email };
  }
}

/**
 * Placeholder callback.
 *
 * @param {Error} error object, if any
 * @api private
 */

function empty (err) {
  if (err) return console.error(err.stack || err);
}
