    
    app.controller('ClassCtrl', function($scope,$routeParams,$http) {

        $scope.getClass = function(){
            var id = $routeParams.id;
            $http.get('/schoolClass/get/'+id).then(function(res){
                $scope.aaa = res.data;
            });
        }
    });