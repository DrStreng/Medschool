    
    app.controller('ClassCtrl', function($scope,$routeParams,$http) {

        $scope.getClass = function(){
            var id = $routeParams.id;

            $http.get('/schoolClass/get/'+id).then(function(res){
                $scope.aaa = res.data;
            });
            
            $http.get('/students/ByClass/'+id).then(function(res){
                $scope.students = res.data;
            });
        }

        $scope.link = function(a){ 
            return '#!/Person/details/'+a._id;
        }
        $scope.link_edit = function(a){ 
            return '#!/Person/edit/'+a._id;
        }
        $scope.link_edit2 = function(){
            var id = $routeParams.id;
            return '#!/Class/edit/'+id;
        }
    });