//导包
const express = require('express');
const path = require('path');
// 导入post请求的第三方
const bodyParser = require('body-parser');
// 储存数据到session的第三方
const session = require('express-session');



//创建app
const app = express()

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())
// 获取静态页面的根目录
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}))

//处理请求,分流到其他
// app.get('/',(req,res)=>{
//     res.send('Hello World')
// })
const accountRouter = require(path.join(__dirname, 'routers/accountRouter.js'))
app.use('/account', accountRouter)
const studentRouter = require(path.join(__dirname, 'routers/studentRouter.js'))
app.use('/student', studentRouter)


//启动
app.listen(3000, '127.0.0.1', err => {
    if (err) {
        console.log(err)
    }
    console.log("start ok")
})