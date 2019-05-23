myApp.service('uploadService', function($http){

	var baseUrl = "./api/v1"	

	this.upload = function(data){

		return $http.post(baseUrl +'/image/upload',data)

	} // upload images

	this.allImages = function(){

		return $http.get(baseUrl +'/image/allImages')

	} // get all images

});