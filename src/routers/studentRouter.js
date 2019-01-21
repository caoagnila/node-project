/**
 * 学生信息管理的页面
 */
const express = require('express');
const path = require('path');
// 创建路由对象
const studentRouter = express.Router();
// 导入
const studentControllers = require(path.join(__dirname,'../controllers/studentControllers.js'));
// 处理请求
studentRouter.get('/list',studentControllers.list);
// 导出
module.exports = studentRouter;