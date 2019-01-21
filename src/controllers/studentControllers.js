// 导入模块
const path = require('path')
// 第三方模块
const template = require("art-template");
// mongobd模块
const MongoClient = require("mongodb").MongoClient;
// Connection URL
const url = "mongodb://localhost:27017";
// Database Name
const dbName = "shenzheima27";


exports.list = (req,res)=>{
    // 做出判断
    const keyword = req.query.keyword || '';

    MongoClient.connect(url,{useNewUrlParser: true}, function(err, client) {
        const db = client.db(dbName);
        const collection = db.collection('student');
        collection.find({name:{$regex:keyword}}).toArray((err, docs) => {
            client.close();
    
            // 渲染页面的代码
            const html = template(path.join(__dirname, "../public/html/list.html"), {student:docs,keyword});
            console.log(html)
            res.send(html);//返回给浏览器
        });
    });
}   