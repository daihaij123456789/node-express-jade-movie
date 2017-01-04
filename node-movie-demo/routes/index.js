var express = require('express');
var router = express.Router();
var Index=require('../app/controllers/index');
var Movie=require('../app/controllers/movie');
var User=require('../app/controllers/user');
var Comment=require('../app/controllers/comment');
var Category=require('../app/controllers/category');
/* GET home page. */
//session 预处理
router.use(function (req, res, next) {
  var _user=req.session.user;
    res.locals.user=_user;
    next();
    
})


//movie首页
router.get('/', Index.index);

//user用户
router.post('/user/signup',User.signup);//signup注册页
router.post('/user/signin',User.signin);//signup注册页
router.get('/admin/user/list',User.signinRequired,User.adminRequired, User.list);//userlist列表页
router.get('/signin',User.showSignin);//signin登陆页
router.get('/signup',User.showSignup);//signup注册页
router.get('/logout',User.logout);//logout登出页

//movie电影
router.get('/movie/:id',Movie.detail);//movie详情页
router.get('/admin/movie/new',User.signinRequired,User.adminRequired, Movie.new);//movie后台录入页
router.get('/admin/movie/update/:id',User.signinRequired,User.adminRequired, Movie.update);//后台更新页
router.post('/admin/movie',User.signinRequired,User.adminRequired,Movie.save);//表单提交
router.get('/admin/movie/list',User.signinRequired,User.adminRequired, Movie.list);//movie列表页
router.delete('/admin/movie/list',User.signinRequired,User.adminRequired, Movie.delete);//删除列表页

//comment电影评论
router.post('/user/comment',User.signinRequired, Comment.save);//表单提交


//category电影分类
router.get('/admin/category/new',User.signinRequired,User.adminRequired, Category.new);//movie后台录入页
router.post('/admin/category',User.signinRequired,User.adminRequired, Category.save);//表单提交
router.get('/admin/category/list',User.signinRequired,User.adminRequired, Category.list);//movie列表页
module.exports = router;
