
app.controller('PersonCtrl', function($scope,$http,$routeParams) {

        $scope.title = {
            title : "Uczniowie",
            glyph : 'user'
        } 
        
        $scope.contact = {}

        $scope.search = {};
        $scope.searchText = "";
        $scope.maxlengthContactNum = 9;

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

        $scope.isStudSearch = {
            T : true,
            N : true
        };

        var getContacts = function(){
            var send= {
                _id:$routeParams.id
            }
            $http.post('/students/getContacts',send).then(function(res){
                $scope.contactList = res.data;
            })
        }

        $scope.change = function(sex){
            
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

        $scope.changeisStud = function(bool){
            if($scope.isStudSearch.T == true && $scope.isStudSearch.N ==true){
                $scope.search.isStudent = undefined
            }
            else if($scope.isStudSearch.T == false && $scope.isStudSearch.N==false){
                $scope.search.isStudent = undefined
            }
            else if($scope.isStudSearch.T == true && $scope.isStudSearch.N==false){
                $scope.search.isStudent = true
            } else  {
                $scope.search.isStudent = false
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
            $scope.isStudSearch = {
                T : true,
                N : true
            };
        }
        $scope.addContact = function(form){
            
                var dodaj = function(){
                    var id = $routeParams.id;
                    var send = {
                            person:$scope.contact.person,
                            num:$scope.contact.number,
                            prefix:$scope.contact.prefix
                    }
                    $http.post('/contacts/add',send).then(function(res){
                        var id = $routeParams.id;
                        var update = {user:id, contact:res.data._id}
                        $http.post('/students/addContact',update).then(function(res){
                            $scope.contact = {}
                           //setPrestine naprawic
                           getContacts();
                        });
                    });
                }
                dodaj();
                
        }
        $scope.setContact = function(contact){
            $scope.ec = jQuery.extend({}, contact);
        }
        $scope.editContact = function(isValid){
            if(isValid){
                $http.post('/contacts/edit',$scope.ec).then(function(res){
                    getContacts();
                })
            }
        }

        $scope.deleteContact = function(data){
            var send  = {
                person_id: $routeParams.id,
                contact_id: data
            }
            $http.post('/students/removeContact',send).then(function(res){});
            $http.post('/contacts/remove',send).then(function(res){
                getContacts();
            });
        }

        $scope.clearSearch2 = function(){
            $scope.searchText = "";
        }

        $scope.isStudChange = function(){
           
            if($scope.isStud.bool == true){
                 $scope.form.isStudent = true
                 $scope.isStud = { bool:true, text:'Tak'}
            } else {
                $scope.isStud = { bool:false, text:'Nie'}
                $scope.form.isStudent = false
            }
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
             $http.get('/healthCenter/all').then(function(res){
                $scope.listHC = res.data;
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
        $scope.linkNotes = function(){
            var id = $routeParams.id;
            return '#!/Person/notes/'+id;
        }


        //Get class when school selected
        $scope.schoolSelect = function(){
                        var send = {
                _id: $scope.person.szkola
            }

            $http.post('/schools/getBySchoolId',send).then(function(res){
                $scope.schoolClass = res.data.klasa;
                 $scope.person= {
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

     
    $scope.select = function(data){
            var send = {
                _id: data._id
            }
            $http.post('/schools/getBySchoolId',send).then(function(res){
                $scope.schoolClass1 = res.data.klasa;
            });
    }

    $scope.getPerson = function(){
        var id = $routeParams.id;
        $http.get('/students/get/'+id).then(function(res){
                if(res.data.sex == "M"){
                    res.data.sex = "Mężczyzna"
                }
                else if(res.data.sex == "K"){
                    res.data.sex = "Kobieta"
                }
                $scope.bbb = res.data;
    })
        getContacts();
    }


        $scope.getPersonByParams = function(){

            var id = $routeParams.id;
            $http.get('/students/get/'+id).then(function(res){


                $scope.aaa = res.data;

                if($scope.aaa.data_ur != null){
                    var d = new Date($scope.aaa.data_ur);
                    var curr_date = d.getDate();
                    var curr_month = d.getMonth() ; 
                    var curr_year = d.getFullYear();
                    res.data.data_ur = new Date(curr_year , curr_month , curr_date)  
                }
          
                $scope.form = res.data;
                
                $scope.plec = [
                    {sex:'K',text:'Kobieta'},
                    {sex:'M',text:'Mężczyzna'}
                ]
                var send = {
                    _id: res.data.szkola._id
                }

                $http.post('/schools/getBySchoolId',send).then(function(sc){
                    $scope.schoolClass1 = sc.data.klasa;
                    angular.forEach($scope.schoolClass1,function(element,key) {  
                      if(element._id == $scope.form.nr_klasy._id) {
                        $scope.form.nr_klasy = $scope.schoolClass1[key]
                      }
                    });
                });
                angular.forEach($scope.listHC,function(element,key){
                 
                    if(element._id == $scope.form.hc._id){
                        $scope.form.hc = $scope.listHC[key]._id
                    }
                })

                if($scope.form.isStudent == true){
                    $scope.isStud = { bool:true, text:'Tak'}
                } else {
                    $scope.isStud = { bool:false, text:'Nie'}
                }
                
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
                $scope.getPerson();    
            
          }
          
            $scope.clearEdit = function() {
                $scope.getPersonByParams();
            }


        $scope.createPersonDetailsPDF = function(a){
           
           if( a.nr_klasy == null ){ a.nr_klasy = { nazwa :"" } }
           if( a.szkola == null ){ a.szkola = { nazwa :"" } }
         
            if(a.data_ur !== null){
                var d = new Date(a.data_ur)
                var dzien = d.getDate();
                var miesiac = d.getMonth();
                var rok = d.getFullYear();
                var data_ur = dzien +'/'+miesiac+'/'+rok;
            } else {
                data_ur =""
            }

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
                                [ { text: 'Płeć: ', bold: true }, a.sex ],
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







  

  
