
/**
 * @class utils
 * MongoDB Utility Methods
 **/

var BSON = require('mongodb').BSONPure;

/**
 * @method ObjectIdfromString
 **/

function ObjectIdfromString(id) {
  return BSON.ObjectID.createFromHexString(id);
};

/**
 * @method find
 * @public
 * collection.find
 */

exports.find = function(db, collection, params, callback) {
  db.collection(collection, function(error, collection) {
    collection.find(params).toArray(callback);
  });
};

/**
 * @method findItem
 * @public
 */

exports.findItem = function(db, collection, id, params, callback) {
  id = ObjectIdfromString(id);
  db.collection(collection, function(error, collection) {
    collection.find({ _id : id }).toArray(callback);
  });
};

/**
 * @method getCollectionsWithCount
 * @public
 * @param {Function} callback
 **/

exports.getCollectionsWithCount = function(db, callback) {
  var complete = 0;
  db.collectionNames(function(error, collections) {
    if (error) {
      callback(error, null);
    } else {
      if (collections.length === 0) {
        return callback(null, []);
      };
      collections.map(function(item, i){
        item.name = item.name.split('.').pop();
        if (item.name === 'indexes') {
          delete collections[i];
        };
        db.collection(item.name, function(error, collection) {
          if (error) {
            callback(error, null);
          } else {
            collection.find({}).count(function(error, cnt) {
              if (error) {
                callback(error, null);
              } else {
                item.count = cnt;
                complete++;
                if (complete === collections.length) {
                  callback(null, collections);
                };
              }
            });
          }
        });
      });
    };
  });
};

/**
 * @method create
 * @public
 * @param {Function} callback
 */

/*exports.create = function(mongoose, collectionName, params, callback) {
  mongoose.connection.db.collection(collectionName, function(error, collection) {
    if (error) {
      callback(error);
    } else {
      collection.insert(params, callback);
    };
  });
};*/

/**
 * @method update
 * @public
 * @param {Function} callback
 **/

/*exports.update = function(mongoose, collectionName, params, callback) {
  if ('_id' in params) {
    params['_id'] = mongoose.mongo.BSONPure.ObjectID.fromString(params['_id']);
  };
  mongoose.connection.db.collection(collectionName, function(error, collection) {
    if (error) {
      callback(error);
    } else {
      collection.findAndUpdate(params, callback);
    };
  });
};*/

/**
 * @method remove
 * @public
 * @param {Function} callback
 */

/*exports.remove = function(mongoose, collectionName, params, callback) {
  if ('_id' in params) {
    params['_id'] = mongoose.mongo.BSONPure.ObjectID.fromString(params['_id']);
  };
  mongoose.connection.db.collection(collectionName, function(error, collection) {
    if (error) {
      callback(error);
    } else {
      collection.remove(params, callback);
    };
  });
};*/

/* EOF */