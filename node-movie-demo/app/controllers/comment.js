var Comment = require('../models/comment');


//评论表单提交
exports.save = function(req, res, next) {
   var _comment =req.body.comment;
   var movieId = _comment.movie;
   if (_comment.cid) {
        Comment.findById(_comment.cid, function (err, comment) {
           var reply = {
                from : _comment.from,
                to : _comment.tid,
                content :_comment.content
           }
           comment.reply.push(reply);
           comment.save(function (err,comment) {
               if (err) { console.log(err); }
                res.redirect('/movie/' + movieId)
           })
        })
   }else{
        var comment = new Comment(_comment);
        comment.save(function(err, comment) {
            if (err) { console.log(err); }
            res.redirect('/movie/' + movieId)
        })
   }
};


/*//movie详情页
exports.detail = function(req, res, next) {
    var id = req.params.id;
    Movie.findById(id, function(err, movie) {
        res.render('detail', {
            title: 'movie详情页',
            movie: movie
        });
    })
};
//movie后台录入页
exports.new = function(req, res, next) {
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
};

//后台更新页
exports.update = function(req, res, next) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function(err, movie) {
            res.render('admin', {
                title: 'movie后台更新页',
                movie: movie
            });
        })
    }

};


*/

/*//movie列表页
exports.list = function(req, res, next) {
    Movie.fetch(function(err, movies) {
        if (err) { console.log(err); }
        res.render('list', {
            title: '电影列表页',
            movies: movies
        });
    })
};
//删除列表页
exports.delete = function(req, res, next) {
    var id = req.query.id;
    if (id) {
        Movie.remove({ _id: id }, function(err, movie) {
            if (err) { console.log(err); } else {
                res.json({ success: 1 })
            }
        })
    }
};*/