
  myApp.directive("fileModel", fileModel);
  /** @ngInject */
  function fileModel($parse, $q) {
    return {
      restrict: "A",
      bindToController: true,
      scope:true,
      link: function (scope, element, attrs) {

        element.bind("change", function () {
          scope.$apply(function () {
            var file = element[0].files[0];
            getFileBuffer(file).then(function (resp) {
              scope.imgCrop.filename = file.name
              if (scope.imgCrop.cropArea1){
                scope.imgCrop.cropArea1.destroy()
                scope.imgCrop.cropArea2.destroy()
                scope.imgCrop.cropArea3.destroy()
                scope.imgCrop.cropArea4.destroy()
              }

              var el = document.getElementById('cropArea1');
              scope.imgCrop.cropArea1 = new Croppie(el, {
                viewport: { width: 755, height: 450 },
                boundary: { width: 1024, height: 1024 },
                showZoomer: true
              });
              var el = document.getElementById('cropArea2');
              scope.imgCrop.cropArea2 = new Croppie(el, {
                viewport: { width: 365, height: 450 },
                boundary: { width: 1024, height: 1024 },
                showZoomer: true
              });
              var el = document.getElementById('cropArea3');
              scope.imgCrop.cropArea3 = new Croppie(el, {
                viewport: { width: 365, height: 212 },
                boundary: { width: 1024, height: 1024 },
                showZoomer: true
              });
              var el = document.getElementById('cropArea4');
              scope.imgCrop.cropArea4 = new Croppie(el, {
                viewport: { width: 380, height: 380 },
                boundary: { width: 1024, height: 1024 },
                showZoomer: true
              });

              scope.imgCrop.cropArea1.bind({
                url: resp
              });

              scope.imgCrop.cropArea2.bind({
                url: resp
              });

              scope.imgCrop.cropArea3.bind({
                url: resp
              });

              scope.imgCrop.cropArea4.bind({
                url: resp
              });
              
            });
          });
        });
      }
    };
    function getFileBuffer(file) {
      var deferred = new $q.defer();
      var reader = new FileReader();
      reader.onloadend = function (e) {
        deferred.resolve(e.target.result);
      };
      reader.onerror = function (e) {
        deferred.reject(e.target.error);
      };
      reader.readAsDataURL(file);
      return deferred.promise;
    }
  }
