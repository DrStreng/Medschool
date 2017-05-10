    
    
    app.controller('SchoolCtrl', function($scope,$http,$routeParams,$sce) {

          $scope.title = {
            title : "Szkoły",
            glyph : 'leaf'
        } 
        
         $scope.sortType = "nazwa"; 
         $scope.sortReverse = false;

        var referesh = function(){
            $http.get('/schools/all').then(function(res){
                    $scope.schools = res.data;
                    $scope.school = null;
            });
        
        }

        referesh();

        $scope.getSchool = function(){
            var id = $routeParams.id;
            $http.get('/schools/get/'+id).then(function(res){
                $scope.aaa = res.data;
            });
        }

        $scope.link_school_details = function(a){ 
            return '#!/Schools/details/'+a._id;   
        }

        $scope.link_class_details = function(a){ 
            return '#!/Class/details/'+a._id;
        }

        $scope.showSchoolClass = function(a){
            $scope.SelectedSchool = a;
            $scope.listClass = a.klasa;
        }
        
        $scope.addSchoolForm = function(isValid){
            if(isValid){
                $http.post('/schools/add',$scope.school).then(function(err,res){
                    $scope.add_school_form.$setPristine();
                    referesh();
                });     
            }
        }

        $scope.addSchoolClassForm = function(isValid){
            if(isValid){
                $http.post('/schoolClass/add',$scope.schoolClass).then(function(err,res){
                    $scope.add_schoolClass_form.$setPristine();
                    $scope.schoolClass = null; 
                });     
            }
        }
 
    });