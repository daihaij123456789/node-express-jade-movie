var mongoose = require('mongoose');
//链接数据库

var CommentSchema = require('../schems/comment')
var Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment