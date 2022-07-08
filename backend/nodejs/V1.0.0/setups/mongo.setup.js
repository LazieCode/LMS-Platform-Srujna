var MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
var url = process.env.MONGO_URI;

exports.readQuery = async(collection,key)=>{
    obj = []
    console.log(key)
    return new Promise((res,rej)=>{

    MongoClient.connect(url, function(err, db) {
      if (err) rej(err);
      var dbo = db.db(process.env.DBNAME);
      dbo.collection(`${collection}`).findOne({id : key}, function(err, result) {
        if (err) throw err;
        obj.push(result)
        res(obj)
        db.close();
      });
    });
  })
}

exports.readAllQuery = async(collection)=>{
    obj1 = []
  return new Promise((res,rej)=>{

    MongoClient.connect(url, function(err, db) {
      if (err) rej(err);
      var dbo = db.db(process.env.DBNAME);
      dbo.collection(`${collection}`).find({}).toArray(function(err, result) {
        if (err) throw err;
        // console.log(result);
        obj1 = result;
        res(obj1)
        db.close();
      });
    })
  })
}