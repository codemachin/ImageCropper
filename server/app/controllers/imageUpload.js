var mongoose = require('mongoose');
var express = require('express');
const s3bucketUpload = require('../../libs/s3')
const responseGenerator = require('../../libs/responseGenerator')

// custom router
var uploadRouter  = express.Router();

// models
var imagesModel = mongoose.model('Images');

const bucketName = "insider-img"


module.exports.controllerFunction = function(app) {

  /////////////////////////////////////////// Api to get all the lot details //////////////////////////////////////


  uploadRouter.post('/upload',async function(req, res){
    
    try {

      const {name,horizontal,vertical,horizontal_small,gallery} = req.body
      let nameArr = name.split('.')
      let justname = nameArr[0]
      // let extension = nameArr[1]
      let finalName = justname + '_' + Date.now() + '.png'

      await Promise.all([
        s3bucketUpload.upload(bucketName, finalName, horizontal, 'horizontal'),
        s3bucketUpload.upload(bucketName, finalName, vertical, 'vertical'),
        s3bucketUpload.upload(bucketName, finalName, horizontal_small, 'horizontal_small'),
        s3bucketUpload.upload(bucketName, finalName, gallery, 'gallery')
      ])
      
      var newImage = new imagesModel({
        name: finalName
      });// end new image

      newImage.save(function (err) {
        
        if (err) {
          var myResponse = responseGenerator.generate(true, "some error occurred", 500, null);
          res.send(myResponse);
        }
        else {
          var myResponse = responseGenerator.generate(false, "success", 200, finalName);
          res.send(myResponse);
        }

      });

    } catch (err) {
      console.log(err)
      var myResponse = responseGenerator.generate(true, "some error occurred", 400, err);
      res.send(myResponse);
    }

  });


  /////////////////////////////////////////// Api to get all the lot details //////////////////////////////////////


  uploadRouter.get('/allImages', function(req, res){
    try{
      imagesModel.find({},function(err,allImages){
          if(err){                                
              res.json({status:404,msg:err,data:null})        
          }
          else{
              res.json({status:200,msg:"",data:allImages})
          }
      })
    }catch(err){
      var myResponse = responseGenerator.generate(true, "some error occurred", 400, err);
      res.send(myResponse);
    }
    

  });


  ////////////////////////////////////////// setting the router middleware //////////////////////////////////////////

  app.use('/api/v1/image', uploadRouter);

}