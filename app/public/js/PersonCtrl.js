
app.controller('PersonCtrl', function($scope,$http,$routeParams) {

        $scope.search = {};

        $scope.message = {
            text : '',
            mode : 'info'
        };
        $scope.menu = {
            search : 'Wyszukiwanie zaawansowane'
        }
         $scope.searchSex = {
            M : true,
            K : true
        };

        $scope.change = function(sex){
            
            if(sex=='M' && $scope.searchSex.M == true){
                $scope.searchSex.M == false
            }
            else if(sex=='M' && $scope.searchSex.M == false){
                $scope.searchSex.M == true
            }
            else if(sex=='K' && $scope.searchSex.K == false){
                $scope.searchSex.K == true
            }
            else {
                $scope.searchSex.K == false
            }
            
            if($scope.searchSex.M === true && $scope.searchSex.K === true){
                $scope.search.sex = undefined
            } 
            else if ($scope.searchSex.M === false && $scope.searchSex.K === false){
                $scope.search.sex = undefined
            }
            else if ($scope.searchSex.M === false && $scope.searchSex.K === true){
                $scope.search.sex = 'K'
            } else {
                $scope.search.sex = 'M'
            }
            
        }

        $scope.sortType = "imie"; 
        $scope.sortReverse = false;
        $scope.searchPerson = "";

        $scope.clearMessage = function(){
            $scope.message.text ="";
        }

        $scope.clearSearch = function(){
            $scope.search = {};
            $scope.searchSex = {
                M : true,
                K : true
            };
        }
            
        var referesh = function(){
            $http.get('/students/all').then(function(res){
                    $scope.studentsAll = res.data;

                    //Select School
                    $http.get('/schools/all').then(function(res){
                        $scope.schools = res.data;
                        
                        $scope.person={
                            "szkola":$scope.schools[0]
                        }
                        var send = {
                            _id: $scope.person.szkola
                        }
                        $http.post('/schools/getBySchoolId',send).then(function(res){
                            $scope.schoolClass = res.data.klasa;
                            $scope.person={
                                "szkola":$scope.schools[0],
                                "nr_klasy":$scope.schoolClass[0]
                            }
                        });
                    });//END SELECT SCHOOL
            });
        }

        referesh();

        $scope.link = function(a){ 
            return '#!/Person/details/'+a._id;
        }
        $scope.link_edit = function(a){ 
            return '#!/Person/edit/'+a._id;
        }
        $scope.link_edit2 = function(){
            var id = $routeParams.id;
            return '#!/Person/edit/'+id;
        }


        //Get class when school selected
        $scope.schoolSelect = function(){
                        var send = {
                _id: $scope.person.szkola
            }

            $http.post('/schools/getBySchoolId',send).then(function(res){
                $scope.schoolClass = res.data.klasa;
                 $scope.person={
                    "imie":$scope.person.imie,
                    "nazwisko":$scope.person.nazwisko,
                    "data_ur":$scope.person.data_ur,
                    "pesel":$scope.person.pesel,
                    "sex"  : $scope.person.sex,
                    "szkola":$scope.person.szkola,
                    "nr_klasy":$scope.schoolClass[0]
                }
            });
        }

        //Add person to db
        $scope.submitForm = function(isValid){
            if(isValid){
                $http.post('/students/add',$scope.person).then(function(err,res){
                    $scope.add_person_form.$setPristine();
                    $scope.message = {
                            text : 'Nowy uczeń został dodany pomyślnie!',
                            mode : 'success'
                        };
                    referesh();
                });     
            }
        }

        //Clear button
        $scope.clear = function(){
            referesh(); 
            $scope.add_person_form.$setPristine();  
        }

        $http.get('/students/all').then(function(res){
             var a = res.data;
             
                $scope.studentslist = a;
        });

        var createDate = function(data){

            if($scope.aaa.data_ur != null){
                var d = new Date($scope.aaa.data_ur);
                var curr_date = d.getDate();
                var curr_month = d.getMonth() ; 
                var curr_year = d.getFullYear();
                data.data_ur = new Date(curr_year , curr_month , curr_date)  
            }

            $scope.form = data;
   
        }

        $scope.getPersonByParams = function(){
            var id = $routeParams.id;
            $http.get('/students/get/'+id).then(function(res){
                if(res.data.sex == "M"){
                    res.data.sex = "Mężczyzna"
                }
                else if(res.data.sex == "K"){
                    res.data.sex = "Kobieta"
                }
                $scope.aaa = res.data;
                createDate(res.data)

            });
        }

          $scope.editPersonForm = function(isValid){
                $http.post('/students/edit',$scope.form).then(function(res){
                    if(res.data.error){
                        $scope.message = {
                            text : 'Edycja się nie powiodła',
                            mode : 'danger'
                        };
                    } else {
                        $scope.message = {
                            text : 'Edytowano pomyślnie!',
                            mode : 'success'
                        };
                    }
                    
                    
                });     
            
          }


        $scope.createPersonDetailsPDF = function(a){


            var d = new Date(a.data_ur)
            var dzien = d.getDate();
            var miesiac = d.getMonth();
            var rok = d.getFullYear();
            var data_ur = dzien +'/'+miesiac+'/'+rok;
        

            var docDefinition = {
                pageSize: 'A4',
                pageMargins: [ 40, 40, 40, 40 ],
                content: [
                    { text: 'Dane osobowe', style: 'header' },
                    { table: {
                            headerRows: 3,
                            widths: [ 'auto', '*' ],
                            body: [
                                [ { text: 'Imię: ', bold: true }, a.imie ],
                                [ { text: 'Nazwisko: ', bold: true }, a.nazwisko ],
                                [ { text: 'Data urodzenia: ', bold: true }, data_ur ],
                                [ { text: 'Pesel: ', bold: true }, a.pesel ],
                                [ { text: 'Szkoła: ', bold: true }, a.szkola.nazwa ],
                                [ { text: 'Klasa: ', bold: true }, a.nr_klasy.nazwa ],
                                [ { text: 'Inne: ', bold: true }, a.details ]
                  
                            ]
                        }
                    }
                ],
                

                styles: {
                        header: {
                        fontSize: 22,
                        bold: true,
                        height: 400
                    },
                    anotherStyle: {
                        italic: true,
                        alignment: 'right'
                    }
                }
            };

            pdfMake.createPdf(docDefinition).download(a.imie+'_'+a.nazwisko+'.pdf');
            

        }

    
});





  

  
