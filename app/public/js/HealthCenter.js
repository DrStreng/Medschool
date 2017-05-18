app.controller('HealthCenter', function($scope,$http,$location) {

    $scope.title = {
        title : "Ośrodki Zdrowia",
        glyph : 'grain'
    } 

    var getAll =  function(){
        $http.get('/healthCenter/all').then(function(res){
                $scope.listHC = res.data;
        });
    }

    $scope.getAllHC = function(){
        getAll();
    }

    //Dodawanie
    $scope.form = {
        isMine: true
    }

    $scope.clearAdd = function(form){
        form.$setPristine();
        $scope.form = {isMine: true};
    }

    $scope.clearMessage = function(){
        $scope.message.text ="";
    }

    $scope.addHC = function(isValid){

        if(isValid){
            $http.post('/healthCenter/add',$scope.form).then(function(err,res){
                // $scope.add_hc_form.$setPristine();
                $scope.message = {
                        text : 'Nowy ośrodek został dodany pomyślnie!',
                        mode : 'success'
                };
                getAll();
            });  
        }
    }

})