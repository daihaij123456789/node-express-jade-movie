var mongoose = require('mongoose')
var UserSchema = require('../schems/user')
var User = mongoose.model('User', UserSchema)

module.exports = User