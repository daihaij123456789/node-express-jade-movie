
var mongoose = require('mongoose');
//链接数据库

var MovieSchema = require('../schems/movie')
var Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie