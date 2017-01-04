var mongoose = require('mongoose')
var CategorySchema = require('../schems/category')
var Category = mongoose.model('Category', CategorySchema)

module.exports = Category