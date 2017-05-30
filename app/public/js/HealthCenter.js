app.controller('HealthCenter', function($scope,$http,$location,$routeParams) {

    //Details

        //NAW
        $scope.details_HC = function(a){
            return '#!/HealthCenter/details/'+a._id;
        }

    $scope.getHC = function(){
        var id = $routeParams.id;
        $http.get('/healthCenter/get/'+id).then(function(res){
                $scope.hc = res.data;
                    $scope.title = {
                        title : "Ośrodek Zdrowia "+res.data.name,
                        glyph : 'grain'
                    }
                    if($scope.hc.isMine =true ){
                        $scope.isMineDetails = {text:"Tak"}
                    } else {
                        $scope.isMineDetails = {text:"Nie"}
                    }
        });
    }

    //Dodawanie

    var getAll =  function(){
        $http.get('/healthCenter/all').then(function(res){
                $scope.listHC = res.data;
        });
    }

    $scope.getAllHC = function(){
        $scope.title = {
            title : "Ośrodki Zdrowia",
            glyph : 'grain'
        } 
        getAll();
    }

    $scope.form = {
        isMine: true
    }
    $scope.isMine = { text:'Tak'}

    $scope.isMineChange = function(){
        
        if($scope.form.isMine == true){
            $scope.isMine = { text:'Tak'}
        } else {
            $scope.isMine = { text:'Nie'}
        }
    }

    $scope.clearAdd = function(form){
        form.$setPristine();
        $scope.isMine = { bool:true, text:'Tak'}
        $scope.form = { isMine: true };
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
    //Usuń
    $scope.removeModalHC = function(data){
        $scope.clone = jQuery.extend({}, data);
        
    }

    $scope.removeHC = function(){
        console.log($scope.clone)
        var id = { '_id': $scope.clone._id } 
        $http.post('/healthCenter/remove',id).then(function(res){
            getAll();
        });
    }

    //Edycja
    $scope.getEditHC = function(data){
        $scope.form = jQuery.extend({}, data);
        $scope.clone = jQuery.extend({}, data);
        if($scope.form.isMine == true){
            $scope.isMine = { text:'Tak'}
        } else {
            $scope.isMine = { text:'Nie'}
        }
    }

    $scope.clearEdit = function(){
        $scope.form = jQuery.extend({}, $scope.clone);
    }
    $scope.editHC = function(isValid){
        var id = $routeParams.id;
        if(isValid){
            $http.post('/healthCenter/edit',$scope.form).then(function(res){
                if(res.data.error == false){       
                    $scope.message = { text : 'Ośrodek: '+$scope.form.name+' został edytowany pomyślnie!', mode : 'success'};
                } else {
                    $scope.message = { text : 'Coś się nie powiodło, spróbuj ponownie', mode : 'danger'};
                }
            });
            if(id != undefined){
                $scope.getHC();
            } else {
                getAll();
            }
        }
    }



})