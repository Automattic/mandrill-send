
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
  it('expect not `null` response', function(done){

    email({
      from: 'Rosepad <damian@rosepad.com>',
      to: [
        'rdsuarez@gmail.com',
        { name: 'Dami', email: 'damian.suarez@xifox.net' }
      ],
      subject: 'Testing signup',
      tags: ['signup', 'welcome']
    }, function(err){
      expect(err).to.equal(null);
      done();
    });
  });
});
