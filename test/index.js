
/**
 * Module dependencies
 */

var mandrill = require('../');
var expect = require('expect.js');

/**
 * Create Mandill-send instance
 */
var email = mandrill('some random key');

describe('mandrill-send', function(){
  it('should work', function(done){
    // mock
    var req = {};
    req.post  = function(_url){
      req.url = _url;
      return req;
    };
    req.send = function(data){
      req.data = data;
      return req;
    };
    req.end = function(fn){
      expect(req.url).to.be('https://mandrillapp.com/api/1.0/messages/send.json');
      expect(req.data).to.eql({
        key: 'some random key',
        message: {
          from_name: 'From',
          from_email: 'from@email.com',
          to: [
            { email: 'to@email.com' },
            { name: 'The other guy', email: 'the.other.guy@email.net' }
          ],
          subject: 'Testing signup',
          tags: ['signup', 'welcome']
        }
      });
      done();
    };

    // set mock
    mandrill.request = req;

    // send email
    email({
      from: 'From <from@email.com>',
      to: [
        'to@email.com',
        { name: 'The other guy', email: 'the.other.guy@email.net' }
      ],
      subject: 'Testing signup',
      tags: ['signup', 'welcome']
    });
  });
});
