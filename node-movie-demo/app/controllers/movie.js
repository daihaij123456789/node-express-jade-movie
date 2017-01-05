var Movie = require('../models/movie');
var Comment = require('../models/comment');
var Category = require('../models/category');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');
//movie详情页
exports.detail = function(req, res, next) {
    var id = req.params.id;
       Movie.update({_id : id},{$inc:{pv : 1}},function (err) {
         if (err) {
          console.log(err);
         }
       })
       Movie.findById(id, function(err, movie) {
        Comment
          .find({movie: id})
          .populate('from', 'name')
          .populate('reply.from reply.to', 'name')
          .exec(function(err, comments) {
            res.render('detail', {
              title: '电影详情页',
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
        title: '电影后台录入页',
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
                title: '电影后台更新页',
                movie: movie,
                categories:categories
            });
        })
    })
  }
};

// 海报上传
exports.savePoster = function(req, res, next) {
  var posterData = req.files.uploadPoster
  var filePath = posterData.path
  var originalFilename = posterData.originalFilename

  if (originalFilename) {
    fs.readFile(filePath, function(err, data) {
      var timestamp = Date.now()
      var type = posterData.type.split('/')[1]
      var poster = timestamp + '.' + type
      var newPath = path.join(__dirname, '../../', '/public/upload/' + poster)

      fs.writeFile(newPath, data, function(err) {
        req.poster = poster
        next()
      })
    })
  }
  else {
    next()
  }
}

//电影表单提交
exports.save = function(req, res, next) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    if (req.poster) {
      movieObj.poster = req.poster;
    }
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
    var categoryName = movieObj.categoryName

    _movie.save(function(err, movie) {
      if (err) {
        console.log(err)
      }
      if (categoryId) {
        Category.findById(categoryId, function(err, category) {
          category.movies.push(movie._id)

          category.save(function(err, category) {
            res.redirect('/movie/' + movie._id)
          })
        })
      }
      else if (categoryName) {
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
      }
    })
  }

};
//movie列表页
exports.list = function(req, res, next) {
    Movie.find({})
    .populate('category', 'name')
    .exec(function(err, movies) {
      if (err) {
        console.log(err)
      }

      res.render('list', {
        title: '电影列表页',
        movies: movies
      })
    })
};
//删除电影列表页
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