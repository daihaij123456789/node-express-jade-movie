var Movie = require('../models/movie');
//movie首页
exports.index = function(req, res, next) {
    console.log("您好"+req.session.user);
    Movie.fetch(function(err, movies) {
        if (err) { console.log(err); }
        res.render('index', {
            title: 'movie首页',
            movies: movies
        });
    })
}
