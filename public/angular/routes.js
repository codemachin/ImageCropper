myApp.config(['$routeProvider', function($routeProvider){

    $routeProvider
        
        .when('/',{
            templateUrl     : 'views/home-view.html',
            controller      : 'homeController',
            controllerAs    : 'myDash'
        })
        

        .when('/upload',{

            templateUrl     : 'views/upload-view.html',
            controller      : 'queryCreateController',
            controllerAs    : 'imgCrop'
            
        })

        .otherwise(
            {
                templateUrl:'views/404.html'
            }
        );


}]);