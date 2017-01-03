
var mongoose = require('mongoose')
var MovieSchema = require('../schems/movie')
var Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie