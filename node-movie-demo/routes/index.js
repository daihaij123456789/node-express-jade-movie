'use strict';
var express = require('express');
var router = express.Router();
var request = require('request'); //请求歌词
var iconv = require('iconv-lite'); //解密xml
var BufferHelper = require('bufferhelper'); //解密xml
var MovieIndex = require('../app/controllers/movie/movie_index'), // 电影首页控制器
    // 电影首页模块路由控制器
    User = require('../app/controllers/user/user'), // 用户模块路由控制器
    Movie = require('../app/controllers/movie/movie'), // 电影模块路由控制器
    MovieComment = require('../app/controllers/movie/movie_comment'), // 电影评论控制器
    Category = require('../app/controllers/movie/movie_category'), // 电影分类控制器
    City = require('../app/controllers/movie/movie_city'), // 电影院分类控制器

    // 音乐首页模块路由控制器
    MusicIndex = require('../app/controllers/music/music_index'), // 音乐首页控制器
    Music = require('../app/controllers/music/music'), // 音乐模块路由控制器
    // 音乐分类控制器
    MusicCategory = require('../app/controllers/music/music_category'),
    // 音乐热门榜单控制器
    Programmer = require('../app/controllers/music/music_programme'),
    MusicComment = require('../app/controllers/music/music_comment'), // 音乐评论控制器

    multipart = require('connect-multiparty'), // 处理文件上传中间件
    multipartMiddleware = multipart();



// 用户登录session处理
router.use(function(req, res, next) {
        var _user = req.session.user;
        res.locals.user = _user;
        next();
    })
    /*============== 公共路由 ==============*/
    // 用户注册路由
router.get('/signup', User.showSignup);
router.post('/user/signup/', User.signup);
// 用户登陆路由
router.get('/signin', User.showSignin);
router.get('/user/signin', User.signin);
// 用户登出路由
router.get('/logout', User.logout);
// 验证码路由
router.get('/captcha', User.captcha);
// 用户列表路由
router.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list);
router.delete('/admin/user/list', User.del);

/*============== 电影网站路由 ==============*/
// 电影主页路由
router.get('/', MovieIndex.index);

// 首页电影搜索结果页
router.get('/movie/results', MovieIndex.search);

// 电影广告页
router.get('/fullpage', MovieIndex.fullpage);

// 电影详细页面路由
router.get('/movie/:id', Movie.detail)
router.delete('/movie/:id', MovieComment.del);

// User.signinRequired 用户登录控制   User.adminRequired 用户权限控制

// 用户评论路由
router.post('/admin/movie/movieComment', User.signinRequired, MovieComment.save);

// 更新电影路由
router.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update);

// 电影录入页路由
router.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new)
router.post('/admin/movie/new', multipartMiddleware, User.signinRequired, User.adminRequired, Movie.savePoster, Movie.save);

// 电影列表路由
router.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list)
router.delete('/admin/movie/list', Movie.del);

// 电影分类录入页路由
router.get('/admin/movie/movieCategory/new', User.signinRequired, User.adminRequired, Category.new)
router.post('/admin/movie/movieCategory/new', User.signinRequired, User.adminRequired, Category.save);

// 电影分类列表页路由
router.get('/admin/movie/movieCategory/list', User.signinRequired, User.adminRequired, Category.list)
router.delete('/admin/movie/movieCategory/list', Category.del);

// 电影院搜索路由
router.get('/admin/movie/city/new', User.signinRequired, User.adminRequired, City.new)
router.post('/admin/movie/city/new', User.signinRequired, User.adminRequired, City.save);

// 电影院搜索路由
router.get('/admin/movie/city/list', User.signinRequired, User.adminRequired, City.list)
router.delete('/admin/movie/city/list', City.del);

/*============== 豆瓣音乐网站路由 */
// 音乐主页路由
router.get('/musicIndex', MusicIndex.index);

// 豆瓣音乐搜索结果页
router.get('/music/results', MusicIndex.search);

// 音乐详细页面路由
router.get('/music/:id', Music.detail);
router.delete('/music/:id', MusicComment.del);
// 用户评论
router.post('/admin/music/musicComment', User.signinRequired, MusicComment.save);


// 更新豆瓣音乐路由
router.get('/admin/music/update/:id', User.signinRequired, User.adminRequired, Music.update);

// 后台录入路由
router.get('/admin/music/new', User.signinRequired, User.adminRequired, Music.new)
router.post('/admin/music/new', multipartMiddleware, User.signinRequired, User.adminRequired, Music.savePoster, Music.save);

// 豆瓣音乐列表路由
router.get('/admin/music/list', User.signinRequired, User.adminRequired, Music.list)
router.delete('/admin/music/list', Music.del);

// 豆瓣音乐分类录入页路由
router.get('/admin/music/musicCategory/new', User.signinRequired, User.adminRequired, MusicCategory.new)
router.post('/admin/music/musicCategory/new', User.signinRequired, User.adminRequired, MusicCategory.save);

// 豆瓣音乐分类列表页路由
router.get('/admin/music/musicCategory/list', User.signinRequired, User.adminRequired, MusicCategory.list);

// 豆瓣音乐分类更新路由
router.get('/admin/music/musicCategory/update/:id', User.signinRequired, User.adminRequired, MusicCategory.update);

// 音乐分类列表删除路由
router.delete('/admin/music/musicCategory/list', MusicCategory.del);

// 音乐热门榜单路由
router.get('/admin/music/programme/list', User.signinRequired, User.adminRequired, Programmer.list)
router.delete('/admin/music/programme/list', Programmer.del);
//播放
router.get('/musicPaly', Music.musicPaly)
module.exports = router;
