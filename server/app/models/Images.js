var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var imgSchema = new Schema({

  name   : {type:String,default:"",required:true},
  created : {type:Date,default:Date.now}

});

mongoose.model('Images',imgSchema);