
/**
 * Module dependencies
 */

var mandrill = require('../')
  , config = require('./config')
  , expect = require('expect.js');

/**
 * Create Mandill-send instance
 */
var email = mandrill(config.key);

describe('send a simple email', function(){
  it('expect `null` error response', function(done){

    email({
      from: 'From <from@email.com>',
      to: [
        'to@email.com',
        { name: 'The other guy', email: 'the.other.guy@email.net' }
      ],
      subject: 'Testing signup',
      tags: ['signup', 'welcome']
    }, function(err){
      expect(err).to.equal(null);
      done();
    });
  });
});
