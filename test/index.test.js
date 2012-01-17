
/*!
  Core Modules
 */

var vows = require('vows')
    , assert = require('assert')
    , request = require('request')
    , mongodb_viewer = require('../lib/mongodb-viewer')
    , httpServer = mongodb_viewer.httpServer;

/*!
  vows / `npm test`
 */

vows.describe('general module tests').addBatch({
  'when instantiating mongodb_viewer':{
    topic:function(){
      return mongodb_viewer;
    },
    'mongodb_viewer should be an object':function(topic) {
      assert.isObject(topic);
    },
  },
  'when starting then requesting the application':{
    topic:function(){
      var self = this;
      mongodb_viewer.run();
      request('http://localhost:8000/', self.callback);
    },
    'request should return no errors, a 200 response code, and html within the body':function(error, response, body){
      httpServer.close();
      assert.isNull(error);
      assert.equal(response.statusCode, 200);
      assert.equal(/html/m.test(body), true);
    }
  }
}).export(module);

/* EOF */