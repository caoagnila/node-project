/**
 * 注册和登录的分流页面
 */
const express = require('express');
const path = require('path');
// 创建路由对象
const accountRouter = express.Router();
// 导入
const accountControllers = require(path.join(__dirname,'../controllers/accountControllers.js'));
// 处理请求
// 获取注册页面
accountRouter.get('/register',accountControllers.getRegisterPage);
// 获取注册请求
accountRouter.post('/register',accountControllers.register)
// 获取登录页面
accountRouter.get('/login',accountControllers.getLoginPage);
// 获取验证码
accountRouter.get('/vcode',accountControllers.getVcodeImage);
// 登录页面的处理
accountRouter.post('/login',accountControllers.login);
// 导出
module.exports = accountRouter;
