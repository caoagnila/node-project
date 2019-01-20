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
accountRouter.get('/register',accountControllers.getRegisterPage);
// 导出
module.exports = accountRouter;
