var mongoose = require('mongoose')
var Category = mongoose.model('Category')

// admin new page
exports.new = function(req, res) {
  res.render('category_admin', {
    title: '电影后台分类录入页',
    category: {}
  })
}

// admin post movie
exports.save = function(req, res) {
  var _category = req.body.category
  var category = new Category(_category)

  category.save(function(err, category) {
    if (err) {
      console.log(err)
    }

    res.redirect('/admin/category/list')
  })
}

// catelist page
exports.list = function(req, res ,next) {
  
  Category.fetch(function(err, categories) {
    if (err) {
      console.log(err)
    }

    res.render('categorylist', {
      title: '电影分类列表页',
      categories: categories
    })
  })
}


//删除用户列表页
exports.delete = function(req, res, next) {
    var id = req.query.id;
    if (id) {
        Category.remove({ _id: id }, function(err, category) {
            if (err) { console.log(err); } else {
                res.json({ success: 1 })
            }
        })
    }
};