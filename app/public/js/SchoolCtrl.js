    
    
    app.controller('SchoolCtrl', function($scope,$http,$routeParams,$sce) {

        var referesh = function(){
            $http.get('/schools/all').then(function(res){
                    $scope.schools = res.data;
                    $scope.school = null;
            });
        
        }

        referesh();


            $scope.chkbox = function(a){
                if(a.isClass !== true){
                    // return $sce.getTrustedHtml("<input type='checkbox'>");
                    return $sce.trustAsHtml('<input type="checkbox">');
                } else {
                    return $sce.trustAsHtml("#");
                } 
            }
            
         
            $scope.link = function(a){ 
                if(a.isClass !== true){
                    return '#!/Schools/details/'+a._id;
                } else {
                    return '#!/Class/details/'+a._id;
                }  
            }

        var poprzedni_ind = 0;
        var school_list = 0;

        $scope.showSchoolClass = function(a,index){
            if(a.isSelected === true ){
                referesh();
                school_list = 0;
                $scope.listSchoolClass = {};
            } else {
                if(a.isClass!==true){
                    
                    $http.get('/schools/all').then(function(res){
                        $scope.schools = res.data;
                        if(index > poprzedni_ind){
                            console.log(a.nazwa+" "+index)
                            getList(index-school_list,res)
                        } else {
                            getList(index,res)
                        }
                        poprzedni_ind = index;
                        school_list=$scope.listSchoolClass.length; 
                    });
                }
            }
        }
        
        var getList = function(index,res){
            $scope.listSchoolClass = res.data[index].klasa;
            $scope.schools[index].isSelected = true;
            for(var i=0;i<$scope.listSchoolClass.length;i++){
                var elem = {};
                elem = $scope.listSchoolClass[i];
                elem.isClass = true;
                $scope.schools.splice(index+1, 0, elem);
            }
        }
      
        $scope.addSchoolForm = function(isValid){
            if(isValid){
                $http.post('/schools/add',$scope.school).then(function(err,res){
                    $scope.add_school_form.$setPristine();
                    referesh();
                });     
            }
        }

        $scope.getSchool = function(){
            var id = $routeParams.id;
            $http.get('/schools/get/'+id).then(function(res){
                $scope.aaa = res.data;
                console.log($scope.aaa);
            });
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