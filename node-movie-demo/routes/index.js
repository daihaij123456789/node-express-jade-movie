var express = require('express');
var _ = require('underscore');
var router = express.Router();
var Movie = require('../models/movie');
var User = require('../models/user');

/* GET home page. */
//session 预处理


//movie首页
router.get('/', function(req, res, next) {
  console.log(req.session.user);
    var _user=req.session.user;
    if (_user) {
      res.locals.user=_user;
    }
    Movie.fetch(function(err, movies) {
        if (err) { console.log(err); }
        res.render('index', {
            title: 'movie首页',
            movies: movies
        });
    })
});

//singup注册页
router.post('/user/signup', function(req, res, next) {
    var _user = req.body.user;
    User.findOne({ name: _user.name }, function(err, user) {
        if (err) { console.log(err); }
        if (user) {
            return res.redirect('/');
        } else {
            var user = new User(_user);
            user.save(function(err, user) {
                if (err) { console.log(err); }
                res.redirect('/admin/userlist');
            })
        }
    })
});
//userlist列表页
router.get('/admin/userlist', function(req, res, next) {
    User.fetch(function(err, users) {
        if (err) { console.log(err); }
        res.render('userlist', {
            title: '用户列表页',
            users: users
        });
    })
});

//singin登陆页
router.post('/user/signin', function(req, res, next) {
    var _user = req.body.user;
    var name=_user.name;
    var password=_user.password;
    User.findOne({ name:name }, function(err, user) {
        if (err) { console.log(err); }
        if (!user) {
            return res.redirect('/');
        } 
        user.comparePassword(password,function (err,isMatch) {
          if (err) {console.log(err);}
          if (isMatch) {
           req.session.user=user;
            return res.redirect('/');
          }else{
            console.log("Password is not matched");
          }
        })
    })
});
//logout登出页
router.get('/logout', function(req, res, next) {
    delete req.session.user;
    //delete res.locals.user
    res.redirect('/');
});

//movie后台录入页
router.get('/admin/movie', function(req, res, next) {
    res.render('admin', {
        title: 'movie后台录入页',
        movie: {
            doctor: '',
            country: '',
            title: '',
            year: '',
            poster: '',
            language: '',
            flash: '',
            summary: ''
        }

    });
});

//后台更新页
router.get('/admin/update/:id', function(req, res, next) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function(err, movie) {
            res.render('admin', {
                title: 'movie后台更新页',
                movie: movie
            });
        })
    }

});

//movie详情页
router.get('/movie/:id', function(req, res, next) {
    var id = req.params.id;
    Movie.findById(id, function(err, movie) {
        res.render('detail', {
            title: 'movie详情页',
            movie: movie
        });
    })
});

//表单提交
router.post('/admin/movie/new', function(req, res, next) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    if (id !== 'undefined') {
        Movie.findById(id, function(err, movie) {
            if (err) { console.log(err); }
            _movie = _.extend(movie, movieObj);
            _movie.save(function(err, movie) {
                if (err) { console.log(err); }
                res.redirect('/movie/' + movie._id)
            })
        })
    } else {
        _movie = new Movie({
            doctor: movieObj.doctor,
            country: movieObj.country,
            title: movieObj.title,
            year: movieObj.year,
            poster: movieObj.poster,
            language: movieObj.language,
            flash: movieObj.flash,
            summary: movieObj.summary
        })
        _movie.save(function(err, movie) {
            if (err) { console.log(err); }
            res.redirect('/movie/' + movie._id)
        })
    }

});
//movie列表页
router.get('/admin/list', function(req, res, next) {
    Movie.fetch(function(err, movies) {
        if (err) { console.log(err); }
        res.render('list', {
            title: '电影列表页',
            movies: movies
        });
    })
});
//删除列表页
router.delete('/admin/list', function(req, res, next) {
    var id = req.query.id;
    if (id) {
        Movie.remove({ _id: id }, function(err, movie) {
            if (err) { console.log(err); } else {
                res.json({ success: 1 })
            }
        })
    }
});
module.exports = router;
