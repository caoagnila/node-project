// 这是控制器的页面,请求的函数都在这
const path = require('path')
// 验证码模块
const captchapng = require('captchapng');
// 导入mangodb
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
 
const dbName = 'shenzheima27';


// 用对象的方式保存
// 处理register页面加载的请求
exports.getRegisterPage = (req,res)=>{
    res.sendFile(path.join(__dirname,'../public/html/register.html'))
}
// 处理注册post的请求
exports.register = (req,res)=>{
    const rule = {
        status:0,
        message:"注册成功"
    }
    // 1.获取传过来的值
    const{username} = req.body;
    // 2.判断数据库是否存在注册的数据
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {

        const db = client.db(dbName);
        const collection = db.collection('user');
        collection.findOne({username},function(err,result){
            console.log(result)
             // 如果result == null 没有查询到，就可以插入，如果查询到了，说明用户名已经存在
            if(result){//存在
                rule.status = 1
                rule.message = "用户已存在"
                // 存在就不改变数据库,关闭数据库
                client.close();
                res.json(rule);
            }else{//否则就不存在
                //不存在就插入数据库
                // 再做判断,如果数据库里面有值,就添加成功,为null就没有添加上数据
                collection.insertOne(req.body,function(err,doc){
                    if(!doc){
                        // 没有添加进数据库
                        rule.status = 2
                        rule.message = "注册失败"
                    }
                        //关闭数据库    
                    client.close();
                        // 返回响应
                    res.json(rule);
                })

            }
        })
    }
    ) 
}

// 处理login的加载请求
exports.getLoginPage =(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/html/login.html'));
}
// 处理login验证码的请求
exports.getVcodeImage =(req,res)=>{
    // 添加一个第三方模块,captchapng模块
    const vcode = parseInt(Math.random()*9000+1000);
    // 将验证码的数字储存到session中去
    req.session.vcode = vcode;
    console.log(vcode);
    var p = new captchapng(80,30,vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
 
    var img = p.getBase64();
    var imgbase64 = Buffer.from(img,'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
    // 获取浏览器传过来的数字和session对比
}
// 处理登录页面的请求
exports.login =(req,res)=>{

    const result = {
        status:0,
        message:"登录成功"
    }
    // 判断
    // 获取传过来的值,
    const {vcode,username,password} = req.body
    if(vcode !=req.session.vcode){
        // 验证码没有通过
        result.status = 1
        result.message = "验证码错误"
        res.json(result);
        return;//需要阻止代码的运行,不然上面的res.json(result);会和下面的冲突
    }else{
        // 验证码成功,查询数据库有没有登录的用户名和密码
        //通过mangodb来查询数据库,所以要用mongodb模块的方法
        MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
            const db = client.db(dbName);
            const collection = db.collection('user');
            collection.insertOne(req.body,function(err,doc){
                if(!doc){
                    // 数据库是否有数据
                    result.status = 2
                    result.message = "用户名或密码错误"
                }
                    //关闭数据库    
                client.close();
                    // 返回响应
                res.json(result);
            })

        })
        
    }
}
