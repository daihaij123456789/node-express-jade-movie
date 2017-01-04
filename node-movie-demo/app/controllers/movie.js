var Movie = require('../models/movie');

//movie详情页
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



//表单提交
exports.save = function(req, res, next) {
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

};
//movie列表页
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
};