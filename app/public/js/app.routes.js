var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider,$locationProvider){

    $routeProvider

    .when('/',{
        templateUrl:'partials/home.html',
      
    })

    .when('/Person/add',{
        templateUrl:'partials/Person/addPerson.html',
        controller: 'PersonCtrl',
    })

    .when('/Person/edit/:id',{
        templateUrl:'partials/Person/edit_Person.html',
        controller : 'PersonCtrl',
       
    })

    .when('/Person/details/:id',{
        templateUrl:'partials/Person/details_Person.html',
        controller : 'PersonCtrl',
        
    })

    .when('/Person',{
        templateUrl:'partials/Person/allPerson.html',
        controller :'PersonCtrl',
        
    })

    .when('/addSchoolandClass',{
        templateUrl:'partials/addSchoolandClass.html',
        controller :'SchoolCtrl',
       
    })

    .when('/Schools',{
        templateUrl:'partials/School/all_Schools.html',
        controller : 'SchoolCtrl',
       
    })

    .when('/Schools/edit/:id',{
        templateUrl:'partials/School/edit_Schools.html',
        controller : 'SchoolCtrl',
      
    })

    .when('/Schools/details/:id',{
        templateUrl:'partials/School/details_Schools.html',
        controller : 'SchoolCtrl',
    
    })

    .when('/Class/edit/:id',{
        templateUrl:'partials/SchoolClass/edit_SchoolClass.html',
        controller : 'ClassCtrl',
        
    })

    .when('/Class/details/:id',{
        templateUrl:'partials/SchoolClass/details_SchoolClass.html',
        controller : 'ClassCtrl',
        
    })

    .otherwise({redirectTo: '/'});

    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    // });

}).run(function(){

    

})





