var mongoose = require('mongoose');
var bcrypt=require('bcryptjs');
var Schema = mongoose.Schema;
var SALY_WORK_FACTOR=10;
//var ObjectId = Schema.Types.ObjectId

var UserSchema = new Schema({
  name:{
    unique:true
    type:String,
  },
  password:String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

// var ObjectId = mongoose.Schema.Types.ObjectId
UserSchema.pre('save', function(next) {
  var user = this;
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }
  bcrypt.genSalt(SALY_WORK_FACTOR,function (err,salt) {
    if (err) return next(err)
      bcrypt.hash(user.password,salt,function (err,hash) {
        if (err) return next(err)
          user.password=hash;
          next()
      })
  })
  
})

UserSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

module.exports = UserSchema