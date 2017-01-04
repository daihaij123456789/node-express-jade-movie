var Movie = require('../models/movie');
var Comment = require('../models/comment');
var Category = require('../models/category');
var _ = require('underscore');
//movie详情页
exports.detail = function(req, res, next) {
    var id = req.params.id;
       Movie.findById(id, function(err, movie) {
    Comment
      .find({movie: id})
      .populate('from', 'name')
      .populate('reply.from reply.to', 'name')
      .exec(function(err, comments) {
        res.render('detail', {
          title: 'imooc 详情页',
          movie: movie,
          comments: comments
        })
      })
  })
};
//movie后台录入页
exports.new = function(req, res, next) {
    Category.find({}, function (err,categories) {
        res.render('admin', {
        title: 'movie后台录入页',
        categories:categories,
        movie: {}

        })
    })  
};

//后台更新页
exports.update = function(req, res, next) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function(err, movie) {
          Category.find({}, function (err,categories) {
            res.render('admin', {
                title: 'movie后台更新页',
                movie: movie,
                categories:categories
            });
        })
    })
  }
};



//表单提交
exports.save = function(req, res, next) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    if (id) {
    Movie.findById(id, function(err, movie) {
      if (err) {
        console.log(err)
      }

      _movie = _.extend(movie, movieObj)
      _movie.save(function(err, movie) {
        if (err) {
          console.log(err)
        }
        res.redirect('/movie/' + movie._id)
      })
    })
  }
  else {
    _movie = new Movie(movieObj);

    var categoryId = movieObj.category
    //var categoryName = movieObj.categoryName

    _movie.save(function(err, movie) {
      if (err) {
        console.log(err)
      }
      //if (categoryId) {
        Category.findById(categoryId, function(err, category) {
          category.movies.push(movie._id)

          category.save(function(err, category) {
            res.redirect('/movie/' + movie._id)
          })
        })
      //}
      /*else if (categoryName) {
        var category = new Category({
          name: categoryName,
          movies: [movie._id]
        })

        category.save(function(err, category) {
          movie.category = category._id
          movie.save(function(err, movie) {
            res.redirect('/movie/' + movie._id)
          })
        })
      }*/
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