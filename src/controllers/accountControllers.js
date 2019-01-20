// 这是控制器的页面,请求的函数都在这
const path = require('path')
// 用对象的方式保存
exports.getRegisterPage = (req,res)=>{
    res.sendFile(path.join(__dirname,'../public/html/register.html'))
}