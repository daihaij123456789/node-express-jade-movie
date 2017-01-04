var User = require('../models/user');
var _ = require('underscore');
//signup注册页
exports.signup = function(req, res, next) {
    var _user = req.body.user;
    User.findOne({ name: _user.name }, function(err, user) {
        if (err) { console.log(err); }
        if (user) {
            return res.redirect('/signin');
        } else {
            var user = new User(_user);
            user.save(function(err, user) {
                if (err) { console.log(err); }
                res.redirect('/');
            })
        }
    })
}

//showSignup注册页
exports.showSignup =  function(req, res, next) {
        res.render('signup', {
            title: '注册页面'
        });
};
//showSignin登陆页
exports.showSignin =  function(req, res, next) {
        res.render('signin', {
            title: '登陆页面'
        });
};
//userlist列表页
exports.list =  function(req, res, next) {
    User.fetch(function(err, users) {
        if (err) { console.log(err); }
        res.render('userlist', {
            title: '用户列表页',
            users: users
        });
    })
};
//登陆权限控制中间键
exports.signinRequired =  function(req, res, next) {
    var user = req.session.user;
    if (!user) {
        return res.redirect('/signin');
    }
    next();
};
//管理权限控制中间键
exports.adminRequired =  function(req, res, next) {
    var user = req.session.user;
    if (user.role <= 10) {
        return res.redirect('/signin');
    }
    next();
};
//signin登陆页
exports.signin = function(req, res, next) {
    var _user = req.body.user;
    var name=_user.name;
    var password=_user.password;
    User.findOne({ name:name }, function(err, user) {
        if (err) { console.log(err); }
        if (!user) {
            return res.redirect('/signup');
        } 
        user.comparePassword(password,function (err,isMatch) {
          if (err) {console.log(err);}
          if (isMatch) {
           req.session.user=user;
            return res.redirect('/');
          }else{
            return res.redirect('/signin');
          }
        })
    })
};
//logout登出页
exports.logout =function(req, res, next) {
    delete req.session.user;
    //delete res.locals.user
    res.redirect('/');
};
