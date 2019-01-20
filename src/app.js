//导包
const express = require('express')
const path = require('path')


//创建app
const app = express()
// 获取静态页面的根目录
app.use(express.static(path.join(__dirname,"public")));

//处理请求,分流到其他
// app.get('/',(req,res)=>{
//     res.send('Hello World')
// })
const accountRouter = require(path.join(__dirname,'routers/accountRouter.js'))
app.use('/account',accountRouter)


//启动
app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err)
    }
    console.log("start ok")
})