myApp.controller('queryCreateController', ['$http', 'uploadService', "toastr","$location", function ($http, uploadService,toastr,$location) {

    this.submit = async function(){ 

        const base64Arr = await Promise.all([this.cropArea1.result('base64'), this.cropArea2.result('base64'), this.cropArea3.result('base64'), this.cropArea4.result('base64')])

        let data = {
            name: this.filename,
            horizontal : base64Arr[0],
            vertical : base64Arr[1],
            horizontal_small : base64Arr[2],
            gallery : base64Arr[3]
        }
        uploadService.upload(data)
            .then(function successCallback(response) {

                if (response.data.status == 200) {

                    toastr.success('Image cropped and successfully updated.')
                    $location.path('')

                } else {
                    toastr.error(response.data.msg)
                }

            }, function errorCallback(response) {

                toastr.error("some error occurred. Check the console.");
                console.log(response);
            });
    }

    this.destroy = function() {
        this.picFile = null
    }


}]); // end controller