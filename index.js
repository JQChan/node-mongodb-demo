"use strict";
var uuid = require("node-uuid");
var sprintf = require("sprintf-js").sprintf;
var mongoClient = require("mongodb").MongoClient;
var host1 = "mongoDB地址";
var port1 = 3717;
var username = "你的用户名";
var password = "你的密码";
var dbName = "test";
var tableName = "col";
// 官方建议使用的方案
var url = sprintf("mongodb://%s:%d", host1, port1);
console.info("url:", url);
// 获取mongoClient
mongoClient.connect(url, {
  auth: {
    user: username,
    password: password
  }
},function (err, db) {
  if (err) {
    console.error("authenticate err:", err);
    return 1;
  }
  console.log("已成功链接数据库");
  console.log(db)
  var dbase = db.db(dbName);

  dbase.createCollection('col3', function (err, res) {
    if(err) throw err;
    console.log("创建集合");
  });

    var collection = dbase.collection(tableName);

    var demoName = "NODE:" + uuid.v1();

    var doc = {
      title: demoName,
      description: "Hello AliCloudDB for MongoDB",
    };

    collection.insertOne(doc, function(err, res) {
      if (err) throw err;
      console.log("文档插入成功");
      //关闭Client，释放资源
      db.close();
    });
});
