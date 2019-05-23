myApp.controller('homeController',['$scope','$http','Upload','uploadService',"toastr",function($scope,$http,Upload,uploadService,toastr) {

  var main = this;

  this.allImages = function(){
      
    ////////////////////////////////////// get all image details ////////////////////////////////////////

    uploadService.allImages()
      .then(function successCallback(response) {

        if(response.data.status==200){

              main.images = response.data.data;

          }else{
              toastr.error(response.data.msg)
          }
              
      }, function errorCallback(response) {
        
          toastr.error("some error occurred. Check the console.");
          console.log(response);
      });
      
  }

  ////////////////////////////////////////////// get all the images just as the page is loaded //////////////////////////////////////

  this.allImages();


}]); // end controller