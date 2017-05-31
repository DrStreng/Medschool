app.controller('NotesCtrl', function($scope,$http,$routeParams) {

    $scope.newNote = function(){
            var id = $routeParams.id;
            return '#!/Person/notes/newNote/'+id;
    }
    $scope.backToNotes = function(){
            var id = $routeParams.id;
            return '#!/Person/notes/'+id;
    }
    $scope.title = {
        title : "Notatki",
        glyph : 'book'
    } 
    $scope.search = {};

    //getNotes
    $scope.getNotes = function(){
        $http.get('/note/get').then(function(res){
            console.log(res.data)
            $scope.listNotes = res.data 
            $scope.listNotes[0].details = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaac"  
        }); 
    }

    //saveNote
    $scope.saveEditor = function(valid){

        window.delta = quill.getContents();
        $scope.text = delta;
        var note = {
            title: $scope.note.title,
            content : delta,
            student : $routeParams.id,
            details : $scope.note.description
        }
            $http.post('/note/add',note).then(function(res){
                console.log(res)
            }); 
    }


});