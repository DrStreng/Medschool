
app.controller('MenuCtrl', function($scope,$location) {

$scope.isActive = function (viewLocation) {
    console.log(viewLocation === $location.path())
     return viewLocation === $location.path();
    };

})